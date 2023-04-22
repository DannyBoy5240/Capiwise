import { FC } from "react";

import { useState, useEffect } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  CartesianScaleTypeRegistry,
} from "chart.js";
import { Line } from "react-chartjs-2";

interface SummaryChartProps {
  viewMode: number;
  isFullScreen: boolean;
  code: string;
}

type positionType = "left" | "center" | "top" | "right" | "bottom" | undefined;

const SummaryChart: FC<SummaryChartProps> = ({
  viewMode,
  isFullScreen,
  code,
}) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const pattern = {
    draw: function (ctx: any) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(10, 10);
      ctx.stroke();
    },
  };

  const tickCount = 4; // total Ticks Count

  const options = {
    backgroundColor: "red",
    responsive: true,
    plugins: {
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
      legend: {
        display: false,
        // position: "top" as const,
        // usePointStyle: true,
        // pointStyle: "circle",
      },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 6,
          color: "white",
        },
        grid: {
          lineWidth: 0.6,
          color: "transparent",
        },
      },
      y: {
        position: "right" as positionType,
        ticks: {
          color: "white",
          maxTicksLimit: 6,
          // beginAtZero: true,
          // stepSize: 0.01,
          callback: function (value: any, index: any, ticks: any) {
            //   if (index % 100 == 0 || index == ticks.length - 1 || index == 0) {
            //     console.log("value -> ", value, index, ticks);
            //     // inefficient, fails with duplicate distances
            //     // for (const s of Object.values(Map)) {
            //     //   if (s.distance === value) {
            //     //     return "s.label";
            //     //   }
            //     // }
            //     return value;
            //   } else return "";
            return value.toFixed(2);
          },
        },
        grid: {
          color: function (context: any) {
            console.log("context", context.tick.value);
            if (context.index == 5) {
              return "#FFFFFF";
            } else {
              return "#00000000";
            }
          },
        },
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
    layout: {
      padding: {
        top: 10,
        right: 10,
        bottom: 10,
        left: 10,
      },
    },
  };

  const [labels, setLabels] = useState<string[]>([]);
  const [data_datasets, setData_Datasets] = useState<number[]>([]);
  const [bgcolor, setbgColor] = useState<string[]>([]);
  const [posCount, setPosCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const data = {
    labels,
    datasets: [
      {
        data: data_datasets,
        borderColor: "#FFFFFF",
        backgroundColor: "#FFFFFF00",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const getETFHistoryData = async () => {
    setIsLoading(true);

    const fetchURL =
      "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/stockHistoricalData?ticker=" +
      code +
      ".US&period=";

    let fperiod = "1w";
    if (viewMode == 1) fperiod = "1d";
    else if (viewMode == 2) fperiod = "1w";
    else if (viewMode == 3) fperiod = "1m";
    else if (viewMode == 4) fperiod = "6m";
    else if (viewMode == 5) fperiod = "1y";
    else if (viewMode == 6) fperiod = "5y";
    else fperiod = "5y";

    const response = await fetch(fetchURL + fperiod);
    const jsonData = await response.json();
    // jsonData.reverse();

    const count = jsonData.length;
    setPosCount(count);

    // ChartJS information initialize
    const nums: number[] = new Array(count);
    for (let i = 0; i < count; i++) nums[i] = Number(jsonData[i].open);
    setData_Datasets(nums);
    const tlabels: string[] = new Array(count);
    for (let i = 0; i < count; i++) {
      const date = new Date(
        viewMode >= 1 && viewMode <= 4 ? jsonData[i].datetime : jsonData[i].date
      );
      if (viewMode > 1) {
        tlabels[i] = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
      } else {
        tlabels[i] = `${date.getHours().toString().padStart(2, "0")}:${date
          .getMinutes()
          .toString()
          .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
      }
    }
    tlabels[0] = "";
    setLabels(tlabels);

    setIsLoading(false);
  };

  useEffect(() => {
    getETFHistoryData();
  }, [viewMode]);

  return isLoading == false ? (
    <Line
      options={options}
      data={data}
      className={isFullScreen ? "" : "stripes"}
      id="chart_id"
    />
  ) : (
    <div className="loading-progress">
      <div className="spinner"></div>
      <div className="text">Loading...</div>
    </div>
  );
};

export default SummaryChart;
