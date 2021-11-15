import * as UI from "./ui.js";
import Player from "./player.js";

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

async function loginPlayer(name, pass) {
  let response = await fetch(url + "api/v1/player/login", {
    method: "GET",
    headers: {
      Authorization: "Basic " + btoa(name + ":" + pass),
    },
    credentials: "include",
  });
  const data = await response.json();
  localStorage.setItem("player", btoa(name + ":" + pass));
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
    localStorage.setItem("player", btoa(name + ":" + pass));
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
  let crops = await response.json().then((data) => Object.values(data));
  return crops;
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
  let data = await response.json();
  let player = Object.assign(new Player(), data);
  UI.default.loadPlayerInfo(player);
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
};
