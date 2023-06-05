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

interface PerformanceChartProps {
  context: any;
}

const PerformanceChart: FC<PerformanceChartProps> = ({ context }) => {
  const chartRef = useRef(null);

  let maxDataSetsA = 0;

  const getDataLabels = () => {
    const arr: string[] = [];
    if (context && context.performance && context.performance.earningsHistory) {
      context.performance.earningsHistory.map((idx: any) => {
        arr.push(idx.year);
      });
      arr.reverse();
    }
    return arr;
  };
  const getDataSets = () => {
    const arr: number[] = [];
    if (context && context.performance && context.performance.earningsHistory) {
      let tmax = 0;
      context.performance.earningsHistory.map((idx: any) => {
        arr.push(idx.earnings);
        tmax = tmax < idx.earnings ? idx.earnings : tmax;
      });
      maxDataSetsA = tmax;
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
          // maxTicksLimit: 5,
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
      // {
      //   data: data_datasetsA,
      //   fill: true,
      //   backgroundColor: (context: any) => {
      //     const chart = context.chart;
      //     const ctx = chart.canvas.getContext("2d");
      //     const gradient = ctx.createLinearGradient(0, 0, 0, maxDataSetsA);
      //     gradient.addColorStop(0, "rgba(28, 166, 94, 0.6)");
      //     gradient.addColorStop(1, "rgba(28, 166, 94, 0)");
      //     return gradient;
      //   },
      //   borderWidth: 1,
      //   borderColor: "#2EBD85",
      //   // stack: "Stack 0",
      // },
      {
        fill: true,
        data: getDataSets(),
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const ctx = chart.canvas.getContext("2d");
          const gradient = ctx.createLinearGradient(0, 0, 0, maxDataSetsA / 2);
          gradient.addColorStop(0, "rgba(15, 105, 254, 0.124)");
          gradient.addColorStop(1, "rgba(1, 86, 168, 0.03)");
          return gradient;
        },
        borderWidth: 1,
        borderColor: "#0F69FE",
        // stack: "Stack 1",
      },
    ],
  };

  return (
    <div className="bg-[#0B1620] p-4 h-full">
      <div className="border-b-2 border-b-[#252A2D] py-2 text-base font-bold">
        Performance
      </div>
      <div className="flex py-2">
        <div className="w-2/3 flex flex-col pr-2 border-r-2 border-r-[#252A2D] h-full">
          <div className="font-medium text-sm pt-2 pb-1">
            Earnings and Revenue History
          </div>
          <div className="flex flex-col">
            <div className="py-2 grow flex items-center h-[240px]">
              <Line options={options} data={data} />
            </div>
            <div className="flex justify-end">
              <div className="flex text-sm">
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#2EBD85]"></div>
                  <div className="pl-2">Revenue</div>
                </div>
                <div className="flex items-center p-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0F69FE]"></div>
                  <div className="pl-2">Earnings</div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-sm flex py-1">
            <div>
              <img src={checkGreenIcon} />
            </div>
            <div className="pl-2 flex items-center">
              <span className="text-[#2EBD85]">Quality Earnings: </span>
              <span>
                {context && context.profile ? context.profile.symbol : "N/A"}{" "}
                has high quality earnings.
              </span>
            </div>
          </div>
          <div className="text-sm flex py-1">
            <div className="w-5 h-5">
              <img src={checkGreenIcon} className="w-5 h-5 max-w-none" />
            </div>
            <div className="pl-2 flex flex-wrap items-center">
              <span className="text-[#2EBD85]">Growing Profit Margin: </span>
              {context && context.profile ? context.profile.symbol : "N/A"}`s
              current net profit margins (
              {context && context.profile
                ? parseFloat(context.performance.profitMargin).toFixed(2)
                : "N/A"}
              %) are higher than last year (N/A%).
            </div>
          </div>
        </div>
        <div className="w-1/3 pl-2 text-sm text-white">
          <div className="text-white py-2 border-b border-b-[#252A2D]">
            Strength Earning
          </div>
          <div className="py-2">
            <div className="py-1 font-medium">Past Performance</div>
            <div className="flex w-full items-center">
              <div
                style={{
                  width: "52%",
                  height: "26px",
                  background: "#0F69FE",
                }}
              ></div>
              <div className="text-[28px] pl-2">
                {context && context.performance
                  ? context.performance.pastPerformanceEarningsGrowth
                  : "N/A"}
                %
              </div>
            </div>
            <div className="py-1 text-[#979797]">
              Historical annual earnings growth
            </div>
          </div>
          <div className="py-2">
            <div className="py-1 font-medium">Future Growth</div>
            <div className="flex w-full items-center">
              <div
                style={{
                  width: "53%",
                  height: "26px",
                  background: "#B8B9BB",
                }}
              ></div>
              <div className="text-[28px] pl-2">N/A%</div>
            </div>
            <div className="py-1 text-[#979797]">
              Forecasted annual earnings growth
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceChart;
