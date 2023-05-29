import { FC } from "react";

const FundCharacteristics = () => {
  return (
    <div className="bg-[#0B1620] text-white text-xs flex flex-col p-4 h-full text-xs">
      <div className="text-base font-bold py-2 border-b border-b-[#252A2D]">
        Fund Characteristics
      </div>
      {/* Header */}
      <div className="flex py-2 border-b border-b-[#979797]">
        <div className="w-1/3 text-[10px] text-[#979797]">QQQ vs. Index</div>
        <div className="w-1/3 text-right">QQQ</div>
        <div className="w-1/3 text-right">Asset Class Median</div>
      </div>
      {/* Content */}
      <div className="flex py-2 border-b border-b-[#252A2D]">
        <div className="w-1/3 font-bold">
          Price / Earnings<div className="text-[10px] font-normal">(TTM)</div>
        </div>
        <div className="w-1/3 text-right">34.90</div>
        <div className="w-1/3 text-right">23.39</div>
      </div>
      <div className="flex py-3 border-b border-b-[#252A2D]">
        <div className="w-1/3 font-bold">Price / Book</div>
        <div className="w-1/3 text-right">8.04</div>
        <div className="w-1/3 text-right">2.79</div>
      </div>
      <div className="flex py-3 border-b border-b-[#252A2D]">
        <div className="w-1/3 font-bold">Price / Sales</div>
        <div className="w-1/3 text-right">5.35</div>
        <div className="w-1/3 text-right">1.99</div>
      </div>
      <div className="flex py-3 border-b border-b-[#252A2D]">
        <div className="w-1/3 font-bold">Price / Cash Flow</div>
        <div className="w-1/3 text-right">21.45</div>
        <div className="w-1/3 text-right">12.62</div>
      </div>
      <div className="flex py-3 border-b border-b-[#252A2D]">
        <div className="w-1/3 font-bold">30-day SEC Yield</div>
        <div className="w-1/3 text-right">0.54%</div>
        <div className="w-1/3 text-right">1.08%</div>
      </div>
      <div className="flex py-3 border-b border-b-[#252A2D]">
        <div className="w-1/3 font-bold">
          Distribution Yield<div className="text-[10px] font-normal">(TTM)</div>
        </div>
        <div className="w-1/3 text-right">0.55%</div>
        <div className="w-1/3 text-right">1.19%</div>
      </div>
      <div className="py-1 text-[10px] text-[#979797]">As of 02/28/2023</div>
    </div>
  );
};

export default FundCharacteristics;
