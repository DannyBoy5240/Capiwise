import { FC } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import EthPriceSummary from "../components/EthSummary/EthPriceSummary";

const EthSummary = () => {
  const location = useLocation();
  const ethContext = location.state.item;

  return (
    <div className="p-6">
      <EthPriceSummary code={ethContext.Code} />
    </div>
  );
};

export default EthSummary;
