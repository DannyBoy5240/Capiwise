import { FC } from "react";

import { useEffect, useState } from "react";

import PriceBarSlider from "../atom/PriceBarSlider";

import TotalSummaryInfo from "../molecules/TotalSummaryInfo";

interface ETFPriceSummaryProps {
  context: any;
}

const ETFPriceSummary: FC<ETFPriceSummaryProps> = ({ context }) => {
  const [stockSummary, setStockSummary] = useState(null);
  const [etfSummary, setetfSummary] = useState(null);
  const [stockLiveData, setStockLiveData] = useState(null);

  useEffect(() => {
    getSummaryInfo();
  }, []);

  const getSummaryInfo = async () => {
    // Get Stock INFO
    const stockURL =
      "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/stockSummary?ticker=" +
      context.Code +
      ".US&token=demo";

    fetch(stockURL)
      .then((response) => response.json())
      .then((data) => {
        setStockSummary(data);
      })
      .catch((error) => console.log(error));

    // Get ETF INFO
    const etfURL =
      "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/ETFSummary?ticker=" +
      context.Code +
      ".US&token=demo";

    fetch(etfURL)
      .then((response) => response.json())
      .then((data) => {
        setetfSummary(data);
      })
      .catch((error) => console.log(error));

    // Get Stock Live Data
    const stockLiveURL =
      "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/stockLiveData?ticker=" +
      context.Code +
      ".US";

    fetch(stockLiveURL)
      .then((response) => response.json())
      .then((data) => {
        setStockLiveData(data);
      })
      .catch((error) => console.log(error));
  };

  const getNumber = (num: any) => {
    if (num > 0) return "+" + num;
    else return num;
  };

  const changeDateFormat = (date: string) => {
    const dateStr: string = date;
    const dateArr: string[] = dateStr.split("-");
    const formattedDate: string =
      dateArr[1] + "." + dateArr[2] + "." + dateArr[0];
    return formattedDate;
  };

  const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return "0 B";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["B", "K", "M", "G", "T", "P", "E", "Z", "Y"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  };

  const getProgressStatus = (low: any, high: any, current: any): number => {
    console.log((100 * (current - low)) / (high - low));
    return (100 * (current - low)) / (high - low);
  };

  return (
    <div className="p-6 bg-[#0B1620] text-xs">
      <div className="border-b-2 pb-6 border-[#040B11]">
        <div className="flex items-center">
          <div className="text-2xl font-bold">
            {context.Name} ({context.Code})
          </div>
          <div className="text-base bg-[#040B11] p-1 ml-2">ETF</div>
        </div>
        <div className="text-sm mt-1">
          {etfSummary
            ? etfSummary["General::Exchange"]
              ? etfSummary["General::Exchange"]
              : "NA"
            : "N/A"}{" "}
          -{" "}
          {etfSummary
            ? etfSummary["General::Exchange"]
              ? etfSummary["General::Exchange"]
              : "NA"
            : "N/A"}{" "}
          Real Time Price. Currency in {context.Currency}
        </div>
      </div>
      <div className="flex py-6 flex justify-between w-full">
        <TotalSummaryInfo stockLiveData={stockLiveData} />
        {/*  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="flex flex-col border-l px-3 border-[#040B11] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#040B11] pb-1">
              <div>Price Day Range</div>
              <PriceBarSlider
                progress={getProgressStatus(
                  stockLiveData ? stockLiveData["low"] : 0,
                  stockLiveData ? stockLiveData["high"] : 0,
                  stockLiveData ? stockLiveData["high"] : 0
                )}
              />
              <div className="flex justify-between text-white text-xs">
                <div>
                  {stockLiveData
                    ? stockLiveData["low"]
                      ? parseFloat(stockLiveData["low"]).toFixed(2)
                      : "NA"
                    : "N/A"}{" "}
                </div>
                <div>
                  {stockLiveData
                    ? stockLiveData["high"]
                      ? parseFloat(stockLiveData["high"]).toFixed(2)
                      : "NA"
                    : "N/A"}{" "}
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
                  etfSummary ? etfSummary["Technicals::52WeekLow"]["price"] : 0,
                  etfSummary
                    ? etfSummary["Technicals::52WeekHigh"]["price"]
                    : 0,
                  stockLiveData ? stockLiveData["high"] : 0
                )}
              />
              <div className="flex justify-between text-white text-xs">
                <div>
                  {etfSummary
                    ? etfSummary["Technicals::52WeekLow"]["price"]
                      ? parseFloat(
                          etfSummary["Technicals::52WeekLow"]["price"]
                        ).toFixed(2)
                      : "NA"
                    : "N/A"}
                </div>
                <div>
                  {etfSummary
                    ? etfSummary["Technicals::52WeekHigh"]["price"]
                      ? parseFloat(
                          etfSummary["Technicals::52WeekHigh"]["price"]
                        ).toFixed(2)
                      : "NA"
                    : "N/A"}
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-[#979797]">
                <div>
                  {etfSummary
                    ? etfSummary["Technicals::52WeekLow"]["date"]
                      ? etfSummary["Technicals::52WeekLow"]["date"]
                      : "NA"
                    : "N/A"}
                </div>
                <div className="pl-2">
                  {etfSummary
                    ? etfSummary["Technicals::52WeekHigh"]["date"]
                      ? etfSummary["Technicals::52WeekHigh"]["date"]
                      : "NA"
                    : "N/A"}
                </div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col border-l px-3 border-[#040B11] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#040B11] pb-1">
              <div className="flex flex-row justify-between items-center">
                <div>Net Assets</div>
                <div className="text-[10px]">AS OF N/A</div>
              </div>
              <div className="text-white font-bold">
                {etfSummary
                  ? formatBytes(etfSummary["ETF_Data::TotalAssets"])
                  : "N/A"}
              </div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>Shares Outstanding</div>
              <div className="text-white font-bold">
                {etfSummary
                  ? etfSummary["SharesStats::SharesOutstanding"]
                    ? etfSummary["SharesStats::SharesOutstanding"]
                    : "NA"
                  : "N/A"}
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col border-l px-3 border-[#040B11] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#040B11] pb-1">
              <div>NAV (Previous Day)</div>
              <div className="text-white font-bold">N/A</div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>Net Expense Ratio</div>
              <div className="text-white font-bold">
                {etfSummary
                  ? etfSummary["ETF_Data::NetExpenseRatio"] * 100 + "%"
                  : "N/A"}
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col border-l px-3 border-[#040B11] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#040B11] pb-1">
              <div>30-Day SEC Yeld</div>
              <div className="text-white font-bold">N/A</div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>12-Month Yield (TTM)</div>
              <div className="text-white font-bold">N/A</div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col border-l px-3 border-[#040B11] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#040B11] pb-1">
              <div>Price Performance (52-Wk)</div>
              <div className="text-white font-bold flex items-center">
                <span>
                  {etfSummary && etfSummary["Price::Performance"] != "" ? (
                    etfSummary["Price::Performance"] > 0 ? (
                      <svg
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M6 0L11.1962 9H0.803848L6 0Z" fill="#2EBD85" />
                      </svg>
                    ) : (
                      <svg
                        width="12"
                        height="9"
                        viewBox="0 0 12 9"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6 0L11.1962 9H0.803848L6 0Z"
                          fill="#e2433b"
                          transform="rotate(180 6 4.5)"
                        />
                      </svg>
                    )
                  ) : (
                    <></>
                  )}
                </span>
                <span
                  className={
                    etfSummary && etfSummary["Price::Performance"] > 0
                      ? "text-[#2EBD85]"
                      : "text-[#e2433b]"
                  }
                >
                  {etfSummary
                    ? etfSummary["Price::Performance"]
                      ? getNumber(etfSummary["Price::Performance"]) + "%"
                      : "NA"
                    : "N/A"}
                </span>
              </div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>Inception Date</div>
              <div className="text-white font-bold">
                {etfSummary
                  ? etfSummary["ETF_Data::Inception_Date"]
                    ? changeDateFormat(etfSummary["ETF_Data::Inception_Date"])
                    : "NA"
                  : "N/A"}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ETFPriceSummary;
