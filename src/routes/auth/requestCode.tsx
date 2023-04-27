import React, { useState, useContext } from "react";

import { useNavigate, useParams } from "react-router-dom";

import { useValidUsername } from "../../hooks/useAuthHooks";
import { Username } from "../../components/authComponents";

import { AuthContext } from "../../contexts/authContext";

export default function RequestCode() {
  const { email } = useParams<{ email: string }>();

  const { username, setUsername, usernameIsValid } = useValidUsername("");
  const [error, setError] = useState("");
  const [resetSent, setResetSent] = useState(false);

  const isValid = !usernameIsValid || username.length === 0;

  const navigate = useNavigate();

  const authContext = useContext(AuthContext);

  const sendCodeClicked = async () => {
    try {
      await authContext.sendCode(username);
      setResetSent(true);
    } catch (err) {
      setError("Unknown user");
    }
  };

  const emailSent = (
    <>
      <div className="mt-1">
        <h5 className="text-2xl font-bold text-gray-800">
          Reset Code Sent to {username}
        </h5>
      </div>
      <div className="mt-4">
        <button
          // onClick={() => navigate.push("forgotpassword")}
          onClick={() => {
            console.log("email", email);
            navigate("/forgotpassword");
          }}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Reset Password
        </button>
      </div>
    </>
  );

  const sendCode = (
    <>
      <div className="w-80 m-1">
        <Username usernameIsValid={usernameIsValid} setUsername={setUsername} />
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
              onClick={sendCodeClicked}
            >
              Send Code
            </button>
          </div>
        </div>
      </div>
    </>
  );

  return (
    <div className="flex justify-center items-center">
      <div className="w-full sm:w-1/2 lg:w-1/3">
        <div className="bg-white p-8">
          <div className="flex flex-col justify-center items-center">
            {emailSent}
          </div>
        </div>
      </div>
    </div>
  );
}
