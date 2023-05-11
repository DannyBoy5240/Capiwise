import React, { useState, useContext, useEffect } from "react";

import { useNavigate, useLocation } from "react-router-dom";

import { useValidEmail } from "../../hooks/useAuthHooks";
import { Email } from "../../components/authComponents";

import { AuthContext } from "../../contexts/authContext";

import AuthHeader from "./AuthHeader";

import Key from "../../assets/key.svg";
import Sender from "../../assets/sender.svg";
import backIcon from "../../assets/back_ico.svg";
import infoIcon from "../../assets/info_ico.svg";
import confirmIcon from "../../assets/confirm_ico.svg";
import Logo from "../../assets/logo.svg";
import downIcon from "../../assets/down_ico.svg";
import showPasswordIcon from "../../assets/showpassword_ico.svg";

import googleIcon from "../../assets/google_ico.svg";
import facebookIcon from "../../assets/facebook_ico.svg";
import appleIcon from "../../assets/apple_ico.svg";

export default function Register() {
  const [progress, setProgress] = useState(0);
  const [verifyStatus, setVerifyStatus] = useState(0);

  const { email, setEmail, emailIsValid } = useValidEmail("");

  const navigate = useNavigate();

  const [countryNameList, setCountryNameList] = useState([]);
  const [callingCodesList, setCallingCodesList] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  const [phoneNumber1, setPhoneNumber1] = useState("");
  const [phoneNumber2, setPhoneNumber2] = useState("");
  const [password, setPassword] = useState("");

  const [isShowPassword, setIsShowPassword] = useState(false);

  const getCountryNames = async () => {
    try {
      // Make a GET request to the REST Countries API
      const response = await fetch("https://restcountries.com/v2/all");

      // Parse the response data as JSON
      const data = await response.json();

      // Extract the country names from the response data
      const countryNames = data.map((country: any) => country.name);
      const callingCodes = data.map((country: any) => country.callingCodes);
      setCountryNameList(countryNames);
      setCallingCodesList(callingCodes);
    } catch (error) {
      throw new Error("Failed to get country names");
    }
  };

  useEffect(() => {
    getCountryNames();
  }, []);

  useEffect(() => {
    const authHeader = document.getElementById("auth-header");
    if (progress == 4) {
      if (authHeader) authHeader.style.display = "none";
    } else {
      if (authHeader) authHeader.style.display = "block";
    }
  }, [progress]);

  const authContext = useContext(AuthContext);
  // Create Account Progress 1
  const CreateAccountUserComponent = (
    <div className="text-center w-[400px]">
      {/* User Account Input Component */}
      <div className="text-2xl text-white font-bold pt-11">
        Create your Capiwise account
      </div>
      <div className="text-sm text-[#979797] pt-3.5">
        Already have an account?{" "}
        <span
          className="text-white border-b hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          Log in
        </span>
      </div>
      <div className="pt-10">
        <div className="text-sm text-left text-[#979797]">
          First, enter your email address
        </div>
        <div className="border-[#979797] rounded-md h-9 mt-1">
          <Email
            emailIsValid={emailIsValid}
            email={email}
            setEmail={setEmail}
          />
        </div>
      </div>
      <div className="pt-4">
        <button
          className="bg-[#2EBD85] hover:bg-[#E2E7ED] w-[400px] py-2 rounded-full text-black"
          disabled={!emailIsValid || email.length === 0}
          onClick={() => setProgress(1)}
        >
          Next
        </button>
      </div>
      {/* Social Sign in Components */}
      <div className="pt-6">
        <div className="text-sm text-left text-[#979797]">Or log in with</div>
        <div className="flex pt-4">
          <div className="w-1/3 px-1">
            <div className="rounded-full bg-transparent border-[#979797] border py-2 flex justify-center">
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
      {/* Terms and Policy */}
      <div className="pt-4 text-[#979797] text-sm">
        By registering, you accept our{" "}
        <span className="text-white border-b">Terms of use</span> and{" "}
        <span className="text-white border-b">Privacy Policy</span>
      </div>
    </div>
  );

  // Create Account Progress 2
  const PrimaryResidenceComponent = (
    <div className="text-center w-[400px]">
      <div className="text-2xl text-white font-bold pt-11">
        Your country of primary residence
      </div>
      <div className="absolute left-[100px] flex items-center">
        <div>
          <img src={backIcon} width={14} height={14} />
        </div>
        <button
          className="text-white text-base border-b ml-2"
          onClick={() => setProgress(progress - 1)}
        >
          Back
        </button>
      </div>
      {/* Country Select Component */}
      <div className="pt-8 text-base">
        <select
          id="country-select"
          className="bg-black p-3 border border-white rounded-xl w-[400px]"
          onChange={(ev) => setSelectedCountry(ev.target.value)}
        >
          {countryNameList.map((country: any) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>
      </div>
      {/* Continue Next Step Button */}
      <div className="pt-4">
        <button
          className="bg-[#2EBD85] hover:bg-[#E2E7ED] w-[400px] py-2 rounded-full text-black"
          onClick={() => {
            setRegisterError("");
            setProgress(2);
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
  // Create Account Progress 3
  const sendPhoneVerifyCode = async () => {
    try {
      // await authContext.setPhoneVerifyCode(phoneNumber1 + phoneNumber2);
      setVerifyStatus(4);
    } catch (err) {
      // setError("Unknown user");
    }
  };

  const VerifyComponent1 = (
    <>
      <div className="text-2xl text-white font-bold pt-11">
        Verify your phone number with a code
      </div>
      <div className="absolute left-[100px] flex items-center">
        <div>
          <img src={backIcon} width={14} height={14} />
        </div>
        <button
          className="text-white text-base border-b ml-2"
          onClick={() => setProgress(progress - 1)}
        >
          Back
        </button>
      </div>
      <div className="pt-8 text-[#979797]">
        It helps us keep your account secure.{" "}
        <span className="text-white border-b">Learn more</span>
      </div>
      <div className="flex flex-row pt-1">
        <div className="relative w-1/4 border border-[#979797] rounded-lg">
          <select
            id="callingcode-select"
            className="bg-transparent w-full p-3 focus:outline-none rounded-lg"
            onChange={(ev) => setPhoneNumber1(ev.target.value)}
          >
            {callingCodesList.map((code: any, idx: number) => (
              <option
                key={"ccl" + code + idx}
                value={code}
                className="bg-black"
              >
                +{code}
              </option>
            ))}
          </select>
        </div>
        <div className="w-3/4 ml-3 border border-[#979797] rounded-lg">
          <input
            className="w-full bg-transparent focus:outline-none rounded-lg p-2"
            onChange={(ev) => setPhoneNumber2(ev.target.value)}
          />
        </div>
      </div>
      <div className="pt-4">
        <button
          className="bg-[#979797] hover:bg-[#2EBD85] w-[400px] text-[#464F56] py-2 rounded-full text-black"
          onClick={() => sendPhoneVerifyCode()}
        >
          Send verification code
        </button>
      </div>
    </>
  );
  const VerifyComponent2 = (
    <>
      <div className="absolute left-[100px] top-[150px] flex items-center">
        <div className="text-center">
          <img src={backIcon} width={14} height={14} />
        </div>
        <button
          className="text-white text-base border-b ml-2"
          onClick={() => setProgress(progress - 1)}
        >
          Back
        </button>
      </div>
      <div className="pt-4 flex justify-center">
        <img src={infoIcon} />
      </div>
      <div className="text-xl text-white font-bold">
        This phone number is already in use
      </div>
      <div className="pt-4 text-[#979797] text-sm">
        It‘s linked to an account with the email {email[0]}*******
        {email[email.length - 1]}@gmail.com
      </div>
      <div className="pt-4 text-[#979797] text-sm">
        Do you recognise this email address?
      </div>
      <div className="pt-4">
        <button
          className="bg-[#1CA65E] hover:bg-[#2EBD85] w-[400px] text-black py-2 rounded-full text-black"
          onClick={() => setVerifyStatus(2)}
        >
          Yes, I recognise this email
        </button>
      </div>
      <div className="pt-4">
        <button
          className="bg-transparent hover:bg-[#2EBD85] w-[400px] text-black py-2 rounded-full text-white border border-white"
          onClick={() => setVerifyStatus(1)}
        >
          No, I don‘t recognise this email
        </button>
      </div>
    </>
  );
  const VerifyComponent3 = (
    <>
      <div className="absolute left-[100px] top-[150px] flex items-center">
        <div className="text-center">
          <img src={backIcon} width={14} height={14} />
        </div>
        <button
          className="text-white text-base border-b ml-2"
          onClick={() => setProgress(progress - 1)}
        >
          Back
        </button>
      </div>
      <div className="pt-4 flex justify-center">
        <img src={infoIcon} />
      </div>
      <div className="text-xl text-white font-bold">
        Do you still have access to this email address?
      </div>
      <div className="pt-4 text-[#979797] text-sm">
        {email[0]}*******
        {email[email.length - 1]}@gmail.com
      </div>
      <div className="pt-4">
        <button
          className="bg-[#1CA65E] hover:bg-[#2EBD85] w-[400px] text-black py-2 rounded-full text-black"
          onClick={() => setVerifyStatus(3)}
        >
          Yes, I still have access to the email
        </button>
      </div>
      <div className="pt-4">
        <button
          className="bg-transparent hover:bg-[#2EBD85] w-[400px] text-black py-2 rounded-full text-white border border-white"
          onClick={() => setVerifyStatus(1)}
        >
          No, I don‘t recognise this email
        </button>
      </div>
    </>
  );
  const VerifyComponent4 = (
    <>
      <div className="absolute left-[100px] top-[150px] flex items-center">
        <div className="text-center">
          <img src={backIcon} width={14} height={14} />
        </div>
        <button
          className="text-white text-base border-b ml-2"
          onClick={() => setProgress(progress - 1)}
        >
          Back
        </button>
      </div>
      <div className="pt-4 flex justify-center">
        <img src={infoIcon} />
      </div>
      <div className="text-xl text-white font-bold">
        Do you remember the password to this account?
      </div>
      <div className="pt-4 text-[#979797] text-sm">
        {email[0]}*******
        {email[email.length - 1]}@gmail.com
      </div>
      <div className="pt-4">
        <button
          className="bg-[#1CA65E] hover:bg-[#2EBD85] w-[400px] text-black py-2 rounded-full text-black"
          onClick={() => {
            // setVerifyStatus(4);
            setVerifyStatus(1);
            navigate("/");
          }}
        >
          Yes, Let me log in
        </button>
      </div>
      <div className="pt-4">
        <button
          className="bg-transparent hover:bg-[#2EBD85] w-[400px] text-black py-2 rounded-full text-white border border-white"
          onClick={() => setVerifyStatus(1)}
        >
          No, I don‘t remember my password
        </button>
      </div>
    </>
  );
  // Enter 6-digit code
  const VerifyComponent5 = (
    <>
      <div className="text-2xl text-white font-bold pt-11">
        Enter the 6-digit code
      </div>
      <div className="absolute left-[100px] top-[150px] flex items-center">
        <div className="text-center">
          <img src={backIcon} width={14} height={14} />
        </div>
        <button
          className="text-white text-base border-b ml-2"
          onClick={() => setProgress(progress - 1)}
        >
          Back
        </button>
      </div>
      <div className="pt-8 text-[#979797] text-sm">
        We sent it to +{phoneNumber1 + phoneNumber2}.{" "}
        <span className="text-white border-b">change</span>
      </div>
      <div className="text-4">
        <div className="pt-8 text-left text-[#979797] text-sm">
          Your 6-digit code
        </div>
        <div className="pt-1">
          <input
            className={
              "bg-transparent border border-[#979797] text-white focus:outline-none rounded-md w-full h-full p-2"
            }
            type="text"
            onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
              // setUsername(evt.target.value);
            }}
          />
        </div>
      </div>
      <div className="pt-8 text-white text-sm">
        <span className="border-b"> I didn‘t receive a code</span>
      </div>
      <div className="pt-4">
        <button
          className="bg-[#1CA65E] hover:bg-[#2EBD85] w-[400px] text-black py-2 rounded-full text-black"
          onClick={() => {
            setProgress(3);
          }}
        >
          Submit
        </button>
      </div>
    </>
  );

  const VerifyPhoneNumberComponent = (
    <div className="text-center w-[400px]">
      {verifyStatus == 0
        ? VerifyComponent1
        : verifyStatus == 1
        ? VerifyComponent2
        : verifyStatus == 2
        ? VerifyComponent3
        : verifyStatus == 3
        ? VerifyComponent4
        : VerifyComponent5}
    </div>
  );

  // User Registration with inputed information
  const [registerError, setRegisterError] = useState("");

  const userRegisterHandle = async () => {
    try {
      const flag = await authContext.userRegister(
        email,
        selectedCountry,
        "+1234567890", // "+" + phoneNumber1 + phoneNumber2,
        password
      );
      // User created!
      if (flag == "succeed") {
        setRegisterError("");
        setProgress(4);
        // automatically navigate to login page
        setTimeout(() => {
          navigate("/");
        }, 5000);
      } else setRegisterError(flag);
    } catch (err: any) {
      // User creating occurs an error
      setRegisterError(err.message);
    }
  };

  // Create Password Component
  const passwordValidCheckingHanlder = () => {
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const isLongEnough = password.length >= 9;
    const isValid = hasLetter && hasNumber && isLongEnough;
    if (isValid) userRegisterHandle();
    else {
      document
        .getElementById("pwd_id")
        ?.setAttribute("style", "border: 1px solid red");
    }
  };

  const CreatePasswordComponent = (
    <div className="text-center w-[400px]">
      <div className="text-2xl text-white font-bold pt-11">
        Create your password
      </div>
      <div className="absolute left-[100px] top-[150px] flex items-center">
        <div className="text-center">
          <img src={backIcon} width={14} height={14} />
        </div>
        <button
          className="text-white text-base border-b ml-2"
          onClick={() => setProgress(progress - 1)}
        >
          Back
        </button>
      </div>
      <div className="text-4">
        <div className="pt-8 text-left text-[#979797] text-sm">
          Your password
        </div>
        <div className="relative pt-1">
          <input
            className="bg-transparent border border-[#979797] text-white focus:outline-none rounded-md w-full h-full p-2 pr-8 "
            type={isShowPassword ? "text" : "password"}
            id="pwd_id"
            placeholder="Input your password ..."
            onChange={(ev) => setPassword(ev.target.value)}
          />
          <div
            className="absolute right-3 top-5 hover:cursor-pointer"
            onClick={() => setIsShowPassword(!isShowPassword)}
          >
            <img src={showPasswordIcon} />
          </div>
        </div>
      </div>
      <div className="pt-4 text-[#979797] text-sm">
        Password must contain a letter and a number, and be minimum of 9
        characters
      </div>
      <div className="pt-4">
        <button
          className="bg-[#1CA65E] hover:bg-[#2EBD85] w-[400px] text-black py-2 rounded-full text-black"
          onClick={() => passwordValidCheckingHanlder()}
        >
          Continue
        </button>
      </div>
      {registerError != "" ? (
        <div className="text-left text-red-500 py-2">{registerError}</div>
      ) : (
        <></>
      )}
    </div>
  );

  const completeCreationProgress = () => {
    navigate("/");
  };

  // Complete user account creating
  const CompleteCreatingComponent = (
    <div className="bg-[#1E1E1E] w-full h-screen flex justify-center">
      <div className="w-10/12 lg:w-9/12 p-7">
        <div>
          <img src={Logo} />
        </div>
        <div className="flex flex-col text-center pt-12">
          <div className="flex justify-center">
            <img src={confirmIcon} />
          </div>
          <div className="text-white font-bold text-[50px] leading-none">
            <div>You‘re registered</div>
            <div>with capiwise</div>
          </div>
          <div className="pt-2 text-sm text-[#A8CFBD]">
            <div>You can use these details to log back into Capiwise. </div>
            <div className="pt-2">
              We will redirect you automatically in 5 seconds.
            </div>
          </div>
          <div className="pt-6">
            <button
              className="bg-[#2EBD85] hover:bg-[#2EBD85] w-[400px] text-black py-2 rounded-full text-black"
              onClick={() => completeCreationProgress()}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <AuthHeader mode={2} />
      <div className="w-full flex justify-center">
        {progress == 0
          ? CreateAccountUserComponent
          : progress == 1
          ? PrimaryResidenceComponent
          : progress == 2
          ? // ? VerifyPhoneNumberComponent
            // : progress == 3
            CreatePasswordComponent
          : CompleteCreatingComponent}
      </div>
    </>
  );
}
