import { FC } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Footer from "../components/Footer";
import MenuProfileSettings from "../components/MenuProfileSettings";

import Home from "pages/Home";
import SearchStock from "pages/SearchStock";

const Router: FC = () => {
  return (
    <BrowserRouter>
      <div className="flex flex-col h-screen">
        <Routes>
          {/* <Route path="/" element={<></>} /> */}
          <Route
            path="/"
            element={
              <div className="self-end m-4">
                <MenuProfileSettings />
              </div>
            }
          />
        </Routes>

        <div className="grow flex flex-col justify-center mb-48">
          <Routes>
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<SearchStock />} />
          </Routes>
        </div>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default Router;
