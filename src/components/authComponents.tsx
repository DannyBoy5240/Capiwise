import React from "react";

export const Email: React.FunctionComponent<{
  emailIsValid: boolean;
  setEmail: (_: string) => void;
}> = ({ emailIsValid, setEmail }) => {
  return (
    // <TextField
    //   fullWidth
    //   variant="outlined"
    //   label={emailIsValid ? "Email" : "Invalid Email"}
    //   error={!emailIsValid}
    //   onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setEmail(evt.target.value);
    //   }}
    // />
    <input
      className={`bg-transparent border text-white focus:outline-none rounded-md w-full h-full px-2 ${
        !emailIsValid ? "border-red-500" : ""
      }`}
      type="email"
      placeholder={emailIsValid ? "Email" : "Invalid Email"}
      onChange={(evt) => setEmail(evt.target.value)}
    />
  );
};

export const Password: React.FunctionComponent<{
  label: string;
  passwordIsValid: boolean;
  setPassword: (_: string) => void;
}> = ({ label, passwordIsValid, setPassword }) => {
  return (
    // <TextField
    //   fullWidth
    //   type="password"
    //   variant="outlined"
    //   label={passwordIsValid ? label : "Minimum 8 characters"}
    //   error={!passwordIsValid}
    //   onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setPassword(evt.target.value);
    //   }}
    // />
    <input
      className={`bg-transparent border text-white focus:outline-none rounded-md w-full h-full px-2 ${
        !passwordIsValid ? "border-red-500" : ""
      }`}
      type="password"
      placeholder={passwordIsValid ? label : "Minimum 8 characters"}
      onChange={(evt) => setPassword(evt.target.value)}
    />
  );
};

export const Username: React.FunctionComponent<{
  usernameIsValid: boolean;
  setUsername: (_: string) => void;
}> = ({ usernameIsValid, setUsername }) => {
  return (
    // <TextField
    //   fullWidth
    //   variant="outlined"
    //   label={usernameIsValid ? "Username" : "Minimum 8 characters"}
    //   error={!usernameIsValid}
    //   onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setUsername(evt.target.value);
    //   }}
    // />
    <input
      className={`bg-transparent border text-white focus:outline-none rounded-md w-full h-full px-2 ${
        !usernameIsValid ? "border-red-500" : ""
      }`}
      type="text"
      placeholder={usernameIsValid ? "Username" : "Minimum 8 characters"}
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
    // <TextField
    //   fullWidth
    //   variant="outlined"
    //   label={codeIsValid ? "Code" : "Minimum 6 characters"}
    //   error={!codeIsValid}
    //   onChange={(evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    //     setCode(evt.target.value);
    //   }}
    // />
    <input
      className={`w-full border rounded-md p-2 ${
        !codeIsValid ? "border-red-500" : ""
      }`}
      type="text"
      placeholder={codeIsValid ? "Code" : "Minimum 6 characters"}
      onChange={(evt) => setCode(evt.target.value)}
    />
  );
};
