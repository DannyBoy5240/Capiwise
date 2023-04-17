import { FC } from "react";

import { useEffect, useState } from "react";

import PriceBarSlider from "../atom/PriceBarSlider";

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

  const getNumber = (num: number) => {
    if (num > 0) return "+" + num;
    else return num;
  };

  return (
    <div className="p-6 bg-[#0B1620] text-xs">
      <div className="border-b pb-6 border-[#252A2D]">
        <div className="flex items-center">
          <div className="text-2xl font-bold">
            {context.Name} ({context.Code})
          </div>
          <div className="text-base bg-[#040B11] p-1 ml-2">ETF</div>
        </div>
        <div className="text-sm">
          NasdaqGS - NasdaqGS Real Time Price. Currency in {context.Currency}
        </div>
      </div>
      <div className="flex py-6 flex justify-between w-full">
        <div className="border-l-4 px-3 border-[#2EBD85]">
          <div className="flex flex-col">
            <div className="text-2xl font-bold">
              $
              {stockLiveData
                ? stockLiveData["high"]
                  ? stockLiveData["high"]
                  : "NA"
                : "N/A"}
            </div>
            <div className="text-[#2EBD85] text-xl">
              {stockLiveData
                ? stockLiveData["change"]
                  ? getNumber(stockLiveData["change"])
                  : "NA"
                : "N/A"}{" "}
              (
              {stockLiveData
                ? stockLiveData["change_p"]
                  ? getNumber(stockLiveData["change_p"])
                  : "NA"
                : "N/A"}{" "}
              )
            </div>
            <div className="font-bold">
              Market Opn: Mar 10.2021, 2:25 PM EST
            </div>
          </div>
        </div>
        {/*  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="flex flex-col border-l px-3 border-[#252A2D] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#252A2D] pb-1">
              <div>Price Day Range</div>
              <PriceBarSlider progress={52} />
              <div className="flex justify-between text-white">
                <div>
                  {stockLiveData
                    ? stockLiveData["low"]
                      ? stockLiveData["low"]
                      : "NA"
                    : "N/A"}{" "}
                </div>
                <div>
                  {stockLiveData
                    ? stockLiveData["high"]
                      ? stockLiveData["high"]
                      : "NA"
                    : "N/A"}{" "}
                </div>
              </div>
              <div className="flex justify-between">
                <div>Low</div>
                <div>High</div>
              </div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>Price 52-Week Range</div>
              <PriceBarSlider progress={76} />
              <div className="flex justify-between text-white">
                <div>
                  {stockSummary ? stockSummary["Technicals::52WeekLow"] : "N/A"}
                </div>
                <div>
                  {stockSummary
                    ? stockSummary["Technicals::52WeekHigh"]
                    : "N/A"}
                </div>
              </div>
              <div className="flex justify-between">
                <div>N/A</div>
                <div className="pl-2">N/A</div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col border-l px-3 border-[#252A2D] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#252A2D] pb-1">
              <div className="flex flex-row justify-between items-center">
                <div>Net Assets</div>
                <div className="text-[10px]">AS OF 03/31/2021</div>
              </div>
              <div className="text-white font-bold">
                {stockSummary ? stockSummary["ETF_Data::TotalAssets"] : "N/A"}
              </div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>Shares Outstanding</div>
              <div className="text-white font-bold">
                {stockSummary
                  ? stockSummary["SharesStats::SharesOutstanding"]
                    ? stockSummary["SharesStats::SharesOutstanding"]
                    : "NA"
                  : "N/A"}
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col border-l px-3 border-[#252A2D] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#252A2D] pb-1">
              <div>NAV (Previous Day)</div>
              <div className="text-white font-bold">N/A</div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>Net Expense Ratio</div>
              <div className="text-white font-bold">
                {stockSummary
                  ? stockSummary["ETF_Data::NetExpenseRatio"]
                  : "N/A"}
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col border-l px-3 border-[#252A2D] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#252A2D] pb-1">
              <div>30-Day SEC Yeld</div>
              <div className="text-white font-bold">N/A</div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>12-Month Yield (TTM)</div>
              <div className="text-white font-bold">N/A</div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col border-l px-3 border-[#252A2D] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#252A2D] pb-1">
              <div>Price Performance (52-Wk)</div>
              <div className="text-white font-bold">N/A</div>
            </div>
            <div className="grow text-[#979797] pt-1">
              <div>Inception Date</div>
              <div className="text-white font-bold">
                {stockSummary
                  ? stockSummary["ETF_Date::Inception_Date"]
                    ? stockSummary["ETF_Date::Inception_Date"]
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
