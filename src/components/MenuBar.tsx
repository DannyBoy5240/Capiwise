import { FC } from "react";

const MenuBar: FC = () => {
  return (
    <div className="flex text-[white] bg-[#0B1620] text-base font-bold px-6 py-2">
      <div className="border-b-4 hover:border-b-4 hover:cursor-pointer border-[#2EBD85] py-3 mr-2">
        Summary
      </div>
      <div className="hover:border-b-4 hover:cursor-pointer border-[#2EBD85] py-3 mx-2">
        Top stocks
      </div>
      <div className="hover:border-b-4 hover:cursor-pointer border-[#2EBD85] py-3 mx-2">
        Plans
      </div>
      <div className="hover:border-b-4 hover:cursor-pointer border-[#2EBD85] py-3 mx-2">
        Who we are
      </div>
      <div className="hover:border-b-4 hover:cursor-pointer border-[#2EBD85] py-3 mx-2">
        News
      </div>
      <div className="hover:border-b-4 hover:cursor-pointer border-[#2EBD85] py-3 mx-2">
        Support
      </div>
    </div>
  );
};

export default MenuBar;
