import React, { useState, useContext } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { useValidEmail } from "../../hooks/useAuthHooks";
import { Email } from "../../components/authComponents";

import { AuthContext } from "../../contexts/authContext";

import AuthHeader from "./AuthHeader";

import Key from "../../assets/key.svg";
import Sender from "../../assets/sender.svg";

export default function ResetPassword() {
  const location = useLocation();
  const rpemail = location.state?.email;

  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const { email, setEmail, emailIsValid } = useValidEmail("");

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const sendCodeClicked = async () => {
    try {
      await authContext.sendCode(rpemail);
      setResetSent(true);
    } catch (err) {
      setError("Unknown user");
    }
  };

  const ResetPasswordComponent = (
    <div className="text-center w-[400px]">
      <div className="flex justify-center pt-6">
        <img src={Key} />
      </div>
      <div className="text-2xl text-white font-bold pt-11">Reset password</div>
      <div className="text-sm text-[#979797] pt-3.5">
        Just enter the email address you registered with and we‘ll send you a
        link to rest your password.
      </div>
      <div className="pt-4">
        <div className="text-sm text-left text-[#979797]">
          Enter your email address
        </div>
        <div className="border-[#979797] rounded-md h-9 mt-1">
          <Email emailIsValid={emailIsValid} setEmail={setEmail} />
        </div>
      </div>
      <div className="pt-4">
        <button
          className="bg-[#2EBD85] hover:bg-[#E2E7ED] w-[400px] py-2 rounded-full text-black"
          disabled={!emailIsValid || email.length === 0}
          onClick={() => {
            setResetSent(true);
          }}
        >
          Send password reset link
        </button>
      </div>
    </div>
  );

  const CheckEmailComponent = (
    <div className="text-center w-[400px]">
      <div className="flex justify-center pt-6">
        <img src={Sender} />
      </div>
      <div className="text-2xl text-white font-bold pt-11">
        Check your email
      </div>
      <div className="text-sm text-[#979797] pt-3.5">
        We sent an email to {email}
      </div>
      <div className="text-sm text-[#979797] pt-1">
        If you don‘t get the email soon, check your spam folder.
      </div>
      <div className="pt-4">
        <button
          className="bg-[#2EBD85] hover:bg-[#E2E7ED] w-[400px] py-2 rounded-full text-black"
          disabled={!emailIsValid || email.length === 0}
          onClick={() => navigate("/")}
        >
          Back to login
        </button>
      </div>
    </div>
  );

  return (
    <>
      <AuthHeader mode={2} />
      <div className="w-full flex justify-center">
        {resetSent ? CheckEmailComponent : ResetPasswordComponent}
      </div>
    </>
  );
}
