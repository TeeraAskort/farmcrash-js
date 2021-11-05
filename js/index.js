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

  function inicializar() {
    loadUser();
  }

  document.addEventListener("DOMContentLoaded", inicializar);
})();
