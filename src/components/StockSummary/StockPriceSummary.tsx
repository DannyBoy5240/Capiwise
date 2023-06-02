import { FC } from "react";

import { useEffect, useState } from "react";

import PriceBarSlider from "../atom/PriceBarSlider";
import TotalSummaryInfo from "../molecules/TotalSummaryInfo";

import numPositiveIcon from "../../assets/num_positive_ico.svg";
import numNegativeIcon from "../../assets/num_negative_ico.svg";

interface StockPriceSummaryProps {
  context: any;
}

const StockPriceSummary: FC<StockPriceSummaryProps> = ({ context }) => {
  const [stockSummary, setStockSummary] = useState(null);
  const [stockLiveData, setStockLiveData] = useState(null);

  const getNumber = (num: any) => {
    if (num > 0) return "+" + num;
    else return num;
  };

  const changeDateFormat = (date: string) => {
    const dateStr: string = date;
    const dateArr: string[] = dateStr.split("-");
    const formattedDate: string =
      dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];
    return formattedDate;
  };

  const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return "0 B";

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["", "", "M", "B", "T", "P"];
    const i = Math.floor(Math.log(bytes * 10 ** 6) / Math.log(k));

    return (
      parseFloat(((bytes * 10 ** 6) / Math.pow(k, i)).toFixed(dm)) +
      " " +
      sizes[i]
    );
  };

  const getProgressStatus = (low: any, high: any, current: any): number => {
    return (100 * (current - low)) / (high - low);
  };

  return (
    <div className="p-6 bg-[#0B1620] text-xs">
      <div className="border-b-2 pb-6 border-b-2 border-[#252A2D]">
        <div className="text-2xl font-bold">
          {context && context["profile"] ? context["profile"]["name"] : "N/A"} (
          {context && context["profile"] ? context["profile"]["symbol"] : "N/A"}
          )
        </div>
        <div className="text-sm mt-1">
          {context && context["profile"]
            ? context["profile"]["exchange"]
            : "N/A"}{" "}
          -{" "}
          {context && context["profile"]
            ? context["profile"]["exchange"]
            : "N/A"}{" "}
          Real Time Price. Currency in{" "}
          {context && context["profile"]
            ? context["profile"]["currency"]
            : "N/A"}
        </div>
      </div>
      <div className="flex py-6 w-full justify-between">
        <div className="w-1/2 md:w-1/4">
          <TotalSummaryInfo context={context} />
        </div>
        {/*  */}
        <div className="w-1/2 md:w-3/4 md:flex">
          <div className="flex grow flex-col border-l px-3 border-[#252A2D] text-sm lg:my-2">
            <div className="grow text-[#979797] border-b border-dashed border-[#252A2D] pb-1">
              <div>Price Day Range</div>
              <PriceBarSlider
                progress={getProgressStatus(
                  context && context["day1Range"]
                    ? context["day1Range"]["low"]
                    : 0,
                  context && context["day1Range"]
                    ? context["day1Range"]["high"]
                    : 0,
                  context && context["day1Range"]
                    ? context
                      ? context["isMarketOpen"]
                        ? context["day1Range"]
                          ? context["day1Range"]["open"]
                          : 0
                        : context["day1Range"]
                        ? context["day1Range"]["close"]
                        : 0
                      : 0
                    : 0
                )}
              />
              <div className="flex justify-between text-white text-xs">
                <div>
                  {context && context["day1Range"]
                    ? parseFloat(context["day1Range"]["low"]).toFixed(2)
                    : "N/A"}
                </div>
                <div>
                  {context && context["day1Range"]
                    ? parseFloat(context["day1Range"]["high"]).toFixed(2)
                    : "N/A"}
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-[#979797]">
                <div>Low</div>
                <div>High</div>
              </div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>Price 52-Week Range</div>
              <PriceBarSlider
                progress={getProgressStatus(
                  context && context["weeks52Range"]
                    ? context["weeks52Range"]["low"]
                    : 0,
                  context && context["weeks52Range"]
                    ? context["weeks52Range"]["high"]
                    : 0,
                  context && context["weeks52Range"]
                    ? context["weeks52Range"]["mid"]
                    : 0
                )}
              />
              <div className="flex justify-between text-white text-xs">
                <div>
                  {context && context["weeks52Range"]
                    ? parseFloat(context["weeks52Range"]["low"]).toFixed(2)
                    : "N/A"}
                </div>
                <div>
                  {context && context["weeks52Range"]
                    ? parseFloat(context["weeks52Range"]["high"]).toFixed(2)
                    : "N/A"}
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-[#979797]">
                <div>
                  Low on{" "}
                  {context && context["weeks52Range"]
                    ? changeDateFormat(context["weeks52Range"]["onLow"])
                    : "N/A"}
                </div>
                <div className="pl-2">
                  High on{" "}
                  {context && context["weeks52Range"]
                    ? changeDateFormat(context["weeks52Range"]["onHigh"])
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex grow flex-col border-l px-3 border-[#252A2D] text-sm lg:my-2">
            <div className="grow text-[#979797] border-b border-dashed border-[#252A2D] pb-1">
              <div className="flex flex-row justify-between items-center">
                <div>Market Cap</div>
              </div>
              <div className="text-white font-bold">
                {context && context["statistics"]
                  ? formatBytes(
                      context["statistics"]["marketCapitalization"] / 10 ** 6,
                      3
                    )
                  : "N/A"}
              </div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>Shares Outstanding</div>
              <div className="text-white font-bold">
                {context && context["statistics"]
                  ? formatBytes(
                      context["statistics"]["sharesOutstanding"] / 10 ** 6,
                      2
                    )
                  : "N/A"}
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex grow flex-col border-l px-3 border-[#252A2D] text-sm lg:my-2">
            <div className="grow text-[#979797] border-b border-dashed border-[#252A2D] pb-1">
              <div>P/E Ratio (TTM)</div>
              <div className="text-white font-bold">
                {context && context["earnings"]
                  ? parseFloat(context["earnings"]["peRatio"]).toFixed(2)
                  : "N/A"}
              </div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>PEG Ratio (5-Yr)</div>
              <div className="text-white font-bold">
                {context && context["earnings"]
                  ? parseFloat(context["earnings"]["pegRatio"]).toFixed(2)
                  : "N/A"}
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex grow flex-col border-l px-3 border-[#252A2D] text-sm lg:my-2">
            <div className="grow text-[#979797] border-b border-dashed border-[#252A2D] pb-1">
              <div>Ann. Div. / Yield</div>
              <div className="text-white font-bold">
                $
                {context && context["dividends"]
                  ? parseFloat(context["dividends"]["annDivRate"]).toFixed(2)
                  : "N/A"}{" "}
                /{" "}
                {context && context["dividends"]
                  ? parseFloat(context["dividends"]["annDivYield"]).toFixed(2)
                  : "N/A"}
                %
              </div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>Dividend Ex-Date</div>
              <div className="text-white font-bold">
                {context && context["dividends"]
                  ? changeDateFormat(context["dividends"]["payDate"])
                  : "N/A"}
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex grow flex-col border-l px-3 border-[#252A2D] text-sm lg:my-2">
            <div className="grow text-[#979797] border-b border-dashed border-[#252A2D] pb-1">
              <div>EPS (TTM)</div>
              <div className="text-white font-bold">
                {context && context["earnings"]
                  ? parseFloat(context["earnings"]["eps"]).toFixed(2)
                  : "N/A"}
              </div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>Price Performance (52-Wk)</div>
              <div className="font-bold flex items-center">
                <span>
                  {context && context["performance"] ? (
                    context["performance"]["profitMargin"] > 0 ? (
                      <img src={numPositiveIcon} className="max-w-none" />
                    ) : (
                      <img src={numNegativeIcon} className="max-w-none" />
                    )
                  ) : (
                    <></>
                  )}
                </span>
                <span
                  className={
                    context &&
                    context["performance"] &&
                    context["performance"]["profitMargin"] > 0
                      ? "text-[#2EBD85]"
                      : "text-[#e2433b]"
                  }
                >
                  {context && context["performance"]
                    ? getNumber(
                        context["performance"]["profitMargin"].toFixed(2)
                      ) + "%"
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockPriceSummary;
