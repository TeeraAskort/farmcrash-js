import * as UI from "./ui.js";
import * as REST from "./rest.js";
import Player from "./player.js";

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
      UI.default.createUser();
    } else {
      REST.default.fetchPlayer();
    }
    cleanActive();
    let home = document.querySelector("#home");
    home.classList.add("active");
    localStorage.setItem("active", "#home");
  }

  function buyCrops() {
    if (localStorage.getItem("player")) {
      UI.default.buyCrops();
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
    document.querySelector("#buyCrops").addEventListener("click", buyCrops);
    document.querySelector("#hireWorkers").addEventListener("click", () => {
      if (localStorage.getItem("player")) {
        UI.default.hireWorker();
        cleanActive();
        let option = document.querySelector("#hireWorkers");
        option.classList.add("active");
        localStorage.setItem("active", "#hireWorkers");
      }
    });
  }

  document.addEventListener("DOMContentLoaded", inicializar);
})();
