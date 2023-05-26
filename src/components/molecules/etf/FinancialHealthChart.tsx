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

const FinancialHealthChart = () => {
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
          gradient.addColorStop(0, "rgba(226, 67, 59, 0.78)");
          gradient.addColorStop(1, "rgba(226, 67, 59, 0.07)");
          return gradient;
        },
        borderWidth: 1,
        borderColor: "#E2433B",
        // stack: "Stack 0",
      },
      {
        fill: true,
        data: data_datasetsA,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const ctx = chart.canvas.getContext("2d");
          const gradient = ctx.createLinearGradient(0, 0, 0, max_datasetsA);
          gradient.addColorStop(0, "rgba(15, 105, 254, 1)");
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
        Risk-Return Comparison
      </div>
      <div className="flex py-2">
        <div className="flex flex-col">
          <div className="font-medium text-sm pt-2 pb-1">
            Debt to Equity History and Analysis
          </div>
          <div className="py-2 grow flex items-center h-[240px]">
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
                AAPL`s debt to equity ratio (154.3%) is considered high.
              </span>
            </div>
          </div>
          <div className="text-sm flex py-1">
            <div>
              <img src={closeRedIcon} className="max-w-none " />
            </div>
            <div className="pl-2">
              <span className="text-[#E2433B] pr-1">Reducing Debt: </span>
              AAPL`s debt to equity ratio has increased from 49.4% to 154.3%
              over the past 5 years.
            </div>
          </div>
          <div className="text-sm flex py-1">
            <div>
              <img src={checkGreenIcon} />
            </div>
            <div className="pl-2 flex items-center">
              <span className="text-[#2EBD85]">Debt Coverage: </span>
              <span className="pl-1">
                AAPL`s debt is well covered by operating cash flow (87%).
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancialHealthChart;
