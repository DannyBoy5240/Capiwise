import { FC } from "react";

import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const FundermentalChart = () => {
  const data = {
    labels: [
      "Risk-Return Valuation",
      "Performance",
      "Growth Stability",
      "Net Expense",
      "Fund Health",
    ],
    datasets: [
      {
        label: "",
        data: [7, 9, 8, 8, 6, 4],
        backgroundColor: "rgba(46, 189, 133, 0.5)",
        borderColor: "rgba(46, 189, 133, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        grid: {
          circular: true,
          lineWidth: 1, // Set grid line width to make them thicker
          color: "rgba(0, 0, 0, 0.5)", // Set grid line color
          backgroundColor: ["#040B11", "#252A2D"],
        },
        // pointLabels: {
        //   display: false, // Hide point labels
        // },
        ticks: {
          display: false, // Hide tick value labels
        },
      },
    },
    plugins: {
      legend: {
        display: false, // Hide legend
      },
    },
  };

  return (
    <div className="bg-[#0B1620] flex flex-col p-4 h-full">
      <div className="text-base font-bold py-2 border-b border-b-[#252A2D]">
        Fundemental Analysis
      </div>
      <div className="grow">
        {/* context */}
        <div className="h-full flex flex-col">
          <div className="grow">
            <Radar data={data} options={options} />
          </div>
          <div className="py-2">
            <div className="text-sm text-white">NasdaqGS:AAPL</div>
            <div className="text-xs text-[#979797]">
              Provided by S&P Global Market Intelligence as of 04/23/2023
            </div>
          </div>
        </div>
      </div>
      {/* footer */}
      <div className="text-sm border-t border-t-[#252A2D] pt-2">
        How to interpret this data
      </div>
    </div>
  );
};

export default FundermentalChart;
