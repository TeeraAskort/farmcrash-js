import * as UI from "./ui.js";
import Player from "./player.js";
import { Buffer } from "buffer";

let url = "http://localhost:8080/";

async function fetchPlayer() {
  let response = await fetch(url + "api/v1/player/login", {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.getItem("player"),
    },
    credentials: "include",
  });
  const data = await response.json();
  let player = Object.assign(new Player(), data);
  UI.default.loadPlayerInfo(player);
}

async function fetchPlayerData() {
  let response = await fetch(url + "api/v1/player/login", {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.getItem("player"),
    },
    credentials: "include",
  });
  const data = await response.json();
  return Object.assign(new Player(), data);
}

async function loginPlayer(name, pass) {
  let playerStr = Buffer.from(name + ":" + pass);
  let response = await fetch(url + "api/v1/player/login", {
    method: "GET",
    headers: {
      Authorization: "Basic " + playerStr.toString("base64"),
    },
    credentials: "include",
  });
  const data = await response.json();
  localStorage.setItem("player", playerStr.toString("base64"));
  let player = Object.assign(new Player(), data);
  UI.default.loadPlayerInfo(player);
}

async function createPlayer(name, pass) {
  if (name !== "") {
    const response = await fetch(url + "api/v1/player/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ name: name, password: pass }),
    });
    const data = await response.json();
    let player = Object.assign(new Player(), data);
    let playerStr = Buffer.from(name + ":" + pass);
    localStorage.setItem("player", playerStr.toString("base64"));
    UI.default.loadPlayerInfo(player);
  }
}

async function farmCrop(index) {
  let response = await fetch(
    url + "api/v1/player/crop/" + index + "/farmCrop",
    {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.getItem("player"),
      },
      credentials: "include",
    }
  );
  let data = await response.json();
  let player = Object.assign(new Player(), data);
  UI.default.loadPlayerInfo(player);
}

async function sellCrop(index) {
  let response = await fetch(url + "api/v1/player/crop/" + index + "/sell", {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.getItem("player"),
    },
    credentials: "include",
  });
  let data = await response.json();
  let player = Object.assign(new Player(), data);
  UI.default.loadPlayerInfo(player);
}

async function getTasksToAssign(index) {
  let response = await fetch(url + "api/v1/task/all", {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.getItem("player"),
    },
    credentials: "include",
  });
  let data = await response.json();
  UI.default.assignTask(index, data);
}

async function assignTask(index, task) {
  let response = await fetch(
    url + "api/v1/player/worker/" + index + "/assignTask/" + task,
    {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.getItem("player"),
      },
      credentials: "include",
    }
  );
  let data = await response.json();
  let player = Object.assign(new Player(), data);
  UI.default.loadPlayerInfo(player);
}

async function getAllCrops() {
  let response = await fetch(url + "api/v1/crop/all", {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.getItem("player"),
    },
    credentials: "include",
  });
  return response.json().then((data) => Object.values(data));
}

async function buyCrop(id, amount) {
  let response = await fetch(
    url + "api/v1/player/crop/" + id + "/buy/" + amount,
    {
      method: "GET",
      headers: {
        Authorization: "Basic " + localStorage.getItem("player"),
      },
      credentials: "include",
    }
  );
  if (!response.ok) {
    UI.default.buyCrops(await response.text());
  } else {
    let data = await response.json();
    let player = Object.assign(new Player(), data);
    UI.default.loadPlayerInfo(player);
  }
}

async function getAllWorkers() {
  let response = await fetch(url + "api/v1/worker/all", {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.getItem("player"),
    },
    credentials: "include",
  });

  return response.json().then((data) => Object.values(data));
}

async function hireWorker(id) {
  let response = await fetch(url + "api/v1/player/worker/" + id + "/hire", {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.getItem("player"),
    },
    credentials: "include",
  });
  if (!response.ok) {
    UI.default.hireWorker(await response.text());
  } else {
    let data = await response.json();
    let player = Object.assign(new Player(), data);
    UI.default.loadPlayerInfo(player);
  }
}

export default {
  fetchPlayer,
  createPlayer,
  farmCrop,
  getTasksToAssign,
  assignTask,
  loginPlayer,
  getAllCrops,
  buyCrop,
  getAllWorkers,
  sellCrop,
  fetchPlayerData,
  hireWorker,
};
