import { FC, useContext } from "react";

import { useNavigate } from "react-router-dom";

import { AuthContext } from "../contexts/authContext";

import logoutIcon from "../assets/logout_ico.svg";

const MenuProfileSettings: FC = () => {
  const navigatge = useNavigate();

  const auth = useContext(AuthContext);

  async function logOutClicked() {
    await auth.signOut();
    window.localStorage.setItem("socialAuthStatus", "false");
    navigatge("/");
    window.location.reload();
  }

  return (
    <div className="flex items-center">
      <div className="p-2.5 rounded-full bg-[#040B11] hover:cursor-pointer">
        <p className="text-[#2EBD85] font-bold text-base">
          {/* {localStorage.useremail
            ? (
                localStorage.useremail[0] + localStorage.useremail[1]
              ).toUpperCase()
            : "CP"} */}
          CP
        </p>
      </div>
      {/* <div className="flex items-center hover:cursor-pointer">
        <p className="text-sm font-bold mx-2">
          {localStorage.useremail ? localStorage.useremail : ""}
        </p>
        <svg
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5.99997 7.42042C5.7849 7.42042 5.56987 7.3383 5.4059 7.17441L0.24617 2.01463C-0.0820565 1.6864 -0.0820565 1.15424 0.24617 0.826148C0.574263 0.498055 1.10632 0.498055 1.43457 0.826148L5.99997 5.39181L10.5654 0.826308C10.8936 0.498214 11.4256 0.498214 11.7537 0.826308C12.0821 1.1544 12.0821 1.68656 11.7537 2.01479L6.59404 7.17457C6.42999 7.33849 6.21495 7.42042 5.99997 7.42042Z"
            fill="#464F56"
          />
        </svg>
      </div>
      <div
        className="ml-4 hover:cursor-pointer"
        onClick={() => logOutClicked()}
      >
        <img src={logoutIcon} />
      </div> */}
    </div>
  );
};

export default MenuProfileSettings;
