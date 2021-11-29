import loadPlayerInfo from "../ui/playerInfo.js";
import hireWorker from "../ui/worker.js";
import Player from "../models/player.js";
import buyCrops from "../ui/crops.js";
import { Buffer } from "buffer";

let url = "http://localhost:4040/";

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
  loadPlayerInfo(player);
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
  loadPlayerInfo(player);
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
    loadPlayerInfo(player);
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
  loadPlayerInfo(player);
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
  loadPlayerInfo(player);
}

async function getTasksToAssign() {
  let response = await fetch(url + "api/v1/task/all", {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.getItem("player"),
    },
    credentials: "include",
  });
  return response.json();
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
  if (!response.ok) {
    UI.default.assignTask(index, await response.text());
  } else {
    let data = await response.json();
    let player = Object.assign(new Player(), data);
    loadPlayerInfo(player);
  }
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
    buyCrops(await response.text());
  } else {
    let data = await response.json();
    let player = Object.assign(new Player(), data);
    loadPlayerInfo(player);
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

async function hireWorkerRest(id) {
  let response = await fetch(url + "api/v1/player/worker/" + id + "/hire", {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.getItem("player"),
    },
    credentials: "include",
  });
  if (!response.ok) {
    hireWorker(await response.text());
  } else {
    let data = await response.json();
    let player = Object.assign(new Player(), data);
    loadPlayerInfo(player);
  }
}

async function getLeaderboard() {
  let response = await fetch(url + "api/v1/player/leaderboard", {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.getItem("player"),
    },
    credentials: "include",
  });
  return response.json().then((data) => Object.values(data));
}

async function sellItem(index) {
  let response = await fetch(url + "api/v1/player/item/" + index + "/sell", {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.getItem("player"),
    },
    credentials: "include",
  });

  let data = await response.json();
  let player = Object.assign(new Player(), data);
  loadPlayerInfo(player);
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
  hireWorkerRest,
  getLeaderboard,
  sellItem,
};
