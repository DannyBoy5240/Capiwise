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
}

const StockAnalysisDetails: FC<StockAnalysisDetailsProps> = ({ code }) => {
  const [stockSummary, setStockSummary] = useState(null);
  const [stockLiveData, setStockLiveData] = useState(null);

  const [currentPrice, setCurrentPrice] = useState(0);
  const [fairPrice, setFairPrice] = useState(0);

  useEffect(() => {
    getAnalysticInfo();
  }, []);

  const getAnalysticInfo = async () => {
    // Get Stock Live Data
    const stockURL =
      "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/stockSummary?ticker=" +
      code +
      ".US&token=demo";

    fetch(stockURL)
      .then((response) => response.json())
      .then((data) => {
        // setStockSummary(data);
        if (data && data["Valuation::FairPrice"])
          setFairPrice(data["Valuation::FairPrice"]);
      })
      .catch((error) => console.log(error));

    // Get Stock Live Data
    const stockLiveURL =
      "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/stockLiveData?ticker=" +
      code +
      ".US";

    fetch(stockLiveURL)
      .then((response) => response.json())
      .then((data) => {
        // setStockLiveData(data);
        if (data && data["high"]) setCurrentPrice(data["high"]);
      })
      .catch((error) => console.log(error));
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
    <div className="bg-[#0B1620] text-white md:ml-6 mt-6 md:mt-0 p-5 w-full md:w-1/2 lg:w-1/4 flex flex-col justify-between">
      <div>
        <div className="text-base font-bold pb-3 pl-1 border-b-2 border-b-[#252A2D]">
          Valuation
        </div>
        <div>
          <div className="py-3 text-sm">Share Price vs. Fair Value</div>
          <div className="flex justify-between items-center">
            <div className="text-xs font-bold flex">
              {currentPrice == 0 || fairPrice == 0 ? (
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
              {fairPrice == 0 ? "No data available" : "US$" + fairPrice}
            </div>
          </div>
          <div className="flex justify-between items-center">
            <div className="text-xs">Current Price Valuation</div>
            <div className="text-sm font-bold">
              {currentPrice == 0 || fairPrice == 0 ? (
                <div className="text-white">No data available</div>
              ) : currentPrice == fairPrice ? (
                <div className="text-[#F1B90B]">Fair Value</div>
              ) : currentPrice < fairPrice ? (
                <div className="text-[#2EBD85]">
                  {getCurrentPriceValuation()}% Undervalued
                </div>
              ) : (
                <div className="text-[#E2433B]">
                  {getCurrentPriceValuation()}% Overvalued
                </div>
              )}
            </div>
          </div>
          <div className="h-[90px] mt-8 relative">
            {fairPrice == 0 || currentPrice == 0 ? (
              <div className="h-[72px]"></div>
            ) : (
              <StockGradientSlider progress={getCurrentPriceValuation()} />
            )}
            <div
              className={
                "text-xs absolute z-50 mt-[-84px] py-2 bg-[#0B1620AA] text-right pr-3"
              }
              style={{ width: getCurrentPriceBarWidth() + "%" }}
            >
              <div>Current Price</div>
              <div className="font-bold">
                US$
                {currentPrice}
              </div>
            </div>
          </div>
          <div className="text-xs">
            <div className="flex p-1 items-center">
              <div style={{ transform: "scale(2)" }}>
                {currentPrice == 0 || fairPrice == 0 ? (
                  <img src={nodataIcon} width={22} height={22} />
                ) : currentPrice < fairPrice ? (
                  <img src={undervaluedIcon} width={22} height={22} />
                ) : currentPrice > fairPrice ? (
                  <img src={overvaluedIcon} width={22} height={22} />
                ) : (
                  <img src={fairvalueIcon} width={22} height={22} />
                )}
              </div>
              <div className="pl-3">
                {currentPrice == 0 || fairPrice == 0 ? (
                  <span>
                    <span className="px-4"></span>
                    <span>
                      {code}(${currentPrice}) have no value data available
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
                {currentPrice}) is trading above our estimate of fair value ($
                {fairPrice})
              </div>
            </div>
            <div className="flex p-1 items-center">
              <div style={{ transform: "scale(2)" }}>
                {currentPrice == 0 || fairPrice == 0 ? (
                  <img src={nodataIcon} width={22} height={22} />
                ) : currentPrice < fairPrice ? (
                  <img src={undervaluedIcon} width={22} height={22} />
                ) : currentPrice > fairPrice ? (
                  <img src={overvaluedIcon} width={22} height={22} />
                ) : (
                  <img src={fairvalueIcon} width={22} height={22} />
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
