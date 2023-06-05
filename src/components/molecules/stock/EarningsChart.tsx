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

interface EarningsChartProps {
  context: any;
}

const EarningsChart: FC<EarningsChartProps> = ({ context }) => {
  const labels = ["Q3 2020", "Q4 2020", "Q1 2021", "Q2 2021"];

  function generateRandom() {
    const myArray: number[] = [];
    labels.map((idx) => {
      myArray.push(Math.floor(Math.random() * 5));
    });
    return myArray;
  }

  let maxDataSetsA = 0;
  let maxDataSetsB = 0;

  const convertDateFormat = (dateString: any) => {
    const date = new Date(dateString);
    const quarter = Math.floor((date.getMonth() + 3) / 3); // get the quarter (1-4) based on the month
    const year = date.getFullYear(); // get the year
    const quarterStr = `Q${quarter} ${year}`; // concatenate the quarter and year into the desired format
    return quarterStr;
  };

  const getDataLabels = () => {
    const arr: string[] = [];
    if (context && context.earnings && context.earnings.earningsHisCurrYr) {
      context.earnings.earningsHisCurrYr.map((idx: any) => {
        arr.push(convertDateFormat(idx.date));
      });
      arr.reverse();
    }
    return arr;
  };
  const getDataSetsA = () => {
    const arr: number[] = [];
    if (context && context.earnings && context.earnings.earningsHisCurrYr) {
      let tmax = 0;
      context.earnings.earningsHisCurrYr.map((idx: any) => {
        arr.push(idx.eps_estimate);
        tmax = tmax < idx.eps_estimate ? idx.eps_estimate : tmax;
      });
      maxDataSetsA = tmax;
      arr.reverse();
    }
    return arr;
  };
  const getDataSetsB = () => {
    const arr: number[] = [];
    if (context && context.earnings && context.earnings.earningsHisCurrYr) {
      let tmax = 0;
      context.earnings.earningsHisCurrYr.map((idx: any) => {
        arr.push(idx.eps_actual);
        tmax = tmax < idx.eps_actual ? idx.eps_actual : tmax;
      });
      maxDataSetsB = tmax;
      arr.reverse();
    }
    return arr;
  };

  const getNumber = (num: any) => {
    if (num > 0) return "+" + num;
    else return num;
  };

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
        // stacked: true,
      },
      y: {
        // stacked: true,
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
    labels: getDataLabels(),
    datasets: [
      {
        data: getDataSetsA(),
        backgroundColor: "#B8B9BB",
        // stack: "Stack 0",
      },
      {
        data: getDataSetsB(),
        backgroundColor: "#0F69FE",
        // stack: "Stack 1",
      },
    ],
  };

  return (
    <div className="bg-[#0B1620] p-4 h-full">
      <div className="border-b-2 border-b-[#252A2D] py-2 text-base font-bold">
        Earnings
      </div>
      <div className="flex py-2">
        <div className="grow flex flex-col pr-2 border-r-2 border-r-[#252A2D]">
          <div className="font-medium text-sm pt-2 pb-1">
            Earnings Per Share
          </div>
          <div className="text-[#979797] text-xs">
            I/B/E/S Consensus Estimates vs Adjusted Actuals
          </div>
          <div className="py-2 grow flex items-center">
            <Bar options={options} data={data} />
          </div>
          <div className="flex justify-end">
            <div className="flex text-sm">
              <div className="flex items-center">
                <div className="w-2.5 h-2.5 rounded-full bg-[#B8B9BB]"></div>
                <div className="pl-2">Estimation</div>
              </div>
              <div className="flex items-center p-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0F69FE]"></div>
                <div className="pl-2">Actual</div>
              </div>
            </div>
          </div>
          <div className="text-xs">
            <span className="font-bold">Expected Report Date</span> N/A
          </div>
        </div>
        <div className="grow pl-2 text-xs">
          <div className="text-[#979797] pt-2 pb-1">
            <span className="text-white text-sm">Earnings Metrics</span> GAAP
          </div>
          <div className="text-[#979797]">
            vs. Industry: Technology Hardware, Storage & Periphera
          </div>
          <div className="text-sm text-white font-bold">
            <div className="flex border-b-2 border-b-white">
              <div className="w-2/3 flex justify-end">
                {context && context["profile"]
                  ? context["profile"]["symbol"]
                  : "N/A"}
              </div>
              <div className="w-1/3 flex text-right">Industry Average</div>
            </div>
            <div className="flex border-b-[0.6px] border-b-[#252A2D] py-2">
              <div className="w-1/3 text-left">
                EPS<span className="font-normal text-xs">(TTM)</span>
              </div>
              <div className="w-1/3 text-right">
                $
                {context && context["earnings"]
                  ? parseFloat(context["earnings"]["eps"]).toFixed(2)
                  : "N/A"}
              </div>
              <div className="w-1/3 text-right">$3.53</div>
            </div>
            <div className="flex border-b-[0.6px] border-b-[#252A2D] py-2">
              <div className="w-1/3 text-left">
                P/E<span className="font-normal text-xs">(TTM)</span>
              </div>
              <div className="w-1/3 text-right">
                {context && context["earnings"]
                  ? parseFloat(context["earnings"]["peRatio"]).toFixed(2)
                  : "N/A"}
              </div>
              <div className="w-1/3 text-right">35.18</div>
            </div>
            <div className="flex border-b-[0.6px] border-b-[#252A2D] py-2">
              <div className="w-1/3 text-left">
                P/E<span className="font-normal text-xs">(5-Year Avg)</span>
              </div>
              <div className="w-1/3 text-right">
                {context && context["earnings"]
                  ? parseFloat(context["earnings"]["pegRatio"]).toFixed(2)
                  : "N/A"}
              </div>
              <div className="w-1/3 text-right">19.96</div>
            </div>
            <div className="flex items-center border-b-[0.6px] border-b-[#252A2D] py-2">
              <div className="w-1/3 text-left">
                <div>EPS Growth</div>
                <div className="font-normal text-xs">(TTM vs Prior TTM)</div>
              </div>
              <div
                className={
                  "w-1/3 text-right " +
                  (context &&
                  context["earnings"] &&
                  context["earnings"]["epsGrowthTTM"] >= 0
                    ? "text-[#2EBD85]"
                    : "text-[#E2433B]")
                }
              >
                {context && context["earnings"]
                  ? getNumber(context["earnings"]["epsGrowthTTM"])
                  : "N/A"}
                %
              </div>
              <div className="w-1/3 text-right text-[#2EBD85]">+12.28%</div>
            </div>
            <div className="flex items-center border-b-[0.6px] border-b-[#252A2D] py-2">
              <div className="w-1/3 text-left">
                <div>EPS Growth</div>
                <div className="font-normal text-xs">
                  (Last Qtr vs Same Qtr Prior Year)
                </div>
              </div>
              <div
                className={
                  "w-1/3 text-right " +
                  (context &&
                  context["earnings"] &&
                  context["earnings"]["epsGrowthQrt"] >= 0
                    ? "text-[#2EBD85]"
                    : "text-[#E2433B]")
                }
              >
                {context && context["earnings"]
                  ? getNumber(context["earnings"]["epsGrowthQrt"])
                  : "N/A"}
                %
              </div>
              <div className="w-1/3 text-right text-[#2EBD85]">+38.72%</div>
            </div>
          </div>
          <div className="text-[#979797] text-[10px]">As of N/A</div>
        </div>
      </div>
    </div>
  );
};

export default EarningsChart;
