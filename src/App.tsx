import React from "react";

import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";

import AuthProvider, {
  AuthIsSignedIn,
  AuthIsNotSignedIn,
} from "./contexts/authContext";

import {
  GoogleOAuthProvider,
  GoogleLogin,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from "@react-oauth/google";

import Login from "./routes/auth/login";
import Register from "./routes/auth/register";
import ForgetPassword from "./routes/auth/forgetPassword";
import ResetPassword from "./routes/auth/resetPassword";

import SearchStock from "./pages/SearchStock";
import ETFSummary from "./pages/ETFSummary";
import StockSummary from "./pages/StockSummary";

import MenuProfileSettings from "./components/MenuProfileSettings";
import MenuBar from "./components/MenuBar";
import Footer from "./components/Footer";
import SearchBox from "./components/SearchBox";

import Logo from "./assets/logo.svg";

const SignInRoute: React.FunctionComponent = () => (
  <BrowserRouter>
    <GoogleOAuthProvider clientId="1068316747994-l0ftul2edhuccgepq3dglljhkb5et48k.apps.googleusercontent.com">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgetpassword" element={<ForgetPassword />} />
        <Route path="/resetpassword" element={<ResetPassword />} />
      </Routes>
    </GoogleOAuthProvider>
  </BrowserRouter>
);

const MainRoute: React.FunctionComponent = () => (
  <BrowserRouter>
    <Routes>
      <Route
        path="/search"
        element={
          <div className="flex flex-col h-screen justify-between">
            <div className="flex flex-col">
              <div
                className="m-4"
                style={{ display: "flex", justifyContent: "end" }}
              >
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
  <AuthProvider>
    <AuthIsSignedIn>
      <MainRoute />
    </AuthIsSignedIn>
    <AuthIsNotSignedIn>
      <SignInRoute />
    </AuthIsNotSignedIn>
  </AuthProvider>
);

export default App;
