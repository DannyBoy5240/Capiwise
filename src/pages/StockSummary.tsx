import { FC } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import StockPriceSummary from "../components/StockSummary/StockPriceSummary";
import StockAnalysisDetails from "../components/StockSummary/StockAnalysisDetails";
import SummaryChart from "../components/molecules/SummaryChart";

import EarningsChart from "../components/molecules/stock/EarningsChart";
import PerformanceChart from "../components/molecules/stock/PerformanceChart";
import FinancialHealthChart from "../components/molecules/stock/FinancialHealthChart";
import DividendChart from "../components/molecules/stock/DividendChart";

const StockSummary = () => {
  const location = useLocation();
  const context = location.state.item;

  return (
    <div className="p-5">
      <StockPriceSummary context={context} />
      <div className="pt-4 pb-2 flex">
        <div className="w-1/2 pr-2">
          <SummaryChart code={context.Code} />
        </div>
        <div className="w-1/4 pl-2">
          <StockAnalysisDetails code={context.Code} />
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
    </div>
  );
};

export default StockSummary;
