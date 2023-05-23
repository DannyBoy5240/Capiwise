import { FC } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import EarningsChart from "../components/StockDetailsPage/EarningsChart";
import PerformanceChart from "../components/StockDetailsPage/PerformanceChart";

const StockDetailsPage = () => {
  return (
    <div className="flex">
      <div className="w-1/2">
        <EarningsChart />
      </div>
      <div className="w-1/2">
        <PerformanceChart />
      </div>
    </div>
  );
};

export default StockDetailsPage;
