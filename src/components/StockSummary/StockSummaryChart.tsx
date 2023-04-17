import { FC } from "react";

import { useState, useEffect } from "react";

import StockChart from "./StockChart";

interface StockSummaryChartProps {
  code: string;
}

const StockSummaryChart: FC<StockSummaryChartProps> = ({ code }) => {
  const [viewMode, setViewMode] = useState(3);

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const obj = document
      ?.getElementById("modeGroup")
      ?.getElementsByTagName("button");
    if (obj && obj[2] && !obj[2].classList.contains("border-b-2")) {
      obj[2].classList.add("border-b-2");
      obj[2].classList.remove("border-b-0");
    }
  }, []);

  const handleToogleScreen = () => {
    setIsFullScreen(true);
  };
  const handleToogleDownScreen = () => {
    setIsFullScreen(false);
  };

  const handleViewMode = (event: any, mode: number) => {
    setViewMode(mode);

    // remove all border style in parent element
    const obj = document
      ?.getElementById("modeGroup")
      ?.getElementsByTagName("button");
    for (let i = 0; obj && i < obj.length; i++) {
      obj[i].classList.remove("border-b-2");
      obj[i].classList.add("border-b-0");
    }

    event.target.classList.add("border-b-2");
    event.target.classList.remove("border-b-0");
  };

  return (
    <div className="p-6 bg-[#0B1620] w-full md:w-1/2">
      <div className="flex justify-between items-center">
        <div className="text-sm mb-2" id="modeGroup">
          <button
            className="text-white hover:text-[#2EBD85] border-b-0 hover:border-b-2 border-[#2EBD85] py-1 px-1.5 font-bold mx-1.5"
            onClick={(e) => handleViewMode(e, 1)}
          >
            1D
          </button>
          <button
            className="text-white hover:text-[#2EBD85] border-b-0 hover:border-b-2 border-[#2EBD85] py-1 px-1.5 font-bold mx-1.5"
            onClick={(e) => handleViewMode(e, 2)}
          >
            1W
          </button>
          <button
            className="text-white hover:text-[#2EBD85] border-b-0 hover:border-b-2 border-[#2EBD85] py-1 px-1.5 font-bold mx-1.5"
            onClick={(e) => handleViewMode(e, 3)}
          >
            1M
          </button>
          <button
            className="text-white hover:text-[#2EBD85] border-b-0 hover:border-b-2 border-[#2EBD85] py-1 px-1.5 font-bold mx-1.5"
            onClick={(e) => handleViewMode(e, 4)}
          >
            6M
          </button>
          <button
            className="text-white hover:text-[#2EBD85] border-b-0 hover:border-b-2 border-[#2EBD85] py-1 px-1.5 font-bold mx-1.5"
            onClick={(e) => handleViewMode(e, 5)}
          >
            1Y
          </button>
          <button
            className="text-white hover:text-[#2EBD85] border-b-0 hover:border-b-2 border-[#2EBD85] py-1 px-1.5 font-bold mx-1.5"
            onClick={(e) => handleViewMode(e, 6)}
          >
            5Y
          </button>
          <button
            className="text-white hover:text-[#2EBD85] border-b-0 hover:border-b-2 border-[#2EBD85] py-1 px-1.5 font-bold mx-1.5"
            onClick={(e) => handleViewMode(e, 7)}
          >
            MAX
          </button>
        </div>
        <div className="flex" onClick={() => handleToogleScreen()}>
          <div>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.97386 11.1176L4.98693 14.1046L5 12.5C5 12.1536 4.71895 11.8758 4.37582 11.8758C4.03268 11.8758 3.75163 12.1569 3.75163 12.5V15.6242C3.75163 15.8105 3.8268 15.9575 3.94771 16.0621C4.06209 16.1765 4.21895 16.2484 4.39216 16.2484H7.5C7.84641 16.2484 8.12418 15.9673 8.12418 15.6242C8.12418 15.281 7.84314 15 7.5 15H5.85621L8.85621 12L7.97386 11.1176ZM15.6078 3.75163H12.5C12.1536 3.75163 11.8758 4.03268 11.8758 4.37582C11.8758 4.71895 12.1569 5 12.5 5H14.1438L11.1438 8L12.0261 8.88235L15.0131 5.89542L15 7.5C15 7.84641 15.281 8.12418 15.6242 8.12418C15.9673 8.12418 16.2484 7.84314 16.2484 7.5V4.37582C16.2484 4.18954 16.1699 4.04248 16.0523 3.93791C15.9379 3.82353 15.781 3.75163 15.6078 3.75163ZM17.5 0H2.5C1.12092 0 0 1.12092 0 2.5V17.5C0 18.8791 1.12092 20 2.5 20H17.5C18.8791 20 20 18.8791 20 17.5V2.5C20 1.12092 18.8791 0 17.5 0ZM18.7516 17.5C18.7516 18.1895 18.1928 18.7484 17.5033 18.7484H2.50327C1.81373 18.7484 1.2549 18.1895 1.2549 17.5V2.5C1.2549 1.81046 1.81373 1.25163 2.50327 1.25163H17.5033C18.1928 1.25163 18.7516 1.81046 18.7516 2.5V17.5Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="pl-3 text-sm font-bold">Full screen</div>
        </div>
      </div>
      <div
        className={`chart-container ${isFullScreen ? "full-screen" : ""}`}
        onClick={() => handleToogleDownScreen()}
      >
        <div
          className={isFullScreen ? "full-screen-chart" : ""}
          // style={{
          //   background:
          //     "repeating-linear-gradient(90deg, rgba(4, 11, 17, 0.5), rgba(4, 11, 17, 0.5) 76px, rgb(11, 22, 32) 0px, rgb(11, 22, 32) 152px) 180px 0",
          //   backgroundPosition: "180px 0",
          // }}
        >
          <StockChart
            viewMode={viewMode}
            isFullScreen={isFullScreen}
            code={code}
          />
        </div>
      </div>
      <div className="border-b border-b-[#252A2D] py-1.5"></div>
      {/* <div className="flex pt-3.5">
        <div className="flex items-center">
          <div className="pr-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="6" cy="6" r="6" fill="#979797" />
            </svg>
          </div>
          <div className="text-xs">Intrinsic value</div>
        </div>
        <div className="flex items-center px-3">
          <div className="pr-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="6" cy="6" r="6" fill="#F1B90B" />
            </svg>
          </div>
          <div className="text-xs">Margin of safety</div>
        </div>
      </div> */}
      <div className="flex items-center pt-3.5">
        <div className="pr-1">
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="6" r="6" fill="#979797" />
          </svg>
        </div>
        <div className="text-xs">Net Asset Value (NAV)</div>
      </div>
    </div>
  );
};

export default StockSummaryChart;
