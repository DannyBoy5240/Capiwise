import React, { useState, useEffect, useContext, FC } from "react";

import { useNavigate } from "react-router-dom";

import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";

import jwt_decode from "jwt-decode";

import backImage from "../../assets/background.png";
import logo from "../../assets/logo.svg";
import googleIcon from "../../assets/google_ico.svg";
import facebookIcon from "../../assets/facebook_ico.svg";
import appleIcon from "../../assets/apple_ico.svg";
import infoIcon from "../../assets/qus_ico.svg";

import {
  useValidPassword,
  useValidUsername,
  useValidEmail,
} from "../../hooks/useAuthHooks";
import { Password, Username, Email } from "../../components/authComponents";

import { AuthContext } from "../../contexts/authContext";

const login: FC = () => {
  const { username, setUsername, usernameIsValid } = useValidUsername("");
  const { email, setEmail, emailIsValid } = useValidEmail("");
  const { password, setPassword, passwordIsValid } = useValidPassword("");
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const isValid =
    !emailIsValid ||
    email.length === 0 ||
    !passwordIsValid ||
    password.length === 0;

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  useEffect(() => {
    const storedUseremail = localStorage.getItem("useremail");
    const storedPassword = localStorage.getItem("password");
    const storedRememberMe = localStorage.getItem("rememberme");

    if (storedRememberMe && storedUseremail && storedPassword) {
      setEmail(storedUseremail);
      setPassword(storedPassword);
      setRememberMe(true);
    }
  }, []);

  const signInClicked = async () => {
    try {
      await authContext.signInWithEmail(email, password, {
        mfaSetup: (challengeName: any, challengeParameters: any) => {
          // Handle MFA setup here
          console.log("Handle MFA setup here!");
        },
      });
      navigate("/search");
      // Save to localStorage
      if (rememberMe) {
        localStorage.setItem("useremail", email);
        localStorage.setItem("password", password);
        localStorage.setItem("rememberme", "true");
      } else {
        localStorage.removeItem("useremail");
        localStorage.removeItem("password");
        localStorage.removeItem("rememberme");
      }
    } catch (err: any) {
      if (err.code === "UserNotConfirmedException") {
        setError("You must verify your account with your email!");
      } else {
        setError(err.message);
      }
    }
  };

  const passwordResetClicked = async () => {
    navigate(`/forgetpassword`, { state: { email: email } });
  };

  // const googleLoginHandleSucceed = async (credentialResponse: any) => {
  //   const decoded_token: any = jwt_decode(credentialResponse.credential);
  //   console.log("decoded_token => ", decoded_token);
  //   const googleToken = decoded_token.iat;
  //   const email = decoded_token.email;
  //   await authContext.googleLogin(email, googleToken, true);
  // };

  async function getIdToken(code: string) {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id:
          "1068316747994-l0ftul2edhuccgepq3dglljhkb5et48k.apps.googleusercontent.com", //"your-client-id",
        client_secret: "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", //"your-client-secret",
        redirect_uri: "https://capiwise.vercel.app",
        grant_type: "authorization_code",
        code: code,
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        const idToken = data.id_token;
        const decoded_token: any = jwt_decode(idToken);
        console.log("decoded_token.email", decoded_token.email);
        await authContext.googleLogin(decoded_token.email, idToken);
        navigate("/search");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // const googleLoginHandle = useGoogleLogin({
  //   flow: "auth-code",
  //   onSuccess: async (code: any) => {
  //     await getIdToken(code.code);
  //   },
  //   onError: (errorResponse: any) => console.log(errorResponse),
  // });

  return (
    <div className="w-full h-screen flex">
      {/* Back screen */}
      <div className="relative w-1/3">
        <div className="relative">
          <div>
            <img src={backImage} className="w-full h-screen" />
          </div>
          <div className="absolute w-full h-screen top-0 mask1 z-10 opacity-80"></div>
        </div>
        <div className="absolute bottom-[64px] ml-6 z-20">
          <div className="font-black text-[42px]">INVEST WITH</div>
          <div className="font-black text-[42px]">CONFIDENCE</div>
          <div className="text-base">
            The tool you need to make your money work harder
          </div>
        </div>
      </div>
      {/* Main Config */}
      <div className="w-2/3 flex flex-col justify-between">
        <div className="flex justify-center">
          <div className="w-3/5 text-center flex flex-col items-center">
            <div className="text-center py-14">
              <img src={logo} />
            </div>
            {/*  */}
            <div>
              <div className="font-bold text-2xl">Welcome back.</div>
              <div className="text-sm flex py-2">
                <div className="text-[#979797]">New to Capiwise? </div>
                <div className="mx-1 border-b">
                  {/* Sign Up */}
                  <p
                    className="text-center cursor-pointer"
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </p>
                </div>
              </div>
            </div>
            {/*  */}
            <div className="w-full">
              <div className="text-left">
                <div className="text-sm text-[#979797]">Your email address</div>
                <div className="border-[#979797] rounded-md h-9 mt-1">
                  <Email
                    emailIsValid={emailIsValid}
                    email={email}
                    setEmail={setEmail}
                  />
                </div>
              </div>
              <div className="text-left mt-6">
                <div className="text-sm text-[#979797]">Your password</div>
                <div className="border-[#979797] rounded-md h-9 mt-1">
                  <Password
                    label="Password"
                    passwordIsValid={passwordIsValid}
                    password={password}
                    setPassword={setPassword}
                  />
                </div>
              </div>
              {error != "" ? (
                <div className="pt-3 text-left text-red-500">{error}</div>
              ) : (
                <></>
              )}
              <div className="rounded-full h-9 mt-4">
                <button
                  className="w-full bg-[#2EBD85] rounded-full p-2 text-[#040B11] text-sm font-medium"
                  disabled={isValid}
                  onClick={() => signInClicked()}
                >
                  Sign In
                </button>
              </div>
            </div>
            {/*  */}
            <div className="w-full flex justify-between mt-6 items-center">
              <div className="flex items-center">
                <div
                  className="w-4 h-4 border-[1px] border-[#979797] bg-transparent flex flex-col rounded-[2px]"
                  onClick={() => setRememberMe(!rememberMe)}
                >
                  {rememberMe ? (
                    <div className="bg-[#0053AA] w-full h-full"></div>
                  ) : (
                    <></>
                  )}
                </div>
                <div className="flex items-center">
                  <div className="text-sm text-[#979797] px-2">Remember me</div>
                  <div className="pt-1">
                    <img src={infoIcon} />
                  </div>
                </div>
              </div>
              <div
                className="flex justify-start items-center mt-2"
                onClick={passwordResetClicked}
              >
                <span className="text-[#979797] text-sm cursor-pointer hover:underline">
                  Forgot Password?
                </span>
              </div>
            </div>
            {/*  */}
            <div className="w-full mt-6">
              <div className="text-left text-sm text-[#979797]">
                Or log in with
              </div>
              <div className="flex justify-between py-6">
                <div className="w-1/3 px-1">
                  <div
                    className="rounded-full bg-transparent hover:bg-[#0053AA33] hover:cursor-pointer border-[#979797] border flex justify-center py-2"
                    // onClick={() => googleLoginHandle()}
                  >
                    <img src={googleIcon} className="w-5 h-5" />
                  </div>
                </div>
                <div className="w-1/3 px-1">
                  <div className="rounded-full bg-transparent hover:cursor-pointer border-[#979797] border flex justify-center py-2">
                    <img src={facebookIcon} />
                  </div>
                </div>
                <div className="w-1/3 px-1">
                  <div className="rounded-full bg-transparent hover:cursor-pointer border-[#979797] border flex justify-center py-2">
                    <img src={appleIcon} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center bg-[#0B1620] w-full py-2">
          <div className="text-sm">© Capiwise 2023</div>
        </div>
      </div>
    </div>
  );
};

export default login;
