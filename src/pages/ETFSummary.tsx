import { FC } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import ETFPriceSummary from "../components/ETFSummary/ETFPriceSummary";
import AnalysisDetails from "../components/ETFSummary/AnalysisDetails";
import ETFSummaryChart from "../components/ETFSummary/ETFSummaryChart";

const ETFSummary = () => {
  const location = useLocation();
  const etfContext = location.state.item;

  return (
    <div className="p-6">
      <ETFPriceSummary context={etfContext} />
      <div className="py-6 flex flex-col md:flex-row">
        <ETFSummaryChart code={etfContext.Code} />
        <AnalysisDetails code={etfContext.Code} />
      </div>
    </div>
  );
};

export default ETFSummary;
