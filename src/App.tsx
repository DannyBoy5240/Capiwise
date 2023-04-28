import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider, {
  AuthIsSignedIn,
  AuthIsNotSignedIn,
} from "./contexts/authContext";

import SignIn from "./routes/auth/signIn";
import SignUp from "./routes/auth/signUp";
import VerifyCode from "./routes/auth/verify";
import RequestCode from "./routes/auth/requestCode";
import ForgetPassword from "./routes/auth/forgetPassword";
import ResetPassword from "./routes/auth/resetPassword";

import ForgotPassword from "./routes/auth/forgotPassword";
import ChangePassword from "./routes/auth/changePassword";

import SearchStock from "./pages/SearchStock";

import Login from "./routes/auth/login";

const SignInRoute: React.FunctionComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify" element={<VerifyCode />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

const MainRoute: React.FunctionComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/search" element={<SearchStock />} />
    </Routes>
  </BrowserRouter>
);

const App: React.FunctionComponent = () => (
  <>
    <AuthProvider>
      <AuthIsSignedIn>
        <MainRoute />
      </AuthIsSignedIn>
      <AuthIsNotSignedIn>
        <SignInRoute />
      </AuthIsNotSignedIn>
    </AuthProvider>
  </>
);

export default App;
