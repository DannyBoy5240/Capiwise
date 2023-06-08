import { FC, useState, useEffect, useRef } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { useLocation, useNavigate } from "react-router-dom";

import checkGreenIcon from "../../../assets/check_green_ico.svg";
import closeRedIcon from "../../../assets/close_red_ico.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

interface FinancialHealthChartProps {
  context: any;
}

const FinancialHealthChart: FC<FinancialHealthChartProps> = ({ context }) => {
  const chartRef = useRef(null);

  let maxDataSetsA = 0;
  let maxDataSetsB = 0;
  let maxDataSetsC = 0;

  const getDataLabels = () => {
    const arr: string[] = [];
    if (context && context.finHealth) {
      context.finHealth.map((idx: any) => {
        arr.push(idx.fiscal_date);
      });
      arr.reverse();
    }
    return arr;
  };
  const getDataSetsA = () => {
    const arr: number[] = [];
    if (context && context.finHealth) {
      let tmax = 0;
      context.finHealth.map((idx: any) => {
        arr.push(idx.debt);
        tmax = tmax < idx.debt ? idx.debt : tmax;
      });
      maxDataSetsA = tmax;
      arr.reverse();
    }
    return arr;
  };
  const getDataSetsB = () => {
    const arr: number[] = [];
    if (context && context.finHealth) {
      let tmax = 0;
      context.finHealth.map((idx: any) => {
        arr.push(idx.equity);
        tmax = tmax < idx.equity ? idx.equity : tmax;
      });
      maxDataSetsB = tmax;
      arr.reverse();
    }
    return arr;
  };
  const getDataSetsC = () => {
    const arr: number[] = [];
    if (context && context.finHealth) {
      let tmax = 0;
      context.finHealth.map((idx: any) => {
        arr.push(idx.cash_and_cash_equivalents);
        tmax =
          tmax < idx.cash_and_cash_equivalents
            ? idx.cash_and_cash_equivalents
            : tmax;
      });
      maxDataSetsC = tmax;
      arr.reverse();
    }
    return arr;
  };

  const formatBytes = (bytes: number, decimals = 2): string => {
    if (bytes === 0) return "0 B";

    const k = 1000;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["", "", "M", "B", "T", "P"];
    const i = Math.floor(Math.log(bytes * 10 ** 6) / Math.log(k));

    return (
      parseFloat(((bytes * 10 ** 6) / Math.pow(k, i)).toFixed(dm)) +
      " " +
      sizes[i]
    );
  };

  const options = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Earning Chart",
      },
    },
    responsive: true,
    scales: {
      x: {
        ticks: {
          // maxTicksLimit: 9,
        },
        grid: {
          color: "transparent",
        },
      },
      y: {
        // beginAtZero: true,
        grid: {
          lineWidth: 0.6,
          color: "#E7EBEF23",
        },
        ticks: {
          callback: function (value: any, index: any, values: any) {
            // Append your subtext here
            return `${formatBytes(value)}`;
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 8,
        pointStyle: "circle",
        backgroundColor: "transparent",
        borderWidth: 1,
        borderColor: "#FFFFFF",
      },
    },
  };

  const data = {
    labels: getDataLabels(),
    datasets: [
      {
        data: getDataSetsA(),
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const ctx = chart.canvas.getContext("2d");
          const gradient = ctx.createLinearGradient(0, 0, 0, maxDataSetsA / 2);
          gradient.addColorStop(0, "rgba(226, 67, 59, 0.08)");
          gradient.addColorStop(1, "rgba(226, 67, 59, 0.07)");
          return gradient;
        },
        borderWidth: 1,
        borderColor: "#E2433B",
        // stack: "Stack 0",
      },
      {
        fill: true,
        data: getDataSetsB(),
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const ctx = chart.canvas.getContext("2d");
          const gradient = ctx.createLinearGradient(0, 0, 0, maxDataSetsB / 2);
          gradient.addColorStop(0, "rgba(15, 105, 254, 0.08)");
          gradient.addColorStop(1, "rgba(1, 86, 168, 0.02)");
          return gradient;
        },
        borderWidth: 1,
        borderColor: "#0F69FE",
        // stack: "Stack 1",
      },
      {
        fill: true,
        data: getDataSetsC(),
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const ctx = chart.canvas.getContext("2d");
          const gradient = ctx.createLinearGradient(0, 0, 0, maxDataSetsC / 2);
          gradient.addColorStop(0, "rgba(46, 188, 133, 0.2)");
          gradient.addColorStop(1, "rgba(46, 189, 133, 0.04)");
          return gradient;
        },
        borderWidth: 1,
        borderColor: "#2EBD85",
        // stack: "Stack 1",
      },
    ],
  };

  return (
    <div className="bg-[#0B1620] p-4 h-full">
      <div className="border-b-2 border-b-[#252A2D] py-2 text-base font-bold">
        Financial Health
      </div>
      <div className="flex py-2">
        <div className="flex flex-col w-full">
          <div className="font-medium text-sm pt-2 pb-1">
            Debt to Equity History and Analysis
          </div>
          <div className="py-2 grow flex items-center w-full h-[240px]">
            <Line options={options} data={data} />
          </div>
          <div className="flex justify-end">
            <div className="flex text-sm">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E2433B]"></div>
                <div className="px-2">Debt</div>
              </div>
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0F69FE]"></div>
                <div className="px-2">Equity</div>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full border-2 border-[#2EBD85]"></div>
                <div className="px-2 text-[#979797]">Cash and equivalents</div>
              </div>
            </div>
          </div>
          {/* Comments */}
          <div className="text-sm flex pt-3 pb-1">
            <div>
              <img src={closeRedIcon} />
            </div>
            <div className="pl-2 flex items-center">
              <span className="text-[#E2433B]">Debt Level: </span>
              <span className="pl-1">
                {context && context.profile ? context.profile.symbol : "N/A"}`s
                debt to equity ratio (154.3%) is considered high.
              </span>
            </div>
          </div>
          <div className="text-sm flex py-1">
            <div>
              <img src={closeRedIcon} className="max-w-none " />
            </div>
            <div className="pl-2">
              <span className="text-[#E2433B] pr-1">Reducing Debt: </span>
              {context && context.profile ? context.profile.symbol : "N/A"}`s
              debt to equity ratio has increased from 49.4% to 154.3% over the
              past 5 years.
            </div>
          </div>
          <div className="text-sm flex py-1">
            <div>
              <img src={checkGreenIcon} />
            </div>
            <div className="pl-2 flex items-center">
              <span className="text-[#2EBD85]">Debt Coverage: </span>
              <span className="pl-1">
                {context && context.profile ? context.profile.symbol : "N/A"}`s
                debt is well covered by operating cash flow (87%).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthChart;
