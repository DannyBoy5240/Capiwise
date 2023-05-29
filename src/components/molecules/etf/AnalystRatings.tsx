import { FC } from "react";

const AnalystRatings = () => {
  return (
    <div className="bg-[#0B1620] text-white text-xs flex flex-col p-4 h-full text-xs">
      <div className="text-base font-bold py-2 border-b border-b-[#252A2D]">
        Analyst Ratings
      </div>
      <div className="grow py-2 border-b border-b-[#252A2D]">
        <div className="pb-2">
          <div className="text-sm">FactSet</div>
          <div className="text-[10px] text-[#979797]">As of Nov. 10/2023</div>
        </div>
        <div className="flex justify-center py-2">
          <div className="w-16 h-16 bg-[#20A5F1] rounded-full flex items-center justify-center">
            <div className="text-[40px]">A</div>
          </div>
        </div>
        {/* Ratings */}
        <div className="py-1">
          <div className="text-sm py-2">Efficiency</div>
          <div className="flex items-center">
            <div className="grow h-3 bg-[#C4C4C4]">
              <div
                className="w-full h-full bg-[#20A5F1]"
                style={{ width: "96%" }}
              ></div>
            </div>
            <div className="text-xs text-right w-6">96</div>
          </div>
        </div>
        <div className="py-1">
          <div className="text-sm py-2">Tradability</div>
          <div className="flex items-center">
            <div className="grow h-3 bg-[#C4C4C4]">
              <div
                className="w-full h-full bg-[#20A5F1]"
                style={{ width: "100%" }}
              ></div>
            </div>
            <div className="text-xs text-right w-6">100</div>
          </div>
        </div>
        <div className="py-1">
          <div className="text-sm py-2">Fit</div>
          <div className="flex items-center">
            <div className="grow h-3 bg-[#C4C4C4]">
              <div
                className="w-full h-full bg-[#20A5F1]"
                style={{ width: "60%" }}
              ></div>
            </div>
            <div className="text-xs text-right w-6">60</div>
          </div>
        </div>
      </div>
      <div className="pt-2">
        <span>View details</span>
        <span className="px-2 text-[#979797]">|</span>
        <span>View report</span>
      </div>
    </div>
  );
};

export default AnalystRatings;
