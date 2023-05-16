import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";

const AWS = require("aws-sdk");
// const AmazonCognitoIdentity = require("amazon-cognito-identity-js");

// AWS.config.region = process.env.REACT_APP_AWS_REGION; // replace with your AWS region
// AWS.config.credentials = new AWS.CognitoIdentityCredentials({
//   IdentityPoolId: process.env.REACT_APP_AWS_IDENTITY_POOL,
// });

const userPoolId = process.env.REACT_APP_USERPOOL_ID;
const clientId = process.env.REACT_APP_CLIENT_ID;

const poolData = {
  UserPoolId: `${userPoolId}`,
  ClientId: `${clientId}`,
};

const userPool: CognitoUserPool = new CognitoUserPool(poolData);

let currentUser: any = userPool.getCurrentUser();

export function getCurrentUser() {
  return currentUser;
}

function getCognitoUser(username: string) {
  const userData = {
    Username: username,
    Pool: userPool,
  };
  const cognitoUser = new CognitoUser(userData);

  return cognitoUser;
}

export async function getSession() {
  if (!currentUser) {
    currentUser = userPool.getCurrentUser();
  }

  return new Promise(function (resolve, reject) {
    currentUser.getSession(function (err: any, session: any) {
      if (err) {
        reject(err);
      } else {
        resolve(session);
      }
    });
  }).catch((err) => {
    throw err;
  });
}

export async function signUpUserWithEmail(
  username: string,
  email: string,
  password: string
) {
  return new Promise(function (resolve, reject) {
    const attributeList = [
      new CognitoUserAttribute({
        Name: "email",
        Value: email,
      }),
    ];

    userPool.signUp(
      username,
      password,
      attributeList,
      [],
      function (err: any, res: any) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  }).catch((err) => {
    throw err;
  });
}

export async function verifyCode(username: string, code: string) {
  return new Promise(function (resolve, reject) {
    const cognitoUser = getCognitoUser(username);

    cognitoUser.confirmRegistration(
      code,
      true,
      function (err: any, result: any) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }
    );
  }).catch((err) => {
    throw err;
  });
}

export async function signInWithEmail(email: string, password: string) {
  return new Promise(function (resolve, reject) {
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    currentUser = getCognitoUser(email);

    currentUser.authenticateUser(authenticationDetails, {
      onSuccess: function (res: any) {
        resolve(res);
      },
      onFailure: function (err: any) {
        reject(err);
      },
    });
  }).catch((err: any) => {
    throw err;
  });
}

export function signOut() {
  console.log("signout function called!", currentUser);
  if (currentUser) {
    currentUser.signOut();
  }
}

export async function getAttributes() {
  return new Promise(function (resolve, reject) {
    currentUser.getUserAttributes(function (err: any, attributes: any) {
      if (err) {
        reject(err);
      } else {
        resolve(attributes);
      }
    });
  }).catch((err) => {
    throw err;
  });
}

export async function setAttribute(attribute: any) {
  return new Promise(function (resolve, reject) {
    const attributeList = [];
    const res = new CognitoUserAttribute(attribute);
    attributeList.push(res);

    currentUser.updateAttributes(attributeList, (err: any, res: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  }).catch((err: any) => {
    throw err;
  });
}

// When user click password reset it sends password reset link to the user email
export async function sendCode(username: string) {
  return new Promise(function (resolve, reject) {
    const cognitoUser = getCognitoUser(username);
    console.log("cognitoUser", cognitoUser);

    if (!cognitoUser) {
      reject(`could not find ${username}`);
      return;
    }

    const authenticationDetails = new AuthenticationDetails({
      Username: username,
      Password: "Qwer!234",
    });
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: function (result) {
        console.log("User authenticated:", result);
        cognitoUser.forgotPassword({
          onSuccess: function (result) {
            console.log("Password reset initiated:", result);
            const session = result.Session;

            if (session.ChallengeName === "NEW_PASSWORD_REQUIRED") {
              cognitoUser.completeNewPasswordChallenge("Qwer!234", null, {
                onSuccess: function (result) {
                  console.log("Password reset completed:", result);
                },
                onFailure: function (err) {
                  console.log("Error completing password reset:", err);
                },
              });
            } else {
              console.log("Unexpected challenge:", session.ChallengeName);
            }
          },
          onFailure: function (err) {
            console.log("Error initiating password reset:", err);
          },
        });
      },
      onFailure: function (err) {
        console.log("Error authenticating user:", err);
      },
    });
  }).catch((err: any) => {
    throw err;
  });
}

export async function forgotPassword(
  username: string,
  code: string,
  password: string
) {
  return new Promise(function (resolve, reject) {
    const cognitoUser = getCognitoUser(username);

    if (!cognitoUser) {
      reject(`could not find ${username}`);
      return;
    }

    cognitoUser.confirmPassword(code, password, {
      onSuccess: function () {
        resolve("password updated");
      },
      onFailure: function (err: any) {
        reject(err);
      },
    });
  });
}

export async function changePassword(oldPassword: string, newPassword: string) {
  return new Promise(function (resolve, reject) {
    currentUser.changePassword(
      oldPassword,
      newPassword,
      function (err: any, res: any) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
}

export async function sendPhoneVerifyCode(phoneNumber: string) {
  return new Promise(function (resolve, reject) {
    // const userPool = new AmazonCognitoIdentity.CognitoUserPool(poolData);
    // const attributeList = [];
    // const dataPhoneNumber = {
    //   Name: "phone_number",
    //   Value: "+14434223717", // your phone number here with +country code
    // };
    // const attributePhoneNumber = new AmazonCognitoIdentity.CognitoUserAttribute(
    //   dataPhoneNumber
    // );
    // attributeList.push(attributePhoneNumber);
    // userPool.signUp(
    //   "+14434223717",
    //   "Qwer!234",
    //   attributeList,
    //   [],
    //   function (err: any, result: any) {
    //     if (err) {
    //       alert(err.message || JSON.stringify(err));
    //       return;
    //     }
    //     const cognitoUser = result.user;
    //     console.log("user name is " + cognitoUser.getUsername());
    //   }
    // );
  });
}

// --- Authentication part ---

export async function userRegister(
  email: string,
  country: string,
  phonenumber: string,
  password: string
) {
  return new Promise(function (resolve, reject) {
    const attributeList = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
      new CognitoUserAttribute({ Name: "phone_number", Value: phonenumber }),
      new CognitoUserAttribute({ Name: "custom:country", Value: country }),
    ];

    userPool.signUp(
      email,
      password,
      attributeList,
      [],
      function (err: any, res: any) {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  }).catch((err) => {
    throw err;
  });
}

export async function userLogin(email: string, password: string) {
  return new Promise(function (resolve, reject) {
    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    currentUser = getCognitoUser(email);

    currentUser.authenticateUser(authenticationDetails, {
      onSuccess: function (res: any) {
        resolve(res);
      },
      onFailure: function (err: any) {
        reject(err);
      },
      mfaRequired: (challengeName: any, challengeParameters: any) => {
        // Prompt the user for their MFA code
      },
    });
  }).catch((err: any) => {
    throw err;
  });
}

export async function userLogout() {
  if (currentUser) {
    await currentUser.signOut();
  }
}

export async function sendPasswordResetLink(email: string) {
  currentUser = getCognitoUser(email);

  await currentUser.forgotPassword({
    onSuccess: (result: any) => {
      const verificationCode =
        result.CodeDeliveryDetails.Destination.match(/\d{6}/)[0];
      console.log("Password reset email sent", verificationCode);
    },
    onFailure: (error: any) => {
      console.log("Password reset failed:", error);
    },
  });
}

export async function confirmPassword(email: string, verificationCode: string) {
  currentUser = getCognitoUser(email);

  await currentUser.confirmPassword(verificationCode, "Qwert!2345", {
    onSuccess: () => {
      console.log("Password reset successful");
    },
    onFailure: (error: any) => {
      console.log("Password reset failed:", error);
    },
  });
}

export async function googleLogin(email: string, googleToken: string) {
  return new Promise(function (resolve, reject) {
    currentUser = getCognitoUser(email);

    console.log("googleToken -> ", googleToken);
    console.log("currentUser -> ", currentUser);

    AWS.config.region = "eu-north-1"; // your AWS region
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: "eu-north-1:e3008a85-1439-40c7-865b-35babe185210", // your identity pool id
      Logins: {
        "accounts.google.com": googleToken,
      },
    });

    // refreshes credentials using AWS.CognitoIdentity.getCredentialsForIdentity()
    AWS.config.credentials.refresh((error: any) => {
      if (error) {
        console.error(error);
        reject(error);
      } else {
        console.log("Successfully logged in!");
        resolve("succeed");
      }
    });
  }).catch((err: any) => {
    throw err;
  });
}
