import * as UI from "./ui.js";
import * as REST from "./rest.js";

(function () {
  "use strict";

  function loadUser() {
    if (localStorage.getItem("player") === null) {
      UI.default.createUser();
    } else {
      REST.default.fetchPlayer();
    }
  }

  function buyCrops() {
    UI.default.buyCrops();
  }

  function inicializar() {
    loadUser();
    document.querySelector("#home").addEventListener("click", function () {
      loadUser();
    });
    document.querySelector("#buyCrops").addEventListener("click", buyCrops);
  }

  document.addEventListener("DOMContentLoaded", inicializar);
})();
