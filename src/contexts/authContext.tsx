import React, { useState, useEffect, useContext } from "react";

import * as cognito from "../libs/cognito";

export enum AuthStatus {
  Loading,
  SignedIn,
  SignedOut,
}

export enum SocialAuthStatus {
  Loading,
  GoogleSign,
  FacebookSign,
  AppleSign,
  SignOut,
}

export interface IAuth {
  sessionInfo?: {
    username?: string;
    email?: string;
    sub?: string;
    accessToken?: string;
    refreshToken?: string;
  };
  attrInfo?: any;
  authStatus?: AuthStatus;
  signInWithEmail?: any;
  signUpWithEmail?: any;
  signOut?: any;
  verifyCode?: any;
  getSession?: any;
  sendCode?: any;
  forgotPassword?: any;
  changePassword?: any;
  getAttributes?: any;
  setAttribute?: any;
  // Verification parts
  setPhoneVerifyCode?: any;
  userRegister?: any;
  userLogin?: any;
  userLogout?: any;
  sendPasswordResetLink?: any;
  confirmPassword?: any;
  googleLogin?: any;
}

const defaultState: IAuth = {
  sessionInfo: {},
  authStatus: AuthStatus.Loading,
};

type Props = {
  children?: React.ReactNode;
};

export const AuthContext = React.createContext(defaultState);

export const AuthIsSignedIn = ({ children }: Props) => {
  const { authStatus }: IAuth = useContext(AuthContext);

  console.log("authStatus --> ", authStatus);

  return <>{authStatus === AuthStatus.SignedIn ? children : null}</>;
};

export const AuthIsNotSignedIn = ({ children }: Props) => {
  const { authStatus }: IAuth = useContext(AuthContext);

  return <>{authStatus === AuthStatus.SignedOut ? children : null}</>;
};

const AuthProvider = ({ children }: Props) => {
  const [authStatus, setAuthStatus] = useState(AuthStatus.Loading);
  const [sessionInfo, setSessionInfo] = useState({});
  const [attrInfo, setAttrInfo] = useState([]);
  const [socialStatus, setSocialStatus] = useState(SocialAuthStatus.Loading);

  useEffect(() => {
    async function getSessionInfo() {
      try {
        const session: any = await getSession();
        setSessionInfo({
          accessToken: session.accessToken.jwtToken,
          refreshToken: session.refreshToken.token,
        });
        window.localStorage.setItem(
          "accessToken",
          `${session.accessToken.jwtToken}`
        );
        window.localStorage.setItem(
          "refreshToken",
          `${session.refreshToken.token}`
        );
        await setAttribute({
          Name: "website",
          Value: "https://github.com/dbroadhurst/aws-cognito-react",
        });
        const attr: any = await getAttributes();
        setAttrInfo(attr);
        setAuthStatus(AuthStatus.SignedIn);
      } catch (err) {
        // console.log("useEffect authStatus error --> ", err);
        setAuthStatus(AuthStatus.SignedOut);
      }
    }

    if (
      !localStorage.socialAuthStatus ||
      localStorage.socialAuthStatus == "false"
    )
      getSessionInfo();
    else {
      setAuthStatus(AuthStatus.SignedIn);
    }
  }, [setAuthStatus, authStatus]);

  if (authStatus === AuthStatus.Loading) {
    return null;
  }

  async function signInWithEmail(email: string, password: string) {
    try {
      await cognito.signInWithEmail(email, password);
      setAuthStatus(AuthStatus.SignedIn);
    } catch (err) {
      setAuthStatus(AuthStatus.SignedOut);
      throw err;
    }
  }

  async function signUpWithEmail(
    username: string,
    email: string,
    password: string
  ) {
    await cognito.signUpUserWithEmail(username, email, password);
  }

  function signOut() {
    cognito.signOut();
    setAuthStatus(AuthStatus.SignedOut);
  }

  async function verifyCode(username: string, code: string) {
    await cognito.verifyCode(username, code);
  }

  async function getSession() {
    const session = await cognito.getSession();
    return session;
  }

  async function getAttributes() {
    const attr = await cognito.getAttributes();
    return attr;
  }

  async function setAttribute(attr: any) {
    const res = await cognito.setAttribute(attr);
    return res;
  }

  async function sendCode(username: string) {
    await cognito.sendCode(username);
  }

  async function forgotPassword(
    username: string,
    code: string,
    password: string
  ) {
    await cognito.forgotPassword(username, code, password);
  }

  async function changePassword(oldPassword: string, newPassword: string) {
    await cognito.changePassword(oldPassword, newPassword);
  }

  async function setPhoneVerifyCode(phoneNumber: string) {
    await cognito.sendPhoneVerifyCode("+" + phoneNumber);
  }

  // --- Authentication part ---

  async function userRegister(
    email: string,
    country: string,
    phonenumber: string,
    password: string
  ) {
    try {
      await cognito.userRegister(email, country, phonenumber, password);
      return "succeed";
    } catch (err: any) {
      return err.message;
    }
  }

  async function userLogin(email: string, password: string) {
    try {
      await cognito.userLogin(email, password);
      setAuthStatus(AuthStatus.SignedIn);
    } catch (err) {
      setAuthStatus(AuthStatus.SignedOut);
      throw err;
    }
  }

  async function userLogout() {
    await cognito.userLogout();
    setAuthStatus(AuthStatus.SignedOut);
  }

  async function sendPasswordResetLink(username: string) {
    await cognito.sendPasswordResetLink(username);
  }

  async function confirmPassword(username: string, verificationCode: string) {
    await cognito.confirmPassword(username, verificationCode);
  }

  async function googleLogin(email: string, googleToken: string) {
    try {
      await cognito.googleLogin(email, googleToken);
      setAuthStatus(AuthStatus.SignedIn);
      setSocialStatus(SocialAuthStatus.GoogleSign);
      window.localStorage.setItem("useremail", email);
      window.localStorage.setItem("socialAuthStatus", "true");
    } catch (err) {
      setAuthStatus(AuthStatus.SignedOut);
      setSocialStatus(SocialAuthStatus.SignOut);
      window.localStorage.setItem("socialAuthStatus", "false");
      throw err;
    }
  }

  const state: IAuth = {
    authStatus,
    sessionInfo,
    attrInfo,
    signUpWithEmail,
    signInWithEmail,
    signOut,
    verifyCode,
    getSession,
    sendCode,
    forgotPassword,
    changePassword,
    getAttributes,
    setAttribute,
    // new verification part functions
    setPhoneVerifyCode,
    userRegister,
    userLogin,
    userLogout,
    sendPasswordResetLink,
    confirmPassword,
    googleLogin,
  };

  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
