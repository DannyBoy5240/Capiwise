import React, { useState, useEffect, useContext, FC } from "react";

import { useNavigate } from "react-router-dom";

import backImage from "../../assets/background.png";
import logo from "../../assets/logo.svg";
import googleIcon from "../../assets/google_ico.svg";
import facebookIcon from "../../assets/facebook_ico.svg";
import appleIcon from "../../assets/apple_ico.svg";

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

  const isValid =
    !emailIsValid ||
    email.length === 0 ||
    !passwordIsValid ||
    password.length === 0;

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const signInClicked = async () => {
    try {
      await authContext.signInWithEmail(email, password, {
        mfaSetup: (challengeName: any, challengeParameters: any) => {
          // Handle MFA setup here
          console.log("Handle MFA setup here!");
        },
      });
      navigate("/");
    } catch (err: any) {
      if (err.code === "UserNotConfirmedException") {
        navigate("/verify");
      } else {
        setError(err.message);
      }
    }
  };

  const passwordResetClicked = async () => {
    navigate(`/requestcode/${email}`);
  };

  return (
    <div className="w-full h-screen flex">
      {/* Back screen */}
      <div className="relative w-1/3">
        <img src={backImage} className="w-full h-screen" />
        <div className="absolute bottom-[64px] ml-6">
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
                    onClick={() => navigate("/signup")}
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
                  <Email emailIsValid={emailIsValid} setEmail={setEmail} />
                </div>
              </div>
              <div className="text-left mt-6">
                <div className="text-sm text-[#979797]">Your password</div>
                <div className="border-[#979797] rounded-md h-9 mt-1">
                  <Password
                    label="Password"
                    passwordIsValid={passwordIsValid}
                    setPassword={setPassword}
                  />
                </div>
              </div>
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
              <div className="flex">
                <input type="checkbox" />
                <div className="flex items-center">
                  <div className="text-sm text-[#979797] px-2">Remember me</div>
                  <div>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="6" cy="6" r="5.5" stroke="#979797" />
                      <path
                        d="M6.12109 7.39844H5.39453C5.39714 7.14844 5.41927 6.94401 5.46094 6.78516C5.50521 6.6237 5.57682 6.47656 5.67578 6.34375C5.77474 6.21094 5.90625 6.0599 6.07031 5.89062C6.1901 5.76823 6.29948 5.65365 6.39844 5.54688C6.5 5.4375 6.58203 5.32031 6.64453 5.19531C6.70703 5.06771 6.73828 4.91536 6.73828 4.73828C6.73828 4.55859 6.70573 4.40365 6.64062 4.27344C6.57812 4.14323 6.48438 4.04297 6.35938 3.97266C6.23698 3.90234 6.08464 3.86719 5.90234 3.86719C5.7513 3.86719 5.60807 3.89453 5.47266 3.94922C5.33724 4.00391 5.22786 4.08854 5.14453 4.20312C5.0612 4.3151 5.01823 4.46224 5.01562 4.64453H4.29297C4.29818 4.35026 4.37109 4.09766 4.51172 3.88672C4.65495 3.67578 4.84766 3.51432 5.08984 3.40234C5.33203 3.29036 5.60286 3.23438 5.90234 3.23438C6.23307 3.23438 6.51432 3.29427 6.74609 3.41406C6.98047 3.53385 7.15885 3.70573 7.28125 3.92969C7.40365 4.15104 7.46484 4.41406 7.46484 4.71875C7.46484 4.95312 7.41667 5.16927 7.32031 5.36719C7.22656 5.5625 7.10547 5.74609 6.95703 5.91797C6.80859 6.08984 6.65104 6.25391 6.48438 6.41016C6.34115 6.54297 6.24479 6.69271 6.19531 6.85938C6.14583 7.02604 6.12109 7.20573 6.12109 7.39844ZM5.36328 8.63672C5.36328 8.51953 5.39974 8.42057 5.47266 8.33984C5.54557 8.25911 5.65104 8.21875 5.78906 8.21875C5.92969 8.21875 6.03646 8.25911 6.10938 8.33984C6.18229 8.42057 6.21875 8.51953 6.21875 8.63672C6.21875 8.7487 6.18229 8.84505 6.10938 8.92578C6.03646 9.00651 5.92969 9.04688 5.78906 9.04688C5.65104 9.04688 5.54557 9.00651 5.47266 8.92578C5.39974 8.84505 5.36328 8.7487 5.36328 8.63672Z"
                        fill="#979797"
                      />
                    </svg>
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
                    className="rounded-full bg-transparent border-[#979797] border py-2 flex justify-center"
                    // onClick={() => googleAuth()}
                  >
                    <img src={googleIcon} />
                  </div>
                </div>
                <div className="w-1/3 px-1">
                  <div className="rounded-full bg-transparent border-[#979797] border py-2 flex justify-center">
                    <img src={facebookIcon} />
                  </div>
                </div>
                <div className="w-1/3 px-1">
                  <div className="rounded-full bg-transparent border-[#979797] border py-2 flex justify-center">
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
