import React, { useState, useContext } from "react";

import { useNavigate } from "react-router-dom";

import AuthHeader from "./AuthHeader";

export default function ForgetPassword() {
  const navigate = useNavigate();

  return (
    <>
      <AuthHeader mode={1} />
      <div className="w-full flex justify-center">
        <div className="text-center w-[400px]">
          <div className="text-2xl text-white font-bold pt-11">
            I've forgotten my password
          </div>
          <div className="text-sm text-[#979797] pt-3.5">
            If you‘re logged out and can‘t remember your passwors, we can send
            you an email with a link to reset it.
          </div>
          <div className="pt-4">
            <button
              className="bg-[#2EBD85] hover:bg-[#E2E7ED] w-[400px] py-2 rounded-full text-black"
              onClick={() => navigate("/resetpassword")}
            >
              Reset password
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
