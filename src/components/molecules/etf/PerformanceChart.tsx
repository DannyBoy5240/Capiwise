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

const PerformanceChart = () => {
  const labels = [
    "2011",
    "2012",
    "2013",
    "2014",
    "2015",
    "2016",
    "2017",
    "2018",
    "2019",
    "2020",
  ];

  const labelsA = Array(500)
    .fill(null)
    .map((_, index) => {
      return;
      // year: (2011 + Math.floor(index / 10)).toString(), // increment year every 10 items
      // value: index,
      2011 + Math.floor(index / 10); // increment year every 10 items
    });

  const chartRef = useRef(null);

  const totalCount = 500;
  const [data_labels, setData_Labels] = useState<string[]>([]);
  const [data_datasets, setData_Datasets] = useState<number[]>([]);
  const [data_datasetsA, setData_DatasetsA] = useState<number[]>([]);
  const [max_datasets, setMaxx_Datasets] = useState(0);
  const [max_datasetsA, setMaxx_DatasetsA] = useState(0);

  const generateRandom = () => {
    const myArray: number[] = [];
    const myArrayA: number[] = [];
    const myArrayB: number[] = [];

    const loopArray: number[] = Array(totalCount).fill(0);
    loopArray.map((idx) => {
      myArray.push(Math.floor(Math.random() * 200));
      myArrayA.push(Math.floor(Math.random() * 240));
      myArrayB.push(Math.floor(Math.random() * 10 + 2012));
    });
    myArrayB.sort((a, b) => a - b);

    setData_Datasets(myArray);
    setData_DatasetsA(myArrayA);
    setData_Labels(myArrayB.map(String));

    setMaxx_Datasets(Math.max(...myArray));
    setMaxx_DatasetsA(Math.max(...myArrayA));
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
          maxTicksLimit: 5,
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
            return `${value}B`;
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
    labels,
    datasets: [
      {
        data: data_datasets,
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const ctx = chart.canvas.getContext("2d");
          const gradient = ctx.createLinearGradient(0, 0, 0, max_datasets);
          gradient.addColorStop(0, "rgba(28, 166, 94, 0.6)");
          gradient.addColorStop(1, "rgba(28, 166, 94, 0)");
          return gradient;
        },
        borderWidth: 1,
        borderColor: "#2EBD85",
        // stack: "Stack 0",
      },
      {
        fill: true,
        data: data_datasetsA,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const ctx = chart.canvas.getContext("2d");
          const gradient = ctx.createLinearGradient(0, 0, 0, max_datasetsA);
          gradient.addColorStop(0, "rgba(15, 105, 254, 0.394)");
          gradient.addColorStop(1, "rgba(1, 86, 168, 0)");
          return gradient;
        },
        borderWidth: 1,
        borderColor: "#0F69FE",
        // stack: "Stack 1",
      },
    ],
  };

  useEffect(() => {
    generateRandom();
  }, []);

  return (
    <div className="bg-[#0B1620] p-4 h-full">
      <div className="border-b-2 border-b-[#252A2D] py-2 text-base font-bold">
        Fees
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
