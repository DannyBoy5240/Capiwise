import { FC } from "react";

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

const StockSummary = () => {
  const location = useLocation();
  const context = location.state.item;

  return (
    <div className="p-5">
      <StockPriceSummary context={context} />
      <div className="pt-4 pb-2 flex">
        <div className="w-1/2 pr-2">
          <SummaryChart code={context.symbol} />
        </div>
        <div className="w-1/4 px-2">
          <StockAnalysisDetails code={context.symbol} />
        </div>
        <div className="w-1/4 pl-2">
          <FundementalChart />
        </div>
      </div>
      {/* Earnings & Performance Chart */}
      <div className="flex py-2 justify-items-stretch">
        <div className="w-1/2 pr-2">
          <EarningsChart />
        </div>
        <div className="w-1/2 pl-2">
          <PerformanceChart />
        </div>
      </div>
      {/* Financial Health & Dividend Chart */}
      <div className="flex py-2 justify-items-stretch">
        <div className="w-1/2 pr-2">
          <FinancialHealthChart />
        </div>
        <div className="w-1/2 pl-2">
          <DividendChart />
        </div>
      </div>
      {/* Company Profile & Equity Summary & Fundamental Event & Technical Analysis */}
      <div className="flex py-2 justify-items-stretch">
        <div className="w-1/4 pr-2">
          <CompanyProfile />
        </div>
        <div className="w-1/4 pl-2">
          <div className="bg-[#0B1620] flex flex-col p-4 h-full mr-2"></div>
        </div>
        <div className="w-1/4 pr-2">
          <div className="bg-[#0B1620] flex flex-col p-4 h-full ml-2"></div>
        </div>
        <div className="w-1/4 pl-2">
          <TechnicalAnalysis />
        </div>
      </div>
    </div>
  );
};

export default StockSummary;
