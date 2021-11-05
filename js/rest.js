import * as UI from "./ui.js";
import Player from "./player.js";

let url = "http://localhost:8080/";

async function fetchPlayer() {
  let response = await fetch(
    url + "api/v1/player/" + localStorage.getItem("player")
  );
  const data = await response.json();
  let player = Object.assign(new Player(), data);
  UI.default.loadPlayerInfo(player);
}

async function createPlayer(name) {
  if (name !== "") {
    const response = await fetch(url + "api/v1/player/create/" + name);
    const data = await response.json();
    let player = Object.assign(new Player(), data);
    localStorage.setItem("player", player.id);
    UI.default.loadPlayerInfo(player);
  }
}

async function farmCrop(index) {
  let response = await fetch(
    url +
      "api/v1/player/" +
      localStorage.getItem("player") +
      "/crop/" +
      index +
      "/farmCrop"
  );
  let data = await response.json();
  let player = Object.assign(new Player(), data);
  UI.default.loadPlayerInfo(player);
}

export default { fetchPlayer, createPlayer, farmCrop };
