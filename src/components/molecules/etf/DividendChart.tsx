import { FC, useState, useEffect, useRef } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line, Doughnut } from "react-chartjs-2";

import { useLocation, useNavigate } from "react-router-dom";

import checkGreenIcon from "../../../assets/check_green_ico.svg";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const labels = ["2019", "2020", "2021", "2022", "2023"];

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

export const options1 = {
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Earning Chart",
    },
    plugins: {
      datalabels: {
        color: "#000000",
        anchor: "end",
        align: "center",
        offset: 0,
        font: {
          size: "16",
        },
        formatter: function (value: any, context: any) {
          return context.chart.data.labels[context.dataIndex];
        },
      },
    },
  },
  responsive: true,
};

export const data1 = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [24, 76],
      backgroundColor: ["rgba(46, 189, 133)", "rgba(184, 185, 187)"],
      borderWidth: 0,
    },
  ],
};

export const options2 = {
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
};

export const data2 = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
  datasets: [
    {
      label: "# of Votes",
      data: [22, 78],
      backgroundColor: ["rgba(46, 189, 133)", "rgba(184, 185, 187)"],
      borderWidth: 0,
    },
  ],
};

const DividendChart = () => {
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
      myArray.push(Math.floor(Math.random() * 10));
      myArrayA.push(Math.floor(Math.random() * 10));
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
            return `${value}%`;
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
          gradient.addColorStop(1, "rgba(28, 166, 94, 0.1)");
          return gradient;
        },
        borderWidth: 1,
        borderColor: "#2EBD85",
        // stack: "Stack 0",
      },
      {
        data: data_datasetsA,
        fill: true,
        backgroundColor: (context: any) => {
          const chart = context.chart;
          const ctx = chart.canvas.getContext("2d");
          const gradient = ctx.createLinearGradient(0, 0, 0, max_datasetsA);
          gradient.addColorStop(0, "rgba(184, 185, 187, 0.78)");
          gradient.addColorStop(1, "rgba(184, 185, 187, 0.1)");
          return gradient;
        },
        borderWidth: 1,
        borderColor: "#B8B9BB",
        // stack: "Stack 1",
      },
    ],
  };

  useEffect(() => {
    generateRandom();
  }, []);

  return (
    <div className="bg-[#0B1620] flex flex-col p-4 h-full">
      <div className="border-b-2 border-b-[#252A2D] py-2 text-base font-bold">
        Dividend
      </div>
      {/* Dividend Header */}
      <div className="flex text-sm border-b-2 border-b-[#252A2D]">
        <div className="w-1/3 my-2">
          <div className="text-[#979797]">Dividend Amount (Recent)</div>
          <div className="font-bold">$0.21</div>
        </div>
        <div className="w-1/3 px-2 border-l border-r border-l-[#252A2D] border-r-[#252A2D] my-2">
          <div className="text-[#979797]">Pay Date</div>
          <div className="font-bold">02/11/2022</div>
        </div>
        <div className="w-1/3 pl-2 my-2">
          <div className="text-[#979797]">Dividend Frequency</div>
          <div className="font-bold">Quarterly</div>
        </div>
      </div>
      <div className="grow flex py-2">
        <div className="w-1/3 text-sm text-white">
          <div className="text-white py-2">Strength Dividend Yield</div>
          <div className="py-2">
            <div className="py-3 font-medium">AAPL</div>
            <div className="flex w-full items-center">
              <div
                style={{
                  width: "6.2%",
                  height: "26px",
                  background: "#0F69FE",
                }}
              ></div>
              <div className="text-[28px] pl-2">0.62%</div>
            </div>
            <div className="py-2 text-xs text-[#979797]">Ann. Div. / Yield</div>
          </div>
          <div className="py-2">
            <div className="py-3 font-medium">Market Average</div>
            <div className="flex w-full items-center">
              <div
                style={{
                  width: "23%",
                  height: "26px",
                  background: "#B8B9BB",
                }}
              ></div>
              <div className="text-[28px] pl-2">2.38%</div>
            </div>
            <div className="py-2 text-xs text-[#979797]">Ann. Div. / Yield</div>
          </div>
        </div>
        <div className="w-1/3 px-2 border-l border-r border-l-[#252A2D] border-r-[#252A2D]">
          <div className="py-2">
            <div>Sustainability</div>
            <div className="text-xs text-[#979797]">Dividend Payout Ratio</div>
          </div>
          <div className="py-3 flex">
            <div className="relative w-1/2 pr-2">
              <Doughnut options={options1} data={data1} />
              <div className="text-xs text-center pt-2 pb-1">
                Last Year Payout
              </div>
              <div className="text-[10px] text-center text-[#979797]">
                (12 Months)
              </div>
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  top: "50%",
                  left: 0,
                  textAlign: "center",
                  marginTop: "-36px",
                  lineHeight: "20px",
                }}
                className="pr-2"
              >
                <span>24%</span>
              </div>
            </div>
            <div className="relative w-1/2 pl-2">
              <Doughnut options={options1} data={data1} />
              <div className="text-xs text-center pt-2 pb-1">
                Current Payout
              </div>
              <div className="text-[10px] text-center text-[#979797]">
                (12 Months)
              </div>
              <div
                style={{
                  position: "absolute",
                  width: "100%",
                  top: "50%",
                  left: 0,
                  textAlign: "center",
                  marginTop: "-36px",
                  lineHeight: "20px",
                }}
                className="pl-2"
              >
                22%
              </div>
            </div>
          </div>
          <div className="py-2 text-xs">
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#2EBD85]"></div>
              <div className="px-2">Paid as dividend</div>
            </div>
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#B8B9BB]"></div>
              <div className="px-2">Earnings retained</div>
            </div>
          </div>
        </div>
        <div className="w-1/3 pl-2">
          <div className="py-2">
            <div>Growth of Dividend</div>
            <div className="text-xs text-[#979797]">
              Annualized Dividend (YoY % chg.)
            </div>
          </div>
          <div className="py-2">
            <Line options={options} data={data} />
          </div>
          <div className="py-2 text-xs">
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#0F69FE]"></div>
              <div className="px-2">AAPL</div>
            </div>
            <div className="flex items-center">
              <div className="w-2.5 h-2.5 rounded-full bg-[#B8B9BB]"></div>
              <div className="px-2">Market Average</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DividendChart;
