import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import AuthProvider, {
  AuthIsSignedIn,
  AuthIsNotSignedIn,
} from "./contexts/authContext";

import Home from "./routes/home";
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
import Register from "./routes/auth/register";

import ETFSummary from "./pages/ETFSummary";
import StockSummary from "./pages/StockSummary";

import MenuProfileSettings from "./components/MenuProfileSettings";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";
import SearchBox from "./components/SearchBox";

import Logo from "./assets/logo.svg";

import TestPage from "./pages/TestPage";

const SignInRoute: React.FunctionComponent = () => (
  <BrowserRouter>
    <Routes>
      {/* <Route path="/signin" element={<SignIn />} /> */}
      <Route path="/signup" element={<SignUp />} />
      <Route path="/verify" element={<VerifyCode />} />
      <Route path="/forgetpassword" element={<ForgetPassword />} />
      <Route path="/resetpassword" element={<ResetPassword />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/test" element={<TestPage />} />
    </Routes>
  </BrowserRouter>
);

const MainRoute: React.FunctionComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/changepassword" element={<ChangePassword />} />
      <Route
        path="/search"
        element={
          <div className="flex flex-col h-screen justify-between">
            <div className="flex flex-col">
              <div className="self-end m-4">
                <MenuProfileSettings />
              </div>
              <div className="pt-12">
                <SearchStock />
              </div>
            </div>
            <Footer />
          </div>
        }
      />
      <Route
        path="/etfsummary"
        element={
          <div className="flex flex-col h-screen">
            <div className="flex bg-[#0B1620] justify-between items-center p-6">
              <div>
                <img src={Logo} />
              </div>
              <SearchBox />
              <MenuProfileSettings />
            </div>
            <div>
              <MenuBar />
              <ETFSummary />
            </div>
            <Footer />
          </div>
        }
      />
      <Route
        path="/stocksummary"
        element={
          <div className="flex flex-col h-screen">
            <div className="flex bg-[#0B1620] justify-between items-center p-6">
              <div>
                <img src={Logo} />
              </div>
              <SearchBox />
              <MenuProfileSettings />
            </div>
            <div>
              <MenuBar />
              <StockSummary />
            </div>
            <Footer />
          </div>
        }
      />
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
