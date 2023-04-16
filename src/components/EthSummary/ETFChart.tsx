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

interface ETFChartProps {
  viewMode: number;
}

const ETFChart: FC<ETFChartProps> = ({ viewMode }) => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "right" as const,
        usePointStyle: true,
        pointStyle: "circle",
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
      },
      scales: {
        yAxes: [
          {
            id: "y-axis-0",
            position: "left", // Positions the axis on the right side of the chart
            ticks: {
              beginAtZero: true,
            },
            scaleLabel: {
              display: true,
              labelString: "Sales",
            },
          },
        ],
        xAxes: [
          {
            ticks: {
              beginAtZero: true,
            },
          },
        ],
      },
    },
  };

  const [labels, setLabels] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "Septemeber",
    "October",
    "November",
    "December",
  ]);

  const [data_datasets, setData_Datasets] = useState([
    23, 83, 35, 45, 21, 35, 62,
  ]);

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: data_datasets,
        borderColor: "#2EBD85",
        // backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };

  const getETFHistoryData = async () => {
    const fetchURL =
      "https://ijqbfeko49.execute-api.eu-central-1.amazonaws.com/dev/api/v1/stockHistoricalData?ticker=AAPL.US&token=demo&period=d";

    const response = await fetch(fetchURL);
    const jsonData = await response.json();

    var count = 0;

    switch (viewMode) {
      case 1:
        // setCount(1);
        count = 1;
        break;
      case 2:
        // setCount(7);
        count = 7;
        break;
      case 3:
        // setCount(30);
        count = 30;
        break;
      case 4:
        // setCount(180);
        count = 180;
        break;
      case 5:
        // setCount(jsonData.length);
        count = jsonData.length;
        break;
      case 6:
        // setCount(jsonData.length);
        count = jsonData.length;
        break;
      case 7:
        // setCount(jsonData.length);
        count = jsonData.length;
        break;
      default:
        // setCount(1);
        count = 1;
        break;
    }

    count = 30;

    var nums: number[] = new Array(jsonData.length);
    for (var i = 0; i < count; i++) nums[i] = Number(jsonData[i].open);
    setData_Datasets(nums);
    var tlabels: string[] = new Array(jsonData.length);
    for (var i = 0; i < count; i++) tlabels[i] = String(jsonData[i].date);
    setLabels(tlabels);
  };

  useEffect(() => {
    getETFHistoryData();
  }, [viewMode]);

  return <Line options={options} data={data} />;
};

export default ETFChart;
