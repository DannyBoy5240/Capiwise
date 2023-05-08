import { FC } from "react";

// import React, { useEffect, useState } from "react";
// import { Amplify, Auth, Hub } from "aws-amplify";
// import { CognitoHostedUIIdentityProvider } from "@aws-amplify/auth";
// import awsConfig from "../aws-exports";

// import { Button } from "@react-email/button";
// import { Html } from "@react-email/html";

// Amplify.configure(awsConfig);

const TestPage: FC = () => {
  // const [user, setUser] = useState(null);
  // const [customState, setCustomState] = useState(null);

  // useEffect(() => {
  //   const unsubscribe = Hub.listen("auth", ({ payload: { event, data } }) => {
  //     switch (event) {
  //       case "signIn":
  //         setUser(data);
  //         break;
  //       case "signOut":
  //         setUser(null);
  //         break;
  //       case "customOAuthState":
  //         setCustomState(data);
  //     }
  //   });

  //   Auth.currentAuthenticatedUser()
  //     .then((currentUser) => setUser(currentUser))
  //     .catch(() => console.log("Not signed in"));

  //   return unsubscribe;
  // }, []);

  return (
    <div className="App">
      {/* <Html lang="en" dir="ltr">
        <Button href="https://example.com" style={{ color: "#61dafb" }}>
          Click me
        </Button>
      </Html> */}
    </div>
  );
};

export default TestPage;
