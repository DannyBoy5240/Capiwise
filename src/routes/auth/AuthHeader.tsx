import { FC } from "react";

import { useNavigate } from "react-router-dom";

import Logo from "../../assets/logo.svg";
import Close from "../../assets/close.svg";

interface AuthHeaderInterface {
  mode: number;
}

const AuthHeader: FC<AuthHeaderInterface> = ({ mode }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex justify-center border-b-2">
      <div className="flex justify-between w-10/12 lg:w-9/12 p-7">
        <div>
          <img src={Logo} />
        </div>
        <div className="flex">
          {mode == 1 ? (
            <>
              <div>
                <button
                  onClick={() => navigate("/")}
                  className="bg-transaprent hover:bg-[#979797] px-3 py-1 rounded-full"
                >
                  Log in
                </button>
              </div>
              <div className="pl-3">
                <button
                  onClick={() => navigate("/signup")}
                  className="bg-[#2EBD85] hover:bg-[#979797] px-3 py-1 rounded-full"
                >
                  Register
                </button>
              </div>
            </>
          ) : mode == 2 ? (
            <>
              <button onClick={() => navigate("/")}>
                <img src={Close} />
              </button>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthHeader;
