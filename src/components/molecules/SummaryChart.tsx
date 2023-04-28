import { FC } from "react";

import { useState, useEffect, useRef } from "react";

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

  const chartRef = useRef(null);
  const fairARef = useRef(null);

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
              display: false,
              content: parseFloat(fairPrice.toString()).toFixed(2),
              backgroundColor: "#2EBD85",
              color: "white",
              xAdjust: -50,
              yAdjust: -10,
              xScaleID: "x-axis-0",
              yScaleID: "y-axis-0",
            },
          },
          {
            id: "a-line-2",
            type: "line" as const, // important, otherwise typescript complains
            mode: "horizontal",
            scaleID: "y",
            value: ((parseFloat(fairPrice.toString()) * 4) / 5).toFixed(2),
            borderColor: "#F1B90B",
            borderWidth: 1,
            borderDash: [5, 5],
            label: {
              display: false,
              content: ((fairPrice * 4) / 5).toString(),
              backgroundColor: "#F1B90B",
              color: "white",
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
          // color: "black",
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
              const fair_price = parseFloat(
                data["Valuation::FairPrice"].toFixed(2)
              );
              const fair_price_temp = (fair_price * 4) / 5;

              chart_min =
                chart_min > fair_price_temp ? fair_price_temp : chart_min;
              setChartMin(chart_min);
              chart_max = chart_max < fair_price ? fair_price : chart_max;
              setChartMax(chart_max);
              setFairPrice(fair_price);

              // update custom fair line position
              if (chartRef.current) {
                const width = chartRef.current["width"];
                const height = chartRef.current["height"];

                const deltaY = chart_max - chart_min;
                const offsetX = width - 40;

                let offsetY = ((fair_price - chart_min) / deltaY) * height + 60;
                const fairA = document.getElementById("fair1_id");
                if (fairA) {
                  fairA.style.display = "flex";
                  fairA.style.position = "relative";
                  fairA.style.left = offsetX + "px";
                  fairA.style.bottom = offsetY + "px";
                  fairA.innerHTML =
                    fair_price.toString() +
                    "<div style='position: absolute;  left: -15px; top: -1px; width: 0px; height: 0px; border-top: 15px solid transparent; border-right: 15px solid #2EBD85; border-bottom: 15px solid transparent;'></div>";
                }

                offsetY =
                  ((fair_price_temp - chart_min) / deltaY) * height + 60;
                const fairB = document.getElementById("fair2_id");
                if (fairB) {
                  fairB.style.display = "flex";
                  fairB.style.position = "relative";
                  fairB.style.left = offsetX + "px";
                  fairB.style.bottom = offsetY + "px";
                  fairB.innerHTML =
                    fair_price_temp.toString() +
                    "<div style='position: absolute;  left: -15px; top: -1px; width: 0px; height: 0px; border-top: 15px solid transparent; border-right: 15px solid #FFFFFF; border-bottom: 15px solid transparent;'></div>";
                }
              }
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

  return (
    <>
      {isLoading == false ? (
        <Line
          id="chart_id"
          ref={chartRef}
          data={data}
          options={options}
          className={isFullScreen ? "" : "stripes"}
        />
      ) : (
        <div className="loading-progress">
          <div className="spinner"></div>
          <div className="text">Loading...</div>
        </div>
      )}
      <div
        id="fair1_id"
        className="bg-[#2EBD85] px-2 py-1 w-[50px] text-sm"
        style={{ display: "none" }}
      >
        N/A
      </div>
      <div
        id="fair2_id"
        className="bg-[white] px-2 py-1 w-[50px] text-sm text-black"
        style={{ display: "none" }}
      >
        N/A
      </div>
    </>
  );
};

export default SummaryChart;
