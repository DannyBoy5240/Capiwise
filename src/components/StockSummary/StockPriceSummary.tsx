import { FC } from "react";

import { useEffect, useState } from "react";

import PriceBarSlider from "../atom/PriceBarSlider";

import TotalSummaryInfo from "../molecules/TotalSummaryInfo";

interface StockPriceSummaryProps {
  context: any;
}

const StockPriceSummary: FC<StockPriceSummaryProps> = ({ context }) => {
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
      dateArr[1] + "/" + dateArr[2] + "/" + dateArr[0];
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

  return (
    <div className="p-6 bg-[#0B1620] text-xs">
      <div className="border-b-2 pb-6 border-[#040B11]">
        <div className="text-2xl font-bold">
          {context.Name} ({context.Code})
        </div>
        <div className="text-sm mt-1">
          {stockSummary
            ? stockSummary["General::Exchange"]
              ? stockSummary["General::Exchange"]
              : "NA"
            : "N/A"}{" "}
          -{" "}
          {stockSummary
            ? stockSummary["General::Exchange"]
              ? stockSummary["General::Exchange"]
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
              <PriceBarSlider progress={52} />
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
              <PriceBarSlider progress={76} />
              <div className="flex justify-between text-white text-xs">
                <div>
                  {stockSummary
                    ? stockSummary["Technicals::52WeekLow"]["price"]
                      ? parseFloat(
                          stockSummary["Technicals::52WeekLow"]["price"]
                        ).toFixed(2)
                      : "NA"
                    : "N/A"}
                </div>
                <div>
                  {stockSummary
                    ? stockSummary["Technicals::52WeekHigh"]["price"]
                      ? parseFloat(
                          stockSummary["Technicals::52WeekHigh"]["price"]
                        ).toFixed(2)
                      : "NA"
                    : "N/A"}
                </div>
              </div>
              <div className="flex justify-between text-[10px] text-[#979797]">
                <div>
                  {stockSummary
                    ? stockSummary["Technicals::52WeekLow"]["date"]
                      ? stockSummary["Technicals::52WeekLow"]["date"]
                      : "NA"
                    : "N/A"}
                </div>
                <div className="pl-2">
                  {stockSummary
                    ? stockSummary["Technicals::52WeekHigh"]["date"]
                      ? stockSummary["Technicals::52WeekHigh"]["date"]
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
                <div>Market Cap</div>
              </div>
              <div className="text-white font-bold">
                {stockSummary
                  ? stockSummary["Highlights::MarketCapitalizationMln"] != ""
                    ? formatBytes(
                        stockSummary["Highlights::MarketCapitalizationMln"]
                      )
                    : "NA"
                  : "N/A"}
              </div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>Shares Outstanding</div>
              <div className="text-white font-bold">
                {stockSummary
                  ? stockSummary["SharesStats::SharesOutstanding"] != ""
                    ? formatBytes(
                        stockSummary["SharesStats::SharesOutstanding"]
                      )
                    : "NA"
                  : "N/A"}
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col border-l px-3 border-[#040B11] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#040B11] pb-1">
              <div>P/E Ratio (TTM)</div>
              <div className="text-white font-bold">
                {stockSummary
                  ? stockSummary["Highlights::PERatio"]
                    ? parseFloat(stockSummary["Highlights::PERatio"]).toFixed(2)
                    : "NA"
                  : "N/A"}
              </div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>PEG Ratio (5-Yr)</div>
              <div className="text-white font-bold">
                {stockSummary
                  ? stockSummary["Highlights::PEGRatio"]
                    ? parseFloat(stockSummary["Highlights::PEGRatio"]).toFixed(
                        2
                      )
                    : "NA"
                  : "N/A"}
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col border-l px-3 border-[#040B11] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#040B11] pb-1">
              <div>Ann. Div. / Yield</div>
              <div className="text-white font-bold">
                $
                {stockSummary
                  ? stockSummary["SplitsDividends::ForwardAnnualDividendRate"]
                    ? parseFloat(
                        stockSummary[
                          "SplitsDividends::ForwardAnnualDividendRate"
                        ]
                      ).toFixed(2)
                    : "NA"
                  : "N/A"}{" "}
                /{" "}
                {stockSummary
                  ? stockSummary["SplitsDividends::ForwardAnnualDividendYield"]
                    ? parseFloat(
                        stockSummary[
                          "SplitsDividends::ForwardAnnualDividendYield"
                        ]
                      ).toFixed(2)
                    : "NA"
                  : "N/A"}{" "}
                %
              </div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>Dividend Ex-Date</div>
              <div className="text-white font-bold">
                {stockSummary
                  ? stockSummary["SplitsDividends::ExDividendDate"]
                    ? changeDateFormat(
                        stockSummary["SplitsDividends::ExDividendDate"]
                      )
                    : "NA"
                  : "N/A"}
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col border-l px-3 border-[#040B11] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#040B11] pb-1">
              <div>EPS (TTM)</div>
              <div className="text-white font-bold">N/A</div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>Price Performance (52-Wk)</div>
              <div className="font-bold flex items-center">
                <span>
                  {stockSummary && stockSummary["Price::Performance"] != "" ? (
                    stockSummary["Price::Performance"] > 0 ? (
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
                        <path d="M6 0L11.1962 9H0.803848L6 0Z" fill="#e2433b" />
                      </svg>
                    )
                  ) : (
                    <></>
                  )}
                </span>
                <span
                  className={
                    stockSummary && stockSummary["Price::Performance"] > 0
                      ? "text-[#2EBD85]"
                      : "text-[#e2433b]"
                  }
                >
                  {stockSummary
                    ? stockSummary["Price::Performance"]
                      ? getNumber(stockSummary["Price::Performance"]) + "%"
                      : "NA"
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
