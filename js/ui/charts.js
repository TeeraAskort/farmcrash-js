import {
  Chart,
  ArcElement,
  LineElement,
  BarElement,
  PointElement,
  BarController,
  BubbleController,
  DoughnutController,
  LineController,
  PieController,
  PolarAreaController,
  RadarController,
  ScatterController,
  CategoryScale,
  LinearScale,
  LogarithmicScale,
  RadialLinearScale,
  TimeScale,
  TimeSeriesScale,
  Decimation,
  Filler,
  Legend,
  Title,
  Tooltip,
  SubTitle,
} from "chart.js";
import * as REST from "../rest/rest.js";

let container = undefined;

function getContainer() {
  container = document.querySelector("#container");
}

export default async function showChart() {
  getContainer();
  container.innerHTML = "";

  const data = await REST.default.fetchStats();

  container.innerHTML = `<div class="row justify-content-center">
                                <div class="col-md-6 col-12">
                                    <h2>Statistics</h2>
                                </div>
                            </div>`;

  let chartRow = document.createElement("div");
  chartRow.classList.add("row");
  chartRow.classList.add("justify-content-center");

  let chartCol = document.createElement("div");
  chartCol.classList.add("col-12");

  let chart = document.createElement("canvas");
  chartCol.appendChild(chart);
  chartRow.appendChild(chartCol);
  container.appendChild(chartRow);

  Chart.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle
  );

  const config = {
    type: "line",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  new Chart(chart, config);
}
