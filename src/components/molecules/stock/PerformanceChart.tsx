import { FC } from "react";

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

const labels = ["2016", "2017", "2018", "2019", "2020"];

export const options = {
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
    y: {
      beginAtZero: true,
    },
  },
  elements: {
    point: {
      radius: 0,
      hoverRadius: 8,
      pointStyle: "circle",
      backgroundColor: "#FFFFFF",
      borderWidth: 4,
      borderColor: "#FFFFFF",
    },
  },
};

function generateRandom() {
  const myArray: number[] = [];
  labels.map((idx) => {
    myArray.push(Math.floor(Math.random() * 500));
  });
  return myArray;
}

export const data = {
  labels,
  datasets: [
    {
      label: "",
      data: generateRandom(),
      fill: true,
      backgroundColor: (context: any) => {
        const chart = context.chart;
        const ctx = chart.canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 150);
        gradient.addColorStop(0, "rgba(28, 166, 94, 0.6)");
        gradient.addColorStop(1, "rgba(28, 166, 94, 0)");
        return gradient;
      },
      borderColor: "#2EBD85",
      stack: "Stack 0",
    },
    {
      fill: true,
      label: "",
      data: generateRandom(),
      backgroundColor: (context: any) => {
        const chart = context.chart;
        const ctx = chart.canvas.getContext("2d");
        const gradient = ctx.createLinearGradient(0, 0, 0, 150);
        gradient.addColorStop(0, "rgba(15, 105, 254, 1)");
        gradient.addColorStop(1, "rgba(1, 86, 168, 0)");
        return gradient;
      },
      borderColor: "#0F69FE",
      stack: "Stack 1",
    },
  ],
};

const PerformanceChart = () => {
  return (
    <div className="bg-[#0B1620] p-4 h-full">
      <div className="border-b-2 border-b-[#252A2D] py-2 text-base font-bold">
        Performance
      </div>
      <div className="flex py-2">
        <div className="w-2/3 flex flex-col pr-2 border-r-2 border-r-[#252A2D]">
          <div className="font-medium text-sm pt-2 pb-1">
            Earnings and Revenue History
          </div>
          <div className="py-2 grow flex items-center">
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
          <div className="text-sm flex py-1">
            <div>
              <img src={checkGreenIcon} />
            </div>
            <div className="pl-2 flex items-center">
              <span className="text-[#2EBD85]">Quality Earnings: </span>
              <span>AAPL has high quality earnings.</span>
            </div>
          </div>
          <div className="text-sm flex py-1">
            <div className="w-5 h-5">
              <img src={checkGreenIcon} className="w-5 h-5 max-w-none" />
            </div>
            <div className="pl-2 flex flex-wrap items-center">
              <span className="text-[#2EBD85]">Growing Profit Margin: </span>
              AAPL`s current net profit margins (21.7%) are higher than last
              year (21.5%).
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
              <div className="text-[28px] pl-2">5.2%</div>
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
              <div className="text-[28px] pl-2">5.3%</div>
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
