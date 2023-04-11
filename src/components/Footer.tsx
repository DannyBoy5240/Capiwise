import { FC } from "react";

const Footer: FC = () => {
  return (
    <div className="flex justify-between mx-7 my-5 text-[#979797] bg-[#0B1620] text-xs">
      <p>@ Capiwise 2023</p>
      <div className="flex space-x-5">
        <a>Terms</a>
        <a>Privacy</a>
      </div>
    </div>
  );
};

export default Footer;
