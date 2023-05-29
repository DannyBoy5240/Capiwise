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

import checkGreenIcon from "../../../assets/check_green_ico.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const FeeChart = () => {
  const labels = ["Category average", "QQQ"];

  function generateRandom() {
    const myArray: number[] = [];
    labels.map((idx) => {
      myArray.push(Math.floor(Math.random() * 3000));
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
          maxTicksLimit: 3,
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
        backgroundColor: "#E2433B",
        // stack: "Stack 0",
      },
      {
        data: generateRandom(),
        backgroundColor: "#2EBD85",
        // stack: "Stack 1",
      },
    ],
  };

  return (
    <div className="bg-[#0B1620] flex flex-col p-4 h-full">
      <div className="border-b-2 border-b-[#252A2D] py-2 text-base font-bold">
        Fees
      </div>
      <div className="grow flex py-2">
        <div className="w-1/2 flex flex-col pr-2 border-r-2 border-r-[#252A2D] text-xs">
          <div className="font-bold text-sm pt-2 pb-4 border-b border-b-[#979797]">
            Expense Ratio
          </div>
          <div className="flex justify-between py-2 items-center border-b border-b-[#252A2D]">
            <div>
              Invesco <span className="font-bold">QQQ</span> Trust
            </div>
            <div className="text-sm font-bold">0.20%</div>
          </div>
          <div className="flex justify-between py-2 items-center border-b border-b-[#252A2D]">
            <div>Average expense ratio of similar funds</div>
            <div className="text-sm font-bold">1.08%</div>
          </div>
          <div className="py-3">
            <div>Fees on $10,000 invested over 10 years</div>
            <div className="text-[#979797]">As of 02/28/2021</div>
          </div>
          <div className="py-2 grow flex flex-col items-center">
            <div className="h-full">
              <Bar options={options} data={data} />
            </div>
          </div>
        </div>
        <div className="w-1/2 pl-2 text-xs">
          <div className="text-[#979797] pt-2 pb-1">
            <span className="text-white text-sm">Net Expenses Ratio</span>
          </div>
          <div className="py-2 relative w-full h-[80px]">
            <div className="absolute bottom-0 w-full">
              <div className="relative py-2">
                <div
                  className="absolute bottom-12 border border-white bg-black py-1 px-2 rounded-full"
                  style={{ left: "20px" }}
                >
                  <span className="text-[#979797]">QQQ </span>
                  <span className="text-white">0,20%</span>
                </div>
                <div
                  className="absolute h-10 bottom-2 border-l border-l-white"
                  style={{ left: "60px" }}
                ></div>
                <div className="netexpensesratio-progress w-full"></div>
                <div className="flex absolute inset-0 w-full text-[#A1A9B6]">
                  <div className="mt-1 h-5 border-l border-l-[#4B4D4C]"></div>
                  {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((idx) => (
                    <div
                      className="grow top-[8px] last:top-[3px] h-2.5 last:h-5 relative border-r border-r-[#4B4D4C] z-[2]"
                      key={idx}
                    >
                      <div
                        className={
                          "absolute left-[-8px] " +
                          (idx == 9 ? "bottom-[-12px]" : "bottom-[-16px]")
                        }
                      >
                        {idx != 0 && idx != 10 ? "0," + idx : ""}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="py-3 flex">
            <div>
              <img src={checkGreenIcon} className="max-w-none" />
            </div>
            <div className="text-xs text-white pl-2">
              <span className="font-bold text-[#2EBD85]">NE Ratio: </span>QQQ it
              have a fair expenses rate based on NER (O.20%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeChart;
