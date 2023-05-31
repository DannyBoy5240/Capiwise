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

const FundAnalysisChart = () => {
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
  const [max_datasets, setMax_Datasets] = useState(0);

  const generateRandom = () => {
    const myArray: number[] = [];
    const myArrayC: number[] = [];

    const loopArray: number[] = Array(totalCount).fill(0);
    loopArray.map((idx) => {
      myArray.push(Math.floor(Math.random() * 400));
      myArrayC.push(Math.floor(Math.random() * 10 + 2013));
    });
    myArrayC.sort((a, b) => a - b);

    setData_Datasets(myArray);
    setData_Labels(myArrayC.map(String));
    setMax_Datasets(Math.max(...myArray));
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
          maxTicksLimit: 5,
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
        borderWidth: 1,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const ctx = chart.canvas.getContext("2d");
          const gradient = ctx.createLinearGradient(0, 0, 0, max_datasets / 2);
          gradient.addColorStop(0, "rgba(28, 166, 94, 0.89)");
          gradient.addColorStop(1, "rgba(28, 166, 94, 0)");
          return gradient;
        },
        borderColor: "#2EBD85",
        // stack: "Stack 0",
      },
    ],
  };

  useEffect(() => {
    generateRandom();
  }, []);

  return (
    <div className="bg-[#0B1620] p-4 w-full h-full flex flex-col">
      <div className="border-b-2 border-b-[#252A2D] py-2 text-base font-bold">
        Fund Analysis
      </div>
      <div className="grow flex py-2">
        <div className="flex flex-col w-full">
          <div className="font-medium text-sm pt-2 pb-1">
            Net Flows to Net Assets History and Analysis
          </div>
          <div className="text-[10px] text-[#979797]">AS OF 03/31/2023</div>
          <div className="py-2 grow flex items-center h-[240px]">
            <Line options={options} data={data} />
          </div>
          {/* Comments */}
          <div className="py-2 text-xs text-white">
            <div className="py-1 flex items-center">
              <div>
                <img src={checkGreenIcon} className="max-w-none" />
              </div>
              <div className="pl-2">
                <span className="text-[#2EBD85] font-bold">Net Assets: </span>
                QQQ`s current net assets margins (320.66B) are higher than last
                year (40.9%).
              </div>
            </div>
            <div className="py-1 flex items-center">
              <div>
                <img src={checkGreenIcon} className="max-w-none" />
              </div>
              <div className="pl-2">
                <span className="text-[#2EBD85] font-bold">Net Flows: </span>
                QQQ`s current net flows margins (18.65B) are higher than last
                year (7.5%).
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundAnalysisChart;
