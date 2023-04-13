import { FC } from "react";

import { useEffect, useState } from "react";

interface EthPriceSummaryProps {
  code: string;
}

const EthPriceSummary: FC<EthPriceSummaryProps> = ({ code }) => {
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    getETHInfo();
  }, []);

  const getETHInfo = async () => {
    const fetchURL =
      "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/ETFSummary?ticker=" +
      code +
      ".US&token=demo";

    const response = await fetch(fetchURL);
    const jsonData = await response.json();
    console.log(jsonData);
    setSummaryData(jsonData);
  };

  return (
    <div className="p-6 bg-[#0B1620] text-xs">
      <div className="border-b pb-6 border-[#252A2D]">
        <div className="flex items-center">
          <div className="text-2xl font-bold">
            Invesco {code} Trust ({code})
          </div>
          <div className="text-base bg-[#040B11] p-1 ml-2">ETH</div>
        </div>
        <div className="text-sm">
          NasdaqGS - NasdaqGS Real Time Price. Currency in USD
        </div>
      </div>
      <div className="flex py-6 flex justify-between w-full">
        <div className="border-l-4 px-3 border-[#2EBD85]">
          <div className="flex flex-col">
            <div className="text-2xl font-bold">$315.50</div>
            <div className="text-[#2EBD85] text-xl">+0.07 (+0.02%)</div>
            <div className="font-bold">
              Market Opn: Mar 10.2021, 2:25 PM EST
            </div>
          </div>
        </div>
        {/*  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          <div className="flex flex-col border-l py-2 px-4 border-[#252A2D] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#252A2D] pb-1">
              <div>Price Day Range</div>
              <div className="flex justify-between text-white">
                <div>164.93</div>
                <div>338.19</div>
              </div>
              <div className="flex justify-between">
                <div>Low</div>
                <div>High</div>
              </div>
            </div>
            <div className="grow text-[#979797] pt-3">
              <div>Price 52-Week Range</div>
              <div className="flex justify-between text-white">
                <div>
                  {summaryData ? summaryData["Technicals::52WeekLow"] : "N/A"}
                </div>
                <div>
                  {summaryData ? summaryData["Technicals::52WeekHigh"] : "N/A"}
                </div>
              </div>
              <div className="flex justify-between">
                <div>23.03.2020</div>
                <div className="pl-2">16.02.2021</div>
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col border-l py-2 px-4 border-[#252A2D] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#252A2D] pb-1">
              <div className="flex">
                <div>Net Assets</div>
                <div>AS OF 03/31/2021</div>
              </div>
              <div className="text-white font-bold">
                {summaryData ? summaryData["ETF_Data::TotalAssets"] : "N/A"}
              </div>
            </div>
            <div className="grow text-[#979797] pt-3">
              <div>Shares Outstanding</div>
              <div className="text-white font-bold">479.75M</div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col border-l py-2 px-4 border-[#252A2D] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#252A2D] pb-1">
              <div>NAV (Previous Day)</div>
              <div className="text-white font-bold">320.65</div>
            </div>
            <div className="grow text-[#979797] pt-3">
              <div>Net Expense Ratio</div>
              <div className="text-white font-bold">
                {summaryData ? summaryData["ETF_Data::NetExpenseRatio"] : "N/A"}
              </div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col border-l py-2 px-4 border-[#252A2D] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#252A2D] pb-1">
              <div>30-Day SEC Yeld</div>
              <div className="text-white font-bold">0.53%</div>
            </div>
            <div className="grow text-[#979797] pt-3">
              <div>12-Month Yield (TTM)</div>
              <div className="text-white font-bold">0.55%</div>
            </div>
          </div>
          {/*  */}
          <div className="flex flex-col border-l py-2 px-4 border-[#252A2D] text-sm">
            <div className="grow text-[#979797] border-b border-dashed border-[#252A2D] pb-1">
              <div>Price Performance (52-Wk)</div>
              <div className="text-white font-bold">+89.36%</div>
            </div>
            <div className="grow text-[#979797] pt-3">
              <div>Inception Date</div>
              <div className="text-white font-bold">
                {summaryData
                  ? summaryData["ETF_Date::Inception_Date"]
                    ? summaryData["ETF_Date::Inception_Date"]
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

export default EthPriceSummary;
