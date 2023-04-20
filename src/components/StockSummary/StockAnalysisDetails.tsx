import { FC } from "react";

import { useState, useEffect } from "react";

import GradientSlider from "../atom/GradientSlider";

interface StockAnalysisDetailsProps {
  code: string;
}

const StockAnalysisDetails: FC<StockAnalysisDetailsProps> = ({ code }) => {
  const [stockLiveData, setStockLiveData] = useState(null);

  useEffect(() => {
    getAnalysticInfo();
  }, []);

  const getAnalysticInfo = async () => {
    // Get Stock Live Data
    const stockLiveURL =
      "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/stockLiveData?ticker=" +
      code +
      ".US";

    fetch(stockLiveURL)
      .then((response) => response.json())
      .then((data) => {
        setStockLiveData(data);
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-[#0B1620] text-white md:ml-6 mt-6 md:mt-0 p-5 w-full md:w-1/2 lg:w-1/4 flex flex-col justify-between">
      <div>
        <div className="text-base font-bold pb-3 pl-1 border-b-2 border-b-[#252A2D]">
          Valuation
        </div>
        <div>
          <div className="py-3 text-sm">Share Price vs. Fair Value</div>
          <div className="flex justify-between items-center">
            <div className="text-xs">
              <span className="text-[#2EBD85]">{code}</span>
              <span> Fair Price</span>
            </div>
            <div className="text-sm font-bold">
              US$
              {stockLiveData
                ? stockLiveData["high"]
                  ? stockLiveData["high"]
                  : "NA"
                : "N/A"}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs">Current Price Valuation</div>
            <div className="text-sm text-[#2EBD85] font-bold">
              4.4% Unverified
            </div>
          </div>
          <div className="h-[90px] mt-8">
            <GradientSlider progress={52} mode={3} />
            <div className="text-xs absolute z-50 mt-[-36px] ml-[20px] pl-[40px] py-1 pr-3 bg-[#0B1620AA]">
              <div>Current Price</div>
              <div className="font-bold">
                US$
                {stockLiveData
                  ? stockLiveData["high"]
                    ? stockLiveData["high"]
                    : "NA"
                  : "N/A"}
              </div>
            </div>
          </div>
          <div className="text-xs">
            <div className="flex py-1">
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1_315)">
                    <path
                      d="M10 0C4.48566 0 0 4.48566 0 10C0 15.5143 4.48566 20 10 20C15.5143 20 20 15.5136 20 10C20 4.48645 15.5143 0 10 0ZM10 18.4508C5.34082 18.4508 1.54918 14.66 1.54918 10C1.54918 5.34004 5.34082 1.54918 10 1.54918C14.66 1.54918 18.4508 5.34004 18.4508 10C18.4508 14.66 14.6592 18.4508 10 18.4508Z"
                      fill="#2EBD85"
                    />
                    <path
                      d="M14.5878 6.52211C14.2725 6.23551 13.7822 6.25797 13.4941 6.57477L8.76902 11.7777L6.48629 9.45707C6.18496 9.15188 5.69543 9.14723 5.39101 9.44778C5.08582 9.74754 5.08117 10.2379 5.38171 10.543L8.23918 13.4478C8.38559 13.5965 8.58387 13.6794 8.79145 13.6794C8.79609 13.6794 8.80152 13.6794 8.80617 13.6802C9.01996 13.6755 9.22137 13.5841 9.36465 13.4261L14.6404 7.61664C14.9278 7.29903 14.9046 6.80949 14.5878 6.52211Z"
                      fill="#2EBD85"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_315">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="pl-2">
                <span className="text-[#2EBD85]">Below Fair Value: </span>AAPL
                ($116.36) is trading above our estimate of fair value ($
                {stockLiveData
                  ? stockLiveData["high"]
                    ? stockLiveData["high"]
                    : "NA"
                  : "N/A"}
                )
              </div>
            </div>
            <div className="flex py-1">
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_1_315)">
                    <path
                      d="M10 0C4.48566 0 0 4.48566 0 10C0 15.5143 4.48566 20 10 20C15.5143 20 20 15.5136 20 10C20 4.48645 15.5143 0 10 0ZM10 18.4508C5.34082 18.4508 1.54918 14.66 1.54918 10C1.54918 5.34004 5.34082 1.54918 10 1.54918C14.66 1.54918 18.4508 5.34004 18.4508 10C18.4508 14.66 14.6592 18.4508 10 18.4508Z"
                      fill="#2EBD85"
                    />
                    <path
                      d="M14.5878 6.52211C14.2725 6.23551 13.7822 6.25797 13.4941 6.57477L8.76902 11.7777L6.48629 9.45707C6.18496 9.15188 5.69543 9.14723 5.39101 9.44778C5.08582 9.74754 5.08117 10.2379 5.38171 10.543L8.23918 13.4478C8.38559 13.5965 8.58387 13.6794 8.79145 13.6794C8.79609 13.6794 8.80152 13.6794 8.80617 13.6802C9.01996 13.6755 9.22137 13.5841 9.36465 13.4261L14.6404 7.61664C14.9278 7.29903 14.9046 6.80949 14.5878 6.52211Z"
                      fill="#2EBD85"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1_315">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="pl-2">
                <span className="text-[#2EBD85]">
                  Significantly Below Fair Value:{" "}
                </span>
                AAPL is trading above our estimate of fair value of 4.4%.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm pt-3 border-t border-t-[#252A2D]">
        Analysis details
      </div>
    </div>
  );
};

export default StockAnalysisDetails;
