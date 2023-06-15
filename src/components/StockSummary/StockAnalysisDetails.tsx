import { FC } from "react";

import { useState, useEffect } from "react";

import StockGradientSlider from "../atom/StockGradientSlider";

import correctIcon from "../../assets/correct_ico.svg";
import wrongIcon from "../../assets/wrong_ico.svg";

import nodataIcon from "../../assets/no_data_available_icon.svg";
import overvaluedIcon from "../../assets/overvalued_icon.svg";
import undervaluedIcon from "../../assets/undervalued_icon.svg";
import fairvalueIcon from "../../assets/fair_value_icon.svg";

interface StockAnalysisDetailsProps {
  code: string;
  stockData: any;
}

const StockAnalysisDetails: FC<StockAnalysisDetailsProps> = ({
  code,
  stockData,
}) => {
  const [stockSummary, setStockSummary] = useState(null);
  const [stockLiveData, setStockLiveData] = useState(null);

  const [currentPrice, setCurrentPrice] = useState(-1);
  const [fairPrice, setFairPrice] = useState(-1);

  useEffect(() => {
    getAnalysticInfo();
  }, []);

  const getAnalysticInfo = async () => {
    // Get Stock Live Data

    // const stockURL =
    //   "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/stockSummary?ticker=" +
    //   code +
    //   ".US&token=demo";

    // fetch(stockURL)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // setStockSummary(data);
    //     if (data && data["Valuation::FairPrice"])
    //       setFairPrice(data["Valuation::FairPrice"]);
    //   })
    //   .catch((error) => console.log(error));

    setFairPrice(
      stockData && stockData.statistics ? stockData.statistics.fairPrice : 0
    );
    setCurrentPrice(
      stockData && stockData.day1Range ? stockData.day1Range.open : 0
    );

    // // Get Stock Live Data
    // const stockLiveURL =
    //   "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/stockLiveData?ticker=" +
    //   code +
    //   ".US";

    // fetch(stockLiveURL)
    //   .then((response) => response.json())
    //   .then((data) => {
    //     // setStockLiveData(data);
    //     if (data && data["high"]) setCurrentPrice(data["high"]);
    //   })
    //   .catch((error) => console.log(error));
  };

  const getCurrentPriceValuation = () => {
    if (fairPrice != 0 && currentPrice != 0)
      return ((100 * (currentPrice - fairPrice)) / fairPrice).toFixed(2);
    else return -1;
  };
  const getCurrentPriceBarWidth = () => {
    const progress = getCurrentPriceValuation();
    const boundary = progress > 0 ? 40 : progress < 0 ? 70 : 0;
    let pos = (boundary * currentPrice) / fairPrice;
    pos = pos > 100 ? (pos = 90) : pos;
    return pos;
  };

  return (
    <div className="h-full bg-[#0B1620] text-white mt-6 md:mt-0 p-5 flex flex-col justify-between">
      <div>
        <div className="text-base font-bold pb-3 pl-1 border-b-2 border-b-[#252A2D]">
          Valuation
        </div>
        <div>
          <div className="py-3 text-sm">Share Price vs. Fair Value</div>
          <div className="flex justify-between items-center">
            <div className="text-xs font-bold flex">
              {currentPrice == -1 || fairPrice == -1 ? (
                <div className="text-white">{code}</div>
              ) : currentPrice == fairPrice ? (
                <div className="text-[#F1B90B]">{code}</div>
              ) : currentPrice < fairPrice ? (
                <div className="text-[#2EBD85]">{code}</div>
              ) : (
                <div className="text-[#E2433B]">{code}</div>
              )}
              <div className="ml-2">Fair Price</div>
            </div>
            <div className="text-sm font-bold">
              {fairPrice == -1 ? "No data available" : "US$" + fairPrice}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs">Current Price Valuation</div>
            <div className="text-sm font-bold">
              {currentPrice == -1 || fairPrice == -1 ? (
                <div className="text-white">No data available</div>
              ) : currentPrice == fairPrice ? (
                <div className="text-[#F1B90B]">Fair Value</div>
              ) : currentPrice < fairPrice ? (
                <div className="text-[#2EBD85]">
                  {getCurrentPriceValuation() > 0
                    ? getCurrentPriceValuation()
                    : -getCurrentPriceValuation()}
                  % Undervalued
                </div>
              ) : (
                <div className="text-[#E2433B]">
                  {getCurrentPriceValuation() > 0
                    ? getCurrentPriceValuation()
                    : -getCurrentPriceValuation()}
                  % Overvalued
                </div>
              )}
            </div>
          </div>
          <div className="h-[90px] mt-8 relative">
            {fairPrice == -1 || currentPrice == -1 ? (
              <div>
                {/* <div className="h-[72px]"></div> */}
                <StockGradientSlider progress={50} />
              </div>
            ) : (
              <div>
                <StockGradientSlider progress={getCurrentPriceValuation()} />
                <div
                  className={
                    "text-xs absolute z-50 mt-[-84px] py-2 bg-[#0B1620AA] text-right pr-3"
                  }
                  style={{ width: getCurrentPriceBarWidth() + "%" }}
                >
                  <div>
                    <div>Current Price</div>
                    <div className="font-bold">
                      US$
                      {parseFloat(currentPrice.toString()).toFixed(2)}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="text-xs">
            <div className="flex p-1 items-center">
              <div>
                {currentPrice == -1 || fairPrice == -1 ? (
                  <img src={nodataIcon} className="max-w-none w-5 h-5" />
                ) : currentPrice < fairPrice ? (
                  <img src={undervaluedIcon} className="max-w-none w-5 h-5" />
                ) : currentPrice > fairPrice ? (
                  <img src={overvaluedIcon} className="max-w-none w-5 h-5" />
                ) : (
                  <img src={fairvalueIcon} className="max-w-none w-5 h-5" />
                )}
              </div>
              <div className="pl-3">
                {currentPrice == 0 || fairPrice == 0 ? (
                  <span>
                    <span className="px-4"></span>
                    <span>
                      {code}(${parseFloat(currentPrice.toString()).toFixed(2)})
                      have no value data available
                    </span>
                  </span>
                ) : (
                  <span>
                    {currentPrice < fairPrice ? (
                      <span className="text-[#2EBD85]">Below Fair Value: </span>
                    ) : currentPrice > fairPrice ? (
                      <span className="text-[#E2433B]">Above Fair Value: </span>
                    ) : (
                      <span className="text-[#F1B90B]">Fair Value: </span>
                    )}
                  </span>
                )}
                {code} ($
                {parseFloat(currentPrice.toString()).toFixed(2)}) is trading
                above our estimate of fair value ($
                {fairPrice})
              </div>
            </div>
            <div className="flex p-1 items-center">
              <div>
                {currentPrice == -1 || fairPrice == -1 ? (
                  <img src={nodataIcon} className="max-w-none w-5 h-5" />
                ) : currentPrice < fairPrice ? (
                  <img src={undervaluedIcon} className="max-w-none w-5 h-5" />
                ) : currentPrice > fairPrice ? (
                  <img src={overvaluedIcon} className="max-w-none w-5 h-5" />
                ) : (
                  <img src={fairvalueIcon} className="max-w-none w-5 h-5" />
                )}
              </div>
              <div className="pl-3">
                {currentPrice == 0 || fairPrice == 0 ? (
                  <span>
                    <span className="px-4"></span>
                    <span>{code}have no value data available</span>
                  </span>
                ) : (
                  <span>
                    {currentPrice < fairPrice ? (
                      <span className="text-[#2EBD85]">
                        Significantly Below Fair Value:{" "}
                      </span>
                    ) : currentPrice > fairPrice ? (
                      <span className="text-[#E2433B]">
                        Accordingly Above Fair Value:{" "}
                      </span>
                    ) : (
                      <span className="text-[#F1B90B]">
                        Exactly Fair Value:{" "}
                      </span>
                    )}
                    {code} is trading above our estimate of fair value of{" "}
                    {getCurrentPriceValuation()}%.
                  </span>
                )}
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
