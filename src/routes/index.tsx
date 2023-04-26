import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "../components/Footer";
import MenuProfileSettings from "../components/MenuProfileSettings";
import Logo from "../components/Logo";
import SearchBox from "../components/SearchBox";

import Home from "pages/Home";
import SearchStock from "pages/SearchStock";
import ETFSummary from "pages/ETFSummary";
import StockSummary from "pages/StockSummary";

import MenuBar from "../components/MenuBar";

import Login from "pages/Login";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/test" element={<Home />} />
          <Route
            path="/search"
            element={
              <div className="self-end m-4">
                <MenuProfileSettings />
              </div>
            }
          />
          <Route
            path="/etfsummary"
            element={
              <div className="flex bg-[#0B1620] justify-between items-center p-6">
                <div className="">
                  <Logo />
                </div>
                <SearchBox />
                <MenuProfileSettings />
              </div>
            }
          />
          <Route
            path="/stocksummary"
            element={
              <div className="flex bg-[#0B1620] justify-between items-center p-6">
                <div className="">
                  <Logo />
                </div>
                <SearchBox />
                <MenuProfileSettings />
              </div>
            }
          />
        </Routes>

        <div className="grow flex flex-col justify-center mb-48">
          <Routes>
            <Route path="/search" element={<SearchStock />} />
            <Route
              path="/etfsummary"
              element={
                <div>
                  <MenuBar />
                  <ETFSummary />
                </div>
              }
            />
            <Route
              path="/stocksummary"
              element={
                <div>
                  <MenuBar />
                  <StockSummary />
                </div>
              }
            />
          </Routes>
        </div>

        <Routes>
          <Route path="/search" element={<Footer />} />
          <Route path="/etfsummary" element={<Footer />} />
          <Route path="/stocksummary" element={<Footer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default Router;
