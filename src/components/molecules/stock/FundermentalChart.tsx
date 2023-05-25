import { FC } from "react";

const FundermentalChart = () => {
  return (
    <div className="bg-[#0B1620] flex flex-col p-4 h-full">
      <div className="text-base font-bold py-2 border-b border-b-[#252A2D]">
        Fundemental Analysis
      </div>
      <div className="grow ">
        {/* context */}
        <div className="flex flex-col justify-end">
          <div className="text-sm text-white">NasdaqGS:AAPL</div>
          <div className="text-xs text-[#979797]">
            Provided by S&P Global Market Intelligence ​as of 04/23/2023
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="text-sm border-t border-t-[#252A2D] pt-2">
        How to interpret this data
      </div>
    </div>
  );
};

export default FundermentalChart;
