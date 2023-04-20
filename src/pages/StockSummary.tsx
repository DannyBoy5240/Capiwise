import { FC } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import StockPriceSummary from "../components/StockSummary/StockPriceSummary";
import StockAnalysisDetails from "../components/StockSummary/StockAnalysisDetails";
import StockSummaryChart from "../components/StockSummary/StockSummaryChart";

const StockSummary = () => {
  const location = useLocation();
  const context = location.state.item;

  return (
    <div className="p-6">
      <StockPriceSummary context={context} />
      <div className="py-6 flex flex-col md:flex-row">
        <StockSummaryChart code={context.Code} />
        <StockAnalysisDetails code={context.Code} />
      </div>
    </div>
  );
};

export default StockSummary;
