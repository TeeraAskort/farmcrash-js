import * as REST from "./rest/rest.js";
import Player from "./models/player.js";
import buyCrops from "./ui/crops.js";
import leaderboard from "./ui/leaderboard.js";
import hireWorker from "./ui/worker.js";
import assignTask from "./ui/task.js";
import loadPlayerInfo from "./ui/playerInfo.js";
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
        leaderboard();
        cleanActive();
        let option = document.querySelector("#leaderboard");
        option.classList.add("active");
        localStorage.setItem("active", "#leaderboard");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", inicializar);
})();
