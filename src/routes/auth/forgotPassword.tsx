import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import {
  useValidCode,
  useValidPassword,
  useValidUsername,
} from "../../hooks/useAuthHooks";
import { Code, Password, Username } from "../../components/authComponents";

import { AuthContext } from "../../contexts/authContext";

export default function ForgotPassword() {
  const { code, setCode, codeIsValid } = useValidCode("");
  const { password, setPassword, passwordIsValid } = useValidPassword("");
  const { username, setUsername, usernameIsValid } = useValidUsername("");
  const [error, setError] = useState("");
  const [reset, setReset] = useState(false);

  const {
    password: passwordConfirm,
    setPassword: setPasswordConfirm,
    passwordIsValid: passwordConfirmIsValid,
  } = useValidPassword("");

  const isValid =
    !codeIsValid ||
    code.length === 0 ||
    !usernameIsValid ||
    username.length === 0 ||
    !passwordIsValid ||
    password.length === 0 ||
    !passwordConfirmIsValid ||
    passwordConfirm.length === 0;

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const resetPassword = async () => {
    try {
      await authContext.forgotPassword(username, code, password);
      setReset(true);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  const updatePassword = (
    <>
      <div className="w-80 mx-auto">
        <Code codeIsValid={codeIsValid} setCode={setCode} />
        <Username usernameIsValid={usernameIsValid} setUsername={setUsername} />
        <Password
          label="Password"
          passwordIsValid={passwordIsValid}
          password={password}
          setPassword={setPassword}
        />
        <Password
          label="Confirm Password"
          passwordIsValid={passwordConfirmIsValid}
          password={passwordConfirm}
          setPassword={setPasswordConfirm}
        />
      </div>

      <div className="mt-2">
        <p className="text-red-500 text-sm">{error}</p>
      </div>

      <div className="mt-2">
        <div className="flex justify-center">
          <div className="m-1">
            <button
              onClick={() => navigate(-1)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
          <div className="m-1">
            <button
              disabled={isValid}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={resetPassword}
            >
              Change Password
            </button>
          </div>
        </div>
      </div>
    </>
  );

  const passwordReset = (
    <>
      <h5 className="text-2xl font-bold">Password Reset</h5>

      <div className="m-4">
        <button
          onClick={() => navigate("/signin")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </button>
      </div>
    </>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
      <div className="col-span-1 md:col-span-2 lg:col-span-3">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="mb-4">
            <h3 className="text-3xl font-bold text-center">Forgot Password</h3>
          </div>
          {!reset ? updatePassword : passwordReset}
        </div>
      </div>
    </div>
  );
}
