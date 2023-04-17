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

interface ETFChartProps {
  viewMode: number;
  isFullScreen: boolean;
}

type positionType = "left" | "center" | "top" | "right" | "bottom" | undefined;

const ETFChart: FC<ETFChartProps> = ({ viewMode, isFullScreen }) => {
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
      beforeDraw: function (chart: any) {
        console.log("Hello!!!");
        // var ctx = chart.ctx;
        // var xAxis = chart.scales["x-axis-0"];
        // var yAxis = chart.scales["y-axis-0"];
        // var labels = xAxis.ticks.map((tick: any) => tick.label);

        // labels.forEach(function (label: any, index: any) {
        //   var x = xAxis.getPixelForValue(label);
        //   var y = yAxis.bottom;
        //   var width = xAxis.width / labels.length;
        //   var height = yAxis.top - yAxis.bottom;

        //   if (index % 2 === 0) {
        //     ctx.fillStyle = "rgba(255, 0, 0, 0.2)";
        //   } else {
        //     ctx.fillStyle = "rgba(0, 255, 0, 0.2)";
        //   }

        //   ctx.fillRect(x - width / 2, y, width, height);
        // });
      },
      // patterns: {
      //   stripes: pattern,
      // },
    },
    scales: {
      x: {
        ticks: {
          maxTicksLimit: 6,
          color: "white",
        },
        grid: {
          lineWidth: 3,
          color: function (context: any) {
            // if (context.tick.value > 25) {
            //   return "#FFFFFF";
            // } else {
            //   return "#00000000";
            // }
            return "#00000000";
          },
        },
      },
      y: {
        position: "right" as positionType,
        ticks: {
          color: "white",
        },
        grid: {
          lineWidth: function (context: any) {
            if (context.tick.value < Math.min(...data_datasets)) {
              return 3;
            } else {
              return 0.6;
            }
          },
          color: function (context: any) {
            if (context.tick.value > Math.min(...data_datasets)) {
              return "#FFFFFF55";
            } else {
              return "#E7EBEF";
            }
          },
        },
      },
    },
    elements: {
      point: {
        radius: 0,
        hoverRadius: 6,
        pointStyle: "circle",
        backgroundColor: "#FFFFFF",
        borderWidth: 2,
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
        borderColor: "#2EBD85",
        backgroundColor: "#2EBD85",
        fill: true,
        tension: 0.1,
      },
    ],
  };

  const getETFHistoryData = async () => {
    setIsLoading(true);

    const fetchURL =
      "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/stockHistoricalData?ticker=AAPL.US&token=demo&period=d";

    const response = await fetch(fetchURL);
    const jsonData = await response.json();
    jsonData.reverse();

    let count = 0;
    switch (viewMode) {
      case 1:
        count = 1;
        break;
      case 2:
        count = 6;
        break;
      case 3:
        count = 30;
        break;
      case 4:
        count = 180;
        break;
      case 5:
        count = jsonData.length;
        break;
      case 6:
        count = jsonData.length;
        break;
      case 7:
        count = jsonData.length;
        break;
      default:
        count = 1;
        break;
    }
    setPosCount(count);

    // ChartJS information initialize
    const nums: number[] = new Array(count);
    for (let i = 0; i < count; i++) nums[i] = Number(jsonData[i].open);
    setData_Datasets(nums);
    const tlabels: string[] = new Array(count);
    for (let i = 0; i < count; i++) tlabels[i] = String(jsonData[i].date);
    tlabels[0] = "";
    setLabels(tlabels);
    // let tbgcolor: string[] = new Array(count);
    // for (let i = 0; i < count; i++) {
    //   if (i % 2 == 0) tbgcolor[i] = "rgba(255, 99, 132, 0.2)";
    //   // else tbgcolor[i] = "rgba(54, 162, 235, 0.2)";
    // }
    // // setbgColor(tbgcolor);

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

export default ETFChart;
