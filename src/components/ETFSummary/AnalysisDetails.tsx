import { FC } from "react";

import { useState, useEffect } from "react";

import GradientSlider from "../atom/GradientSlider";

interface AnalysisDetailsProps {
  code: string;
}

const AnalysisDetails: FC<AnalysisDetailsProps> = ({ code }) => {
  const [chanceValue, setChanceValue] = useState(0);
  const [riskValue, setRiskValue] = useState(0);

  useEffect(() => {
    getAnalysticInfo();
  }, []);

  const getAnalysticInfo = async () => {
    const fetchURL =
      "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/ETFSummary?ticker=" +
      code +
      ".US";

    fetch(fetchURL)
      .then((response) => response.json())
      .then((data) => {
        setChanceValue(data["Valuation::Chance"]);
        setRiskValue(
          data["Valuation::Risk"] > 0
            ? data["Valuation::Risk"]
            : -data["Valuation::Risk"]
        );
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="bg-[#0B1620] text-white md:ml-6 mt-6 md:mt-0 p-5 w-full md:w-1/2 lg:w-1/4 flex flex-col justify-between">
      <div>
        <div className="text-base font-bold">Risk-Return Valuation</div>
        <div>
          <div className="font-medium py-3 border-t-2 border-t-[#252A2D] mt-2">
            Risk vs. Index
          </div>
          <GradientSlider progress={chanceValue} mode={1} />
          <div className="font-medium py-3 border-t-2 border-t-[#040B11] mt-2">
            Return vs. Index
          </div>
          <GradientSlider progress={riskValue} mode={2} />
          <div className="text-xs">
            <div className="flex py-1">
              <div>
                <span className="font-bold">Above Average Risk Value: </span>
                {code} is trading above our estimate of average risk value.
              </div>
            </div>
            <div className="flex py-1">
              <div>
                <span className="font-bold">
                  Significantly High Return Value:
                </span>
                {code} is trading in our estimate of High value.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-sm pt-3 border-t border-t-[#252A2D]">
        Analysis details
      </div>
    </div>
  );
};

export default AnalysisDetails;
