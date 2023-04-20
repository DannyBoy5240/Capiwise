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
        <div className="text-base font-bold pl-1">Risk-Return Valuation</div>
        <div>
          <div className="font-sm py-3 border-t-2 border-t-[#040B11] mt-2">
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
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_314_347)">
                    <path
                      d="M10 0C4.48566 0 0 4.48566 0 10C0 15.5143 4.48566 20 10 20C15.5143 20 20 15.5136 20 10C20 4.48645 15.5143 0 10 0ZM10 18.4508C5.34082 18.4508 1.54918 14.66 1.54918 10C1.54918 5.34004 5.34082 1.54918 10 1.54918C14.66 1.54918 18.4508 5.34004 18.4508 10C18.4508 14.66 14.6592 18.4508 10 18.4508Z"
                      fill="#F1B90B"
                    />
                    <path
                      d="M14.588 6.52211C14.2727 6.23551 13.7824 6.25797 13.4943 6.57477L8.76921 11.7777L6.48647 9.45707C6.18514 9.15188 5.69561 9.14723 5.3912 9.44778C5.086 9.74754 5.08135 10.2379 5.3819 10.543L8.23936 13.4478C8.38577 13.5965 8.58405 13.6794 8.79163 13.6794C8.79628 13.6794 8.80171 13.6794 8.80636 13.6802C9.02015 13.6755 9.22155 13.5841 9.36483 13.4261L14.6406 7.61664C14.928 7.29903 14.9048 6.80949 14.588 6.52211Z"
                      fill="#F1B90B"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_314_347">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="pl-2">
                <span className="font-bold text-[#F1B90B]">
                  Above Average Risk Value:{" "}
                </span>
                {code} is trading above our estimate of average risk value.
              </div>
            </div>
            <div className="flex py-1">
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_314_427)">
                    <path
                      d="M10 0C4.48566 0 0 4.48566 0 10C0 15.5143 4.48566 20 10 20C15.5143 20 20 15.5136 20 10C20 4.48645 15.5143 0 10 0ZM10 18.4508C5.34082 18.4508 1.54918 14.66 1.54918 10C1.54918 5.34004 5.34082 1.54918 10 1.54918C14.66 1.54918 18.4508 5.34004 18.4508 10C18.4508 14.66 14.6592 18.4508 10 18.4508Z"
                      fill="#2EBD85"
                    />
                    <path
                      d="M14.588 6.52211C14.2727 6.23551 13.7824 6.25797 13.4943 6.57477L8.76921 11.7777L6.48647 9.45707C6.18514 9.15188 5.69561 9.14723 5.3912 9.44778C5.086 9.74754 5.08135 10.2379 5.3819 10.543L8.23936 13.4478C8.38577 13.5965 8.58405 13.6794 8.79163 13.6794C8.79628 13.6794 8.80171 13.6794 8.80636 13.6802C9.02015 13.6755 9.22155 13.5841 9.36483 13.4261L14.6406 7.61664C14.928 7.29903 14.9048 6.80949 14.588 6.52211Z"
                      fill="#2EBD85"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_314_427">
                      <rect width="20" height="20" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <div className="pl-2">
                <span className="font-bold text-[#2EBD85]">
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
