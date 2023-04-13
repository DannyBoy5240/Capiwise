import { FC } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import EthPriceSummary from "../components/EthSummary/EthPriceSummary";
import EthSummaryChart from "../components/EthSummary/EthSummaryChart";
import AnalysisDetails from "../components/EthSummary/AnalysisDetails";

const EthSummary = () => {
  const location = useLocation();
  const ethContext = location.state.item;

  return (
    <div className="p-6">
      <EthPriceSummary code={ethContext.Code} />
      <div className="py-6 flex flex-col md:flex-row">
        <EthSummaryChart code={ethContext.Code} />
        <AnalysisDetails code={ethContext.Code} />
      </div>
    </div>
  );
};

export default EthSummary;
