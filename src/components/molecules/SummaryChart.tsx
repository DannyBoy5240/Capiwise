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
} from "chart.js";
import { Line } from "react-chartjs-2";

import annotationPlugin from "chartjs-plugin-annotation";

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
    Legend,
    annotationPlugin
  );

  const [labels, setLabels] = useState<string[]>([]);
  const [data_datasets, setData_Datasets] = useState<number[]>([]);
  const [bgcolor, setbgColor] = useState<string[]>([]);
  const [posCount, setPosCount] = useState(0);

  const [isLoading, setIsLoading] = useState(true);

  const [chartMin, setChartMin] = useState(0);
  const [chartMax, setChartMax] = useState(0);
  const [fairPrice, setFairPrice] = useState(0);

  const pattern = {
    draw: function (ctx: any) {
      ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(10, 10);
      ctx.stroke();
    },
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
      annotation: {
        annotations: [
          {
            id: "a-line-1",
            type: "line" as const, // important, otherwise typescript complains
            mode: "horizontal",
            scaleID: "y",
            value: fairPrice,
            borderColor: "#2EBD85",
            borderWidth: 1,
            borderDash: [5, 5],
            label: {
              display: true,
              content: fairPrice.toString(),
              backgroundColor: "#2EBD85",
              color: "white",
              xAdjust: 0,
              // yAdjust: -15,
            },
          },
          {
            id: "a-line-2",
            type: "line" as const, // important, otherwise typescript complains
            mode: "horizontal",
            scaleID: "y",
            value: (fairPrice * 4) / 5,
            borderColor: "#F1B90B",
            borderWidth: 1,
            borderDash: [5, 5],
            label: {
              display: true,
              content: ((fairPrice * 4) / 5).toString(),
              backgroundColor: "#F1B90B",
              color: "white",
              xAdjust: 120,
            },
          },
        ],
      },
    },
    scales: {
      x: {
        ticks: {
          color: "white",
          maxTicksLimit: 6,
        },
        grid: {
          lineWidth: 0.6,
          color: "black",
        },
      },
      y: {
        position: "right" as positionType,
        suggestedMin: chartMin,
        suggestedMax: chartMax,
        ticks: {
          maxTicksLimit: 6,
          color: "white",
          callback: function (value: any, index: any, ticks: any) {
            return value.toFixed(2);
          },
        },
        grid: {
          color: function (context: any) {
            return "black";
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

  const data = {
    labels,
    datasets: [
      {
        label: "Hello",
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

    let count = 0;
    fetch(fetchURL + fperiod)
      .then((response) => response.json())
      .then((data) => {
        const count = data.length;
        setPosCount(count);

        // ChartJS information initialize
        const nums: number[] = new Array(count);
        let chart_min = 0,
          chart_max = 0;
        if (count > 0) chart_min = chart_max = data[0].open.toFixed(2);
        for (let i = 0; i < count; i++) {
          if (chart_min > data[i].open.toFixed(2))
            chart_min = data[i].open.toFixed(2);
          if (chart_max < data[i].open.toFixed(2))
            chart_max = data[i].open.toFixed(2);
          nums[i] = data[i].open;
        }
        setChartMin(chart_min);
        setChartMax(chart_max);
        setData_Datasets(nums);

        const tlabels: string[] = new Array(count);
        for (let i = 0; i < count; i++) {
          const date = new Date(
            viewMode >= 1 && viewMode <= 4 ? data[i].datetime : data[i].date
          );
          if (viewMode > 1) {
            tlabels[i] = `${date.getFullYear()}-${(date.getMonth() + 1)
              .toString()
              .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
          } else {
            tlabels[i] = `${date.getHours().toString().padStart(2, "0")}:${date
              .getMinutes()
              .toString()
              .padStart(2, "0")}:${date
              .getSeconds()
              .toString()
              .padStart(2, "0")}`;
          }
        }
        if (count > 0) tlabels[0] = "";
        setLabels(tlabels);

        const stockSummaryURL =
          "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/stockSummary?ticker=" +
          code +
          ".US";

        fetch(stockSummaryURL)
          .then((response) => response.json())
          .then((data) => {
            if (data && data["Valuation::FairPrice"]) {
              const fair_price = data["Valuation::FairPrice"].toFixed(2);
              const fair_price_temp = (fair_price * 4) / 5;
              setChartMin(
                chart_min > fair_price_temp ? fair_price_temp : chart_min
              );
              setChartMax(chart_max < fair_price ? fair_price : chart_max);
              setFairPrice(fair_price);
            }
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));

    setIsLoading(false);
  };

  useEffect(() => {
    getETFHistoryData();
  }, [viewMode]);

  return isLoading == false ? (
    <Line
      id="chart_id"
      data={data}
      options={options}
      className={isFullScreen ? "" : "stripes"}
    />
  ) : (
    <div className="loading-progress">
      <div className="spinner"></div>
      <div className="text">Loading...</div>
    </div>
  );
};

export default SummaryChart;
