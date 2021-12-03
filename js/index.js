import * as REST from "./rest/rest.js";
import Player from "./models/player.js";
import buyCrops from "./ui/crops.js";
import * as LISTS from "./ui/lists.js";
import hireWorker from "./ui/worker.js";
import assignTask from "./ui/task.js";
import loadPlayerInfo from "./ui/playerInfo.js";
import showChart from "./ui/charts.js";
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

import * as USER from "./ui/user.js";

import checkThatWokersAreDisplayed from "./tests/checkThatWokersAreDisplayed.spec.js";
import checkThatCropsAreDisplayedInBuyPage from "./tests/checkThatCropsAreDisplayedInBuyPage.spec.js";

(function () {
  "use strict";

  function cleanActive() {
    if (localStorage.getItem("active")) {
      let option = document.querySelector(localStorage.getItem("active"));
      option.classList.remove("active");
    }
  }

  function loadUser() {
    if (!localStorage.getItem("player")) {
      USER.default.createUser();
    } else {
      REST.default.fetchPlayer();
    }
    cleanActive();
    let home = document.querySelector("#home");
    home.classList.add("active");
    localStorage.setItem("active", "#home");
  }

  function buyCropsFunc() {
    if (localStorage.getItem("player")) {
      buyCrops();
      cleanActive();
      let option = document.querySelector("#buyCrops");
      option.classList.add("active");
      localStorage.setItem("active", "#buyCrops");
    }
  }

  function inicializar() {
    loadUser();
    document.querySelector("#home").addEventListener("click", function () {
      loadUser();
    });
    document.querySelector("#buyCrops").addEventListener("click", buyCropsFunc);
    document.querySelector("#hireWorkers").addEventListener("click", () => {
      if (localStorage.getItem("player")) {
        hireWorker();
        cleanActive();
        let option = document.querySelector("#hireWorkers");
        option.classList.add("active");
        localStorage.setItem("active", "#hireWorkers");
      }
    });
    document.querySelector("#leaderboard").addEventListener("click", () => {
      if (localStorage.getItem("player")) {
        LISTS.default.leaderboard();
        cleanActive();
        let option = document.querySelector("#leaderboard");
        option.classList.add("active");
        localStorage.setItem("active", "#leaderboard");
      }
    });

    document.querySelector("#listCrops").addEventListener("click", () => {
      if (localStorage.getItem("player")) {
        LISTS.default.listCrops();
        cleanActive();
        let option = document.querySelector("#listCrops");
        option.classList.add("active");
        localStorage.setItem("active", "#listCrops");
      }
    });

    document.querySelector("#listWorkers").addEventListener("click", () => {
      if (localStorage.getItem("player")) {
        LISTS.default.listWokers();
        cleanActive();
        let option = document.querySelector("#listWorkers");
        option.classList.add("active");
        localStorage.setItem("active", "#listWorkers");
      }
    });

    document.querySelector("#listItems").addEventListener("click", () => {
      if (localStorage.getItem("player")) {
        LISTS.default.listItems();
        cleanActive();
        let option = document.querySelector("#listItems");
        option.classList.add("active");
        localStorage.setItem("active", "#listItems");
      }
    });

    document.querySelector("#statistics").addEventListener("click", () => {
      if (localStorage.getItem("player")) {
        showChart();
        cleanActive();
        let option = document.querySelector("#statistics");
        option.classList.add("active");
        localStorage.setItem("active", "#statistics");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", inicializar);
})();
