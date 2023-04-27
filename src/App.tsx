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
import ForgotPassword from "./routes/auth/forgotPassword";
import ChangePassword from "./routes/auth/changePassword";
import Landing from "./routes/landing";
import Home from "./routes/home";

import Login from "./routes/auth/login";

const SignInRoute: React.FunctionComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify" element={<VerifyCode />} />
      <Route path="/requestcode/:email" element={<RequestCode />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/" element={<Login />} />
    </Routes>
  </BrowserRouter>
);

const MainRoute: React.FunctionComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);

const App: React.FunctionComponent = () => (
  <>
    {/* <CssBaseline /> */}
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
