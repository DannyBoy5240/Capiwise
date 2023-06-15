import { FC, useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import StockPriceSummary from "../components/StockSummary/StockPriceSummary";
import StockAnalysisDetails from "../components/StockSummary/StockAnalysisDetails";
import SummaryChart from "../components/molecules/SummaryChart";

import FundementalChart from "../components/molecules/stock/FundermentalChart";
import EarningsChart from "../components/molecules/stock/EarningsChart";
import PerformanceChart from "../components/molecules/stock/PerformanceChart";
import FinancialHealthChart from "../components/molecules/stock/FinancialHealthChart";
import DividendChart from "../components/molecules/stock/DividendChart";

import CompanyProfile from "../components/molecules/stock/CompanyProfile";
import TechnicalAnalysis from "../components/molecules/stock/TechnicalAnalysis";
import EquitySummaryScore from "../components/molecules/stock/EquitySummaryScore";
import FundamentalEvents from "../components/molecules/stock/FundamentalEvents";

const StockSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const context = location.state.item;

  const [stockData, setStockData] = useState(null);

  const getStockDetails = async () => {
    const stockURL =
      "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/stockSummary?ticker=" +
      context.symbol;

    await fetch(stockURL)
      .then((response) => response.json())
      .then((data) => {
        setStockData(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getStockDetails();
  }, [navigate]);

  return (
    <div className="p-5">
      <StockPriceSummary context={stockData} />
      <div className="pb-2 flex">
        <div className="w-1/2 pr-2">
          <SummaryChart code={context.symbol} stockData={stockData} />
        </div>
        <div className="pt-4 w-1/4 px-2">
          <StockAnalysisDetails code={context.symbol} stockData={stockData} />
        </div>
        <div className="pt-4 w-1/4 pl-2">
          <FundementalChart />
        </div>
      </div>
      {/* Earnings & Performance Chart */}
      <div className="flex py-2 justify-items-stretch">
        <div className="w-1/2 pr-2">
          <EarningsChart context={stockData} />
        </div>
        <div className="w-1/2 pl-2">
          <PerformanceChart context={stockData} />
        </div>
      </div>
      {/* Financial Health & Dividend Chart */}
      <div className="flex py-2 justify-items-stretch">
        <div className="w-1/2 pr-2">
          <FinancialHealthChart context={stockData} />
        </div>
        <div className="w-1/2 pl-2">
          <DividendChart context={stockData} />
        </div>
      </div>
      {/* Company Profile & Equity Summary & Fundamental Event & Technical Analysis */}
      <div className="flex py-2 justify-items-stretch">
        <div className="w-1/4 pr-2">
          {stockData && stockData["profile"] ? (
            <CompanyProfile context={stockData["profile"]} />
          ) : (
            <CompanyProfile context={null} />
          )}
        </div>
        <div className="w-1/4 px-2">
          <EquitySummaryScore />
        </div>
        <div className="w-1/4 px-2">
          <FundamentalEvents context={stockData} />
        </div>
        <div className="w-1/4 pl-2">
          <TechnicalAnalysis />
        </div>
      </div>
    </div>
  );
};

export default StockSummary;
