import loadPlayerInfo from "../ui/playerInfo.js";
import hireWorker from "../ui/worker.js";
import Player from "../models/player.js";
import buyCrops from "../ui/crops.js";
import * as USER from "../ui/user.js";
import { Buffer } from "buffer";

let url = "http://localhost:4040/";

/**
 * Función que recoge los datos del usuario según los datos guardados
 * en el localStorage y llama a la función de renderizar
 */
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

/**
 * Función que recoge los datos del usuario de la api para los test E2E
 */

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

/**
 * Función que realiza el login en la api REST
 * @param {string} name nombre de usuario
 * @param {string} pass contrasenña
 */

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

/**
 * Función que realiza la creación del usuario.
 * Si la api devuelve un error, ésta función redirige a
 * la página de creación de usuario
 * @param {string} name nombre de usuario
 * @param {string} pass contraseña
 * @param {string} passR contraseña repetida
 */

async function createPlayer(name, pass, passR) {
  if (name !== "") {
    const response = await fetch(url + "api/v1/player/create", {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({
        name: name,
        password: pass,
        passwordRepeat: passR,
      }),
    });
    if (!response.ok) {
      USER.default.createUser(await response.text());
    } else {
      const data = await response.json();
      let player = Object.assign(new Player(), data);
      let playerStr = Buffer.from(name + ":" + pass);
      localStorage.setItem("player", playerStr.toString("base64"));
      loadPlayerInfo(player);
    }
  }
}

/**
 * Función que realiza una llamada a la api REST para recoger una
 * verdura que ya está en el "STAGE" que permite recogerla
 * @param {number} index inidice de la verdura para recoger
 */

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

/**
 * Función que realiza una llamada a la api para vender una verdura que ya
 * ha sido recogida.
 * @param {number} index indice de la verdura para vender
 */

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

/**
 * Función que realiza una llamada a la api para obtener una lista de tareas
 * para asignar a los trabajadores
 * @returns lista de tareas que se pueden asignar a los trabajadores
 */

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

/**
 * Función que realiza una llamada a la api para asignar una tarea a un trabajador
 * @param {number} index indice del trabajador al que asignar la tarea
 * @param {number} task id de la tarea a asignar
 */

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

/**
 * Función que realiza una llamada a la api para obtener todas las
 * verduras que puede comprar el jugador
 * @returns todas las verduras que se pueden comprar
 */

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

/**
 * Función que realiza una llamada a la api que realiza la tarea de comprar una
 * verdura para el jugador
 * @param {number} id id de la verdura a comprar
 * @param {number} amount cantidad a comprar
 */

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

/**
 * Función que realiza una llamada a la api para retornar todos los
 * trabajadores que puede contratar el jugador
 * @returns lista de todos los trabajadores para contratar
 */

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

/**
 * Función que realiza una llamada a la api para contratar un trabajador.
 * @param {number} id id del trabajador a contratar
 */

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

/**
 * Función que realiza una llamada a la api para obtener una lista con los
 * cinco jugadores con más dinero.
 * @returns lista de los cinco jugadores con más dinero
 */

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

/**
 * Función que realiza una llamada a la api para vender un objeto del
 * inventario del jugador
 * @param {number} index indice del objeto a vender
 */

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

/**
 * Función que realiza una llamada a la api para obtener las
 * estadisticas del jugador logueado.
 * @returns estadisticas del jugador
 */

async function fetchStats() {
  let response = await fetch(url + "api/v1/player/stats", {
    method: "GET",
    headers: {
      Authorization: "Basic " + localStorage.getItem("player"),
    },
    credentials: "include",
  });

  return response.json();
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
  fetchStats,
};
