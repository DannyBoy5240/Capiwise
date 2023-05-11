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

import fullScreenIcon from "../../assets/fullscreen_ico.svg";

interface SummaryChartProps {
  // viewMode: number;
  // isFullScreen: boolean;
  code: string;
}

type positionType = "left" | "center" | "top" | "right" | "bottom" | undefined;

const SummaryChart: FC<SummaryChartProps> = ({
  // viewMode,
  // isFullScreen,
  code,
}) => {
  // Chart View Mode
  const [viewMode, setViewMode] = useState(3);

  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    const obj = document
      ?.getElementById("modeGroup")
      ?.getElementsByTagName("button");
    if (obj && obj[2] && !obj[2].classList.contains("border-b-2")) {
      obj[2].classList.add("border-b-2");
      obj[2].classList.remove("border-b-0");
    }
  }, []);

  const handleToogleScreen = () => {
    console.log("fullscreen mode");
    setIsFullScreen(!isFullScreen);
    updateChartInterface();
  };
  const handleToogleDownScreen = () => {
    console.log("save mode");
    setIsFullScreen(false);
    updateChartInterface();
  };

  const handleViewMode = (event: any, mode: number) => {
    setViewMode(mode);

    // remove all border style in parent element
    const obj = document
      ?.getElementById("modeGroup")
      ?.getElementsByTagName("button");
    for (let i = 0; obj && i < obj.length; i++) {
      obj[i].classList.remove("border-b-2");
      obj[i].classList.add("border-b-0");
    }

    event.target.classList.add("border-b-2");
    event.target.classList.remove("border-b-0");
  };

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
            value: parseFloat(fairPrice.toString()).toFixed(2),
            borderColor: "#2EBD85",
            borderWidth: 1,
            borderDash: [5, 5],
            label: {
              display: true,
              content: parseFloat(fairPrice.toString()).toFixed(2),
              backgroundColor: "#2EBD85",
              color: "white",
              xAdjust: -80,
              // xScaleID: "x-axis-0",
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
              display: true,
              content: parseFloat(
                ((parseFloat(fairPrice.toString()) * 4) / 5).toString()
              ).toFixed(2),
              backgroundColor: "#F1B90B",
              color: "white",
              xAdjust: 80,
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
        label: "Value",
        data: data_datasets,
        borderColor: "#FFFFFF",
        backgroundColor: "#FFFFFF00",
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const changeDateFormat = (date: string) => {
    const dateStr: string = date;
    const dateArr: string[] = dateStr.split("-");
    const formattedDate: string =
      dateArr[2] + "/" + dateArr[1] + "/" + dateArr[0];
    return formattedDate;
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
            tlabels[i] = changeDateFormat(tlabels[i]);
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
                const height = chartRef.current["scales"]["y"]["height"];

                const maxY = chartRef.current["scales"]["y"]["max"];
                const minY = chartRef.current["scales"]["y"]["min"];
                const deltaY = maxY - minY;

                console.log("deltaY -> ", deltaY);

                const offsetX = width - 45;
                const offsetY =
                  (height * (nums[count - 1] - minY)) / deltaY +
                  (chartRef.current["height"] -
                    chartRef.current["chartArea"]["height"]);

                console.log("offsetY ->", offsetY);

                const fairA = document.getElementById("fair1_id");
                if (fairA) {
                  fairA.style.display = "flex";
                  fairA.style.position = "relative";
                  fairA.style.left = offsetX + "px";
                  fairA.style.bottom = offsetY + "px";
                  fairA.innerHTML =
                    parseFloat(nums[count - 1].toString()).toFixed(2) +
                    "<div style='position: absolute;  left: -10px; top: 0px; width: 0px; height: 0px; border-top: 12px solid transparent; border-right: 10px solid white; border-bottom: 12px solid transparent;'></div>";
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
  }, [viewMode, isFullScreen]);

  useEffect(() => {
    console.log("refreshed!!!");
    if (data_datasets.length > 0 && chartRef) updateChartInterface();
  }, [data_datasets, options, chartRef, isFullScreen]);

  const updateChartInterface = () => {
    console.log("updateChartInterface function called!");
    if (chartRef.current) {
      const width = chartRef.current["width"];
      const height = chartRef.current["scales"]["y"]["height"];

      const maxY = chartRef.current["scales"]["y"]["max"];
      const minY = chartRef.current["scales"]["y"]["min"];
      const deltaY = maxY - minY;

      console.log("deltaY -> ", deltaY);

      const offsetX = width - 45;
      const offsetY =
        (height * (data_datasets[posCount - 1] - minY)) / deltaY +
        (chartRef.current["height"] - chartRef.current["chartArea"]["height"]) +
        2;

      console.log("offsetY ->", offsetY);

      const fairA = document.getElementById("fair1_id");
      if (fairA) {
        fairA.style.display = "flex";
        fairA.style.position = "relative";
        fairA.style.left = offsetX + "px";
        fairA.style.bottom = offsetY + "px";
        fairA.innerHTML =
          parseFloat(data_datasets[posCount - 1].toString()).toFixed(2) +
          "<div style='position: absolute;  left: -10px; top: 0px; width: 0px; height: 0px; border-top: 12px solid transparent; border-right: 10px solid white; border-bottom: 12px solid transparent;'></div>";
      }
    }
  };

  return (
    <div
      className={
        isFullScreen ? "full-screen" : "p-6 bg-[#0B1620] w-full md:w-1/2"
      }
    >
      <div className="flex justify-between items-center">
        <div className="text-sm mb-2" id="modeGroup">
          <button
            className="text-white hover:text-[#2EBD85] border-b-0 hover:border-b-2 border-[#2EBD85] py-1 px-1.5 font-bold mx-1.5"
            onClick={(e) => handleViewMode(e, 1)}
          >
            1D
          </button>
          <button
            className="text-white hover:text-[#2EBD85] border-b-0 hover:border-b-2 border-[#2EBD85] py-1 px-1.5 font-bold mx-1.5"
            onClick={(e) => handleViewMode(e, 2)}
          >
            1W
          </button>
          <button
            className="text-white hover:text-[#2EBD85] border-b-0 hover:border-b-2 border-[#2EBD85] py-1 px-1.5 font-bold mx-1.5"
            onClick={(e) => handleViewMode(e, 3)}
          >
            1M
          </button>
          <button
            className="text-white hover:text-[#2EBD85] border-b-0 hover:border-b-2 border-[#2EBD85] py-1 px-1.5 font-bold mx-1.5"
            onClick={(e) => handleViewMode(e, 4)}
          >
            6M
          </button>
          <button
            className="text-white hover:text-[#2EBD85] border-b-0 hover:border-b-2 border-[#2EBD85] py-1 px-1.5 font-bold mx-1.5"
            onClick={(e) => handleViewMode(e, 5)}
          >
            1Y
          </button>
          <button
            className="text-white hover:text-[#2EBD85] border-b-0 hover:border-b-2 border-[#2EBD85] py-1 px-1.5 font-bold mx-1.5"
            onClick={(e) => handleViewMode(e, 6)}
          >
            5Y
          </button>
          <button
            className="text-white hover:text-[#2EBD85] border-b-0 hover:border-b-2 border-[#2EBD85] py-1 px-1.5 font-bold mx-1.5"
            onClick={(e) => handleViewMode(e, 7)}
          >
            MAX
          </button>
        </div>
        <div className="flex" onClick={() => handleToogleScreen()}>
          <div>
            <img src={fullScreenIcon} />
          </div>
          <div className="pl-3 text-sm font-bold">
            {!isFullScreen ? "Full Screen" : "Save Mode Screen"}
          </div>
        </div>
      </div>
      <div className={`${isFullScreen ? "full-screen-chart" : ""}`}>
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
            className="bg-[white] pl-0 py-1 w-10 text-xs font-bold text-black"
            style={{ display: "none" }}
          >
            N/A
          </div>
        </>
      </div>
      <div className="border-b border-b-[#252A2D] py-1.5"></div>
      <div className="flex pt-3.5">
        <div className="flex items-center">
          <div className="pr-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="6" cy="6" r="6" fill="#2EBD85" />
            </svg>
          </div>
          <div className="text-xs">Net Asset Value(NAV)</div>
        </div>
        <div className="flex items-center px-3">
          <div className="pr-1">
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="6" cy="6" r="6" fill="#F1B90B" />
            </svg>
          </div>
          <div className="text-xs">Discount to NAV</div>
        </div>
      </div>
    </div>
  );
};

export default SummaryChart;
