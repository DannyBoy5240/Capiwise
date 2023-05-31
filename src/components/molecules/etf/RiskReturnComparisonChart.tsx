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

const RiskReturnComparisonChart = () => {
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
  const [data_datasetsB, setData_DatasetsB] = useState<number[]>([]);

  const generateRandom = () => {
    const myArray: number[] = [];
    const myArrayA: number[] = [];
    const myArrayB: number[] = [];
    const myArrayC: number[] = [];

    const loopArray: number[] = Array(totalCount).fill(0);
    loopArray.map((idx) => {
      myArray.push(Math.floor(Math.random() * 70));
      myArrayA.push(Math.floor(Math.random() * 70));
      myArrayB.push(Math.floor(Math.random() * 70));
      myArrayC.push(Math.floor(Math.random() * 10 + 2024));
    });
    myArrayC.sort((a, b) => a - b);

    setData_Datasets(myArray);
    setData_DatasetsA(myArrayA);
    setData_DatasetsB(myArrayB);
    setData_Labels(myArrayC.map(String));
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
            return `${value}k`;
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
        borderWidth: 1,
        borderColor: "#F1B90B",
        // stack: "Stack 0",
      },
      {
        fill: true,
        data: data_datasetsA,
        borderWidth: 1,
        borderColor: "#F35530",
        // stack: "Stack 1",
      },
      {
        fill: true,
        data: data_datasetsB,
        borderWidth: 1,
        borderColor: "#2EBD85",
        // stack: "Stack 1",
      },
    ],
  };

  useEffect(() => {
    generateRandom();
  }, []);

  return (
    <div className="bg-[#0B1620] p-4 h-full flex flex-col">
      <div className="border-b-2 border-b-[#252A2D] py-2 text-base font-bold">
        Risk-Return Comparison
      </div>
      <div className="grow flex py-2">
        <div className="flex flex-col w-full">
          <div className="font-medium text-sm pt-2 pb-1">
            10 Years Comparison
          </div>
          <div className="text-[10px] text-[#979797]">AS OF 02/28/2023</div>
          <div className="py-2 grow flex items-center h-[240px]">
            <Line options={options} data={data} />
          </div>
          {/* Comments */}
          <div className="border-t border-t-[#252A2D] flex justify-center">
            <div className="px-4 my-2">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-transparent"></div>
                <div className="text-sm font-bold pl-2 text-transparent">A</div>
              </div>
              <div className="py-[4px] text-[8px] text-[#979797]">Risk</div>
              <div className="py-[4px] text-[8px] text-[#979797]">Return</div>
            </div>
            <div className="px-4 my-2">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#2EBD85]"></div>
                <div className="text-sm font-bold pl-2">QQQ</div>
              </div>
              <div className="text-sm">2.14%</div>
              <div className="text-sm">24.10%</div>
            </div>
            <div className="px-4 my-2 border-l-2 border-l-[#979797] border-r-2 border-[#979797]">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#E2433B]"></div>
                <div className="text-sm font-bold pl-2">Index</div>
              </div>
              <div className="text-sm">4.45%</div>
              <div className="text-sm">17.11%</div>
            </div>
            <div className="px-4 my-2">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#F1B90B]"></div>
                <div className="text-sm font-bold pl-2">Category</div>
              </div>
              <div className="text-sm">3.85%</div>
              <div className="text-sm">15.80%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RiskReturnComparisonChart;
