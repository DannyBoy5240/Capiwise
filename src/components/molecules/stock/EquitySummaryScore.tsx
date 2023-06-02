import { FC } from "react";

import neutralIcon from "../../../assets/neutral_ico.svg";

const EquitySummaryScore = () => {
  return (
    <div className="bg-[#0B1620] flex flex-col p-4 h-full">
      <div className="text-base font-bold py-2 border-b border-b-[#252A2D]">
        Equity Summary Score
      </div>
      {/* Header */}
      <div className="py-2 text-xs">
        <div className="py-2 text-white">AAPL Score: Neutral (4.3)</div>
        <div className="py-1 text-[#979797]">
          Provided by <span className="underline">StarMine from Refinitiv</span>{" "}
          AS OF NOV-11-2023
        </div>
      </div>
      {/* Content */}
      <div className="grow flex flex-col justify-center">
        <div className="relative">
          <div className="w-full h-5 bg-[#C4C4C4]"></div>
          <div className="absolute bottom-[25px] left-[50px]">
            <img src={neutralIcon} className="max-w-none" />
          </div>
        </div>
      </div>
      {/* Footer */}
      <div className="pt-2 border-t border-t-[#252A2D] text-white text-xs">
        Show more
      </div>
    </div>
  );
};

export default EquitySummaryScore;
