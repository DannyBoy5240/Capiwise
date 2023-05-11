import React from "react";

export const Email: React.FunctionComponent<{
  emailIsValid: boolean;
  email: string;
  setEmail: (_: string) => void;
}> = ({ emailIsValid, email, setEmail }) => {
  return (
    <input
      className={`bg-transparent border border-[#979797] text-white focus:outline-none rounded-md w-full h-full px-2 ${
        !emailIsValid ? "border-red-500" : ""
      }`}
      type="email"
      value={email}
      placeholder={emailIsValid ? "" : "Email is invalid!"}
      onChange={(evt) => setEmail(evt.target.value)}
    />
  );
};

export const Password: React.FunctionComponent<{
  label: string;
  passwordIsValid: boolean;
  password: string;
  setPassword: (_: string) => void;
}> = ({ label, passwordIsValid, password, setPassword }) => {
  return (
    <input
      className={`bg-transparent border border-[#979797] text-white focus:outline-none rounded-md w-full h-full px-2 ${
        !passwordIsValid ? "border-red-500" : ""
      }`}
      type="password"
      value={password}
      // placeholder={passwordIsValid ? label : "Minimum 8 characters"}
      onChange={(evt) => setPassword(evt.target.value)}
    />
  );
};

export const Username: React.FunctionComponent<{
  usernameIsValid: boolean;
  setUsername: (_: string) => void;
}> = ({ usernameIsValid, setUsername }) => {
  return (
    <input
      className={`bg-transparent border border-[#979797] text-white focus:outline-none rounded-md w-full h-full px-2 ${
        !usernameIsValid ? "border-red-500" : ""
      }`}
      type="text"
      // placeholder={usernameIsValid ? "Username" : "Minimum 8 characters"}
      onChange={(evt: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(evt.target.value);
      }}
    />
  );
};

export const Code: React.FunctionComponent<{
  codeIsValid: boolean;
  setCode: (_: string) => void;
}> = ({ codeIsValid, setCode }) => {
  return (
    <input
      className={`w-full border rounded-md p-2 ${
        !codeIsValid ? "border-red-500" : ""
      }`}
      type="text"
      // placeholder={codeIsValid ? "Code" : "Minimum 6 characters"}
      onChange={(evt) => setCode(evt.target.value)}
    />
  );
};
