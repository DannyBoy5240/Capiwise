import { FC } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import ETFPriceSummary from "../components/ETFSummary/ETFPriceSummary";
import AnalysisDetails from "../components/ETFSummary/AnalysisDetails";
import SummaryChart from "../components/molecules/SummaryChart";

import FundementalChart from "../components/molecules/etf/FundermentalChart";
import EarningsChart from "../components/molecules/etf/EarningsChart";
import PerformanceChart from "../components/molecules/etf/PerformanceChart";
import FinancialHealthChart from "../components/molecules/etf/FinancialHealthChart";
import DividendChart from "../components/molecules/etf/DividendChart";

import TopHoldings from "../components/molecules/etf/TopHoldings";

import CompanyProfile from "../components/molecules/etf/CompanyProfile";
import TechnicalAnalysis from "../components/molecules/etf/TechnicalAnalysis";

const ETFSummary = () => {
  const location = useLocation();
  const context = location.state.item;

  return (
    <div className="p-5">
      <ETFPriceSummary context={context} />
      <div className="pt-4 pb-2 flex">
        <div className="w-1/2 pr-2">
          <SummaryChart code={context.Code} />
        </div>
        <div className="w-1/4 px-2">
          <AnalysisDetails code={context.Code} />
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
          <FinancialHealthChart />
        </div>
      </div>
      {/* Financial Health & Dividend Chart */}
      <div className="flex py-2 justify-items-stretch">
        <div className="w-1/2 pr-2">
          <DividendChart />
        </div>
        <div className="w-1/2 pl-2">
          <PerformanceChart />
        </div>
      </div>
      {/* Top Holdings & Portfolio Composition */}
      <div className="flex py-2 justify-items-stretch">
        <div className="w-1/2 pr-2">
          <TopHoldings />
        </div>
        <div className="w-1/2 pl-2">
          <div className="bg-[#0B1620] flex flex-col p-4 h-full ml-2"></div>
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

export default ETFSummary;
