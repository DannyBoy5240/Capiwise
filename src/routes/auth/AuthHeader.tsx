import { FC } from "react";

import Logo from "../../assets/logo.svg";

const AuthHeader: FC = () => {
  return (
    <div className="w-full flex justify-center border-b-2">
      <div className="flex justify-between w-10/12 lg:w-9/12 p-7">
        <div>
          <img src={Logo} />
        </div>
        <div className="flex">
          <div>
            <button
              onClick={() => console.log("login")}
              className="bg-transaprent hover:bg-[#979797] px-3 py-1 rounded-full"
            >
              Log in
            </button>
          </div>
          <div className="pl-3">
            <button
              onClick={() => console.log("register")}
              className="bg-[#2EBD85] hover:bg-[#979797] px-3 py-1 rounded-full"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
