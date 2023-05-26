import { FC } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import { useLocation, useNavigate } from "react-router-dom";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EarningsChart = () => {
  const labels = ["Q3 2020", "Q4 2020", "Q1 2021", "Q2 2021"];

  function generateRandom() {
    const myArray: number[] = [];
    labels.map((idx) => {
      myArray.push(Math.floor(Math.random() * 5));
    });
    return myArray;
  }

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Earning Chart",
      },
    },
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        grid: {
          lineWidth: 0.6,
          color: "#E7EBEF23",
        },
        ticks: {
          callback: function (value: any, index: any, values: any) {
            // Append your subtext here
            return `$${value}`;
          },
        },
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        data: generateRandom(),
        backgroundColor: "#B8B9BB",
        stack: "Stack 0",
      },
      {
        data: generateRandom(),
        backgroundColor: "#0F69FE",
        stack: "Stack 1",
      },
    ],
  };

  return (
    <div className="bg-[#0B1620] p-4 h-full">
      <div className="border-b-2 border-b-[#252A2D] py-2 text-base font-bold">
        Performance
      </div>
      <div className="flex py-2">
        <div className="grow flex flex-col pr-2 border-r-2 border-r-[#252A2D]">
          <div className="font-medium text-sm pt-2 pb-1">
            Average Annual Returns
          </div>
          <div className="text-[#979797] text-xs">AS OF 03/31/2021</div>
          <div className="py-2 grow flex items-center">
            <Bar options={options} data={data} />
          </div>
          <div className="flex justify-end">
            <div className="flex text-sm">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#B8B9BB]"></div>
                <div className="pl-2">QQQ</div>
              </div>
              <div className="flex items-center p-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0F69FE]"></div>
                <div className="pl-2">NASDAQ 100 TR USD</div>
              </div>
            </div>
          </div>
          <div className="text-xs">
            <span className="font-bold">Expected Report Date</span> 04/28/2021
          </div>
        </div>
        <div className="grow pl-2 text-xs">
          <div className="text-[#979797] pt-2 pb-1">
            <span className="text-white text-sm">How is it performing?</span>
          </div>
          <div className="text-[#979797]">QQQ vs. Index</div>
          <div className="text-sm text-white font-bold">
            <div className="flex border-b-2 border-b-white">
              <div className="w-2/3 flex justify-end">QQQ</div>
              <div className="w-1/3 flex text-right">NASDAQ 100 R USD</div>
            </div>
            <div className="flex border-b-[0.6px] border-b-[#252A2D] py-2">
              <div className="w-1/3 text-left">1 Year</div>
              <div className="w-1/3 text-right">+68.66%</div>
              <div className="w-1/3 text-right">+68.88%</div>
            </div>
            <div className="flex border-b-[0.6px] border-b-[#252A2D] py-2">
              <div className="w-1/3 text-left">3 Year</div>
              <div className="w-1/3 text-right">+26.83%</div>
              <div className="w-1/3 text-right">+27.01%</div>
            </div>
            <div className="flex border-b-[0.6px] border-b-[#252A2D] py-2">
              <div className="w-1/3 text-left">5 Year</div>
              <div className="w-1/3 text-right">+24.97%</div>
              <div className="w-1/3 text-right">+25.22%</div>
            </div>
            <div className="flex items-center border-b-[0.6px] border-b-[#252A2D] py-2">
              <div className="w-1/3 text-left">10 Year</div>
              <div className="w-1/3 text-right text-[#2EBD85]">+19.92%</div>
              <div className="w-1/3 text-right text-[#2EBD85]">+20.18%</div>
            </div>
            <div className="flex items-center border-b-[0.6px] border-b-[#252A2D] py-2">
              <div className="w-1/3 text-left">Life</div>
              <div className="w-1/3 text-right text-[#2EBD85]">+34.67%</div>
              <div className="w-1/3 text-right text-[#2EBD85]">+38.72%</div>
            </div>
          </div>
          <div className="text-[#979797] text-[10px]">As of 02/28/2023</div>
        </div>
      </div>
    </div>
  );
};

export default EarningsChart;
