import { FC } from "react";

const TechnicalAnalysis = () => {
  return (
    <div className="bg-[#0B1620] flex flex-col p-4 h-full">
      <div className="text-base font-bold py-2 border-b border-b-[#252A2D]">
        Technical Analysis
      </div>
      <div className="py-2 text-xs text-[#979797]">
        Provided by Recognia as of 03/13/2021
      </div>
      <div className="grow">
        {/* short-term */}
        <div className="text-xs py-2">
          <div>
            <span className="font-bold">Short-Term Sentiment</span> 2 weeks to 6
            weeks
          </div>
          <div className="flex justify-between text-[#979797] py-2">
            <div className="w-1/3 text-center">
              <div className="bg-[#E2433B] w-full h-3"></div>
              <div>weak</div>
            </div>
            <div className="w-1/3 mx-1 text-center">
              <div className="bg-[#C4C4C4] w-full h-3"></div>
              <div>neutral</div>
            </div>
            <div className="w-1/3 text-center">
              <div className="bg-[#C4C4C4] w-full h-3"></div>
              <div>strong</div>
            </div>
          </div>
        </div>
        {/* mid-term */}
        <div className="text-xs py-2">
          <div>
            <span className="font-bold">Mid-Term Sentiment</span> 6 weeks to 9
            Months
          </div>
          <div className="flex justify-between text-[#979797] py-2">
            <div className="w-1/3 text-center">
              <div className="bg-[#C4C4C4] w-full h-3"></div>
              <div>weak</div>
            </div>
            <div className="w-1/3 mx-1 text-center">
              <div className="bg-[#C4C4C4] w-full h-3"></div>
              <div>neutral</div>
            </div>
            <div className="w-1/3 text-center">
              <div className="bg-[#2EBD85] w-full h-3"></div>
              <div>strong</div>
            </div>
          </div>
        </div>
        {/* long-term */}
        <div className="text-xs py-2">
          <div>
            <span className="font-bold">Long-Term Sentiment</span> 9 months to 2
            years
          </div>
          <div className="flex justify-between text-[#979797] py-2">
            <div className="w-1/3 text-center">
              <div className="bg-[#C4C4C4] w-full h-3"></div>
              <div>weak</div>
            </div>
            <div className="w-1/3 mx-1 text-center">
              <div className="bg-[#F1B90B] w-full h-3"></div>
              <div>neutral</div>
            </div>
            <div className="w-1/3 text-center">
              <div className="bg-[#C4C4C4] w-full h-3"></div>
              <div>strong</div>
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="text-xs border-t border-t-[#252A2D] pt-2">
        Analysis details
      </div>
    </div>
  );
};

export default TechnicalAnalysis;
