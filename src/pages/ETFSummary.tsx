import { FC, useState, useEffect } from "react";

import { useLocation, useNavigate } from "react-router-dom";

import ETFPriceSummary from "../components/ETFSummary/ETFPriceSummary";
import AnalysisDetails from "../components/ETFSummary/AnalysisDetails";
import SummaryChart from "../components/molecules/SummaryChart";

import FundementalChart from "../components/molecules/etf/FundermentalChart";
import PerformanceeChart from "../components/molecules/etf/PerformanceeChart";
import RiskReturnComparisonChart from "../components/molecules/etf/RiskReturnComparisonChart";
import DividendChart from "../components/molecules/etf/DividendChart";
import FeeChart from "../components/molecules/etf/FeeChart";
import GrowthChart from "../components/molecules/etf/GrowthChart";
import FundAnalysisChart from "../components/molecules/etf/FundAnalysisChart";

import TopHoldings from "../components/molecules/etf/TopHoldings";
import PortfolioComposition from "../components/molecules/etf/PortfolioComposition";
import FundCharacteristics from "../components/molecules/etf/FundCharacteristics";
import AnalystRatings from "../components/molecules/etf/AnalystRatings";

import CompanyProfile from "../components/molecules/etf/CompanyProfile";
import TechnicalAnalysis from "../components/molecules/etf/TechnicalAnalysis";

const ETFSummary = () => {
  const location = useLocation();
  const context = location.state.item;

  const [etfData, setETFData] = useState(null);

  const getETFDetails = async () => {
    console.log("context.symbol -> ", context.symbol);

    const etfURL =
      "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/ETFSummary?ticker=" +
      context.symbol;

    await fetch(etfURL)
      .then((response) => response.json())
      .then((data) => {
        setETFData(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getETFDetails();
  }, []);

  return (
    <div className="p-5">
      <ETFPriceSummary context={etfData} />
      <div className="pt-4 pb-2 flex">
        <div className="w-1/2 pr-2">
          <SummaryChart code={context.symbol} stockData={null} />
        </div>
        <div className="w-1/4 px-2">
          <AnalysisDetails code={context.symbol} />
        </div>
        <div className="w-1/4 pl-2">
          <FundementalChart />
        </div>
      </div>
      {/* Performance & Risk-Return Comparison Chart */}
      <div className="flex py-2 justify-items-stretch">
        <div className="w-1/2 pr-2">
          <PerformanceeChart />
        </div>
        <div className="w-1/2 pl-2">
          <RiskReturnComparisonChart />
        </div>
      </div>
      {/* Growth & Fund Analysis Chart */}
      <div className="flex py-2 justify-items-stretch">
        <div className="w-1/2 pr-2">
          <GrowthChart />
        </div>
        <div className="w-1/2 pl-2">
          <FundAnalysisChart />
        </div>
      </div>
      {/* Financial Health & Dividend Chart */}
      <div className="flex py-2 justify-items-stretch">
        <div className="w-1/2 pr-2">
          <DividendChart />
        </div>
        <div className="w-1/2 pl-2">
          <FeeChart />
        </div>
      </div>
      {/* Top Holdings & Portfolio Composition */}
      <div className="flex py-2 justify-items-stretch">
        <div className="w-1/2 pr-2">
          <TopHoldings />
        </div>
        <div className="w-1/2 pl-2">
          <PortfolioComposition />
        </div>
      </div>
      {/* Company Profile & Equity Summary & Fundamental Event & Technical Analysis */}
      <div className="flex py-2 justify-items-stretch">
        <div className="w-1/4 pr-2">
          {etfData && etfData["companyProfile"] ? (
            <CompanyProfile context={etfData["companyProfile"]} />
          ) : (
            <CompanyProfile context={null} />
          )}
        </div>
        <div className="w-1/4 px-2">
          <AnalystRatings />
        </div>
        <div className="w-1/4 px-2">
          <FundCharacteristics />
        </div>
        <div className="w-1/4 pl-2">
          <TechnicalAnalysis />
        </div>
      </div>
    </div>
  );
};

export default ETFSummary;
