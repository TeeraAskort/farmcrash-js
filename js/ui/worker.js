import * as REST from "../rest/rest.js";

let container = undefined;
let url = "http://localhost:4040";

function cleanActive() {
  if (localStorage.getItem("active")) {
    let option = document.querySelector(localStorage.getItem("active"));
    option.classList.remove("active");
  }
}

function getContainer() {
  container = document.querySelector("#container");
}

export default async function hireWorker(error) {
  getContainer();
  container.innerHTML = "";
  let workers = await REST.default.getAllWorkers();
  let player = await REST.default.fetchPlayerData();
  let titleRow = document.createElement("div");
  titleRow.classList.add("row");
  titleRow.classList.add("justify-content-around");
  let titleCol = document.createElement("div");
  titleCol.classList.add("col-8");
  titleCol.classList.add("col-md-6");
  let title = document.createElement("h2");
  title.classList.add("text-center");
  title.classList.add("my-3");
  if (error) {
    title.innerHTML =
      '<font color="red">Error: ' + error + "</font><br>Hire worker";
  } else {
    title.innerText = "Hire worker";
  }
  titleCol.appendChild(title);
  titleRow.appendChild(titleCol);
  container.append(titleRow);
  let workerRow = document.createElement("div");
  workerRow.classList.add("row");
  workers.forEach((worker) => {
    let workerCol = document.createElement("div");
    workerCol.classList.add("col-12");
    workerCol.classList.add("col-sm-8");
    workerCol.classList.add("col-md-6");
    workerCol.classList.add("col-lg-4");
    workerCol.classList.add("my-3");
    let workerCard = document.createElement("div");
    workerCard.classList.add("card");
    let workerImg = document.createElement("img");
    workerImg.classList.add("card-img-top");
    workerImg.src = url + worker.imageUrl;
    workerCard.appendChild(workerImg);
    let workerName = document.createElement("h5");
    workerName.classList.add("card-title");
    workerName.classList.add("m-3");
    workerName.innerText = worker.name;
    workerCard.appendChild(workerName);
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    let hired = false;
    player.workers.forEach((hiredW) => {
      if (hiredW.name === worker.name) {
        hired = true;
      }
    });
    if (!hired) {
      let cost = document.createElement("p");
      cost.innerText = "Cost: " + worker.costOfHiring + "€";
      cardBody.appendChild(cost);
      let hire = document.createElement("a");
      hire.classList.add("btn");
      hire.classList.add("btn-success");
      hire.textContent = "Hire";
      hire.addEventListener("click", () => {
        REST.default.hireWorkerRest(worker.id);
      });
      cardBody.appendChild(hire);
    } else {
      let alreadyHired = document.createElement("p");
      alreadyHired.innerText = "Worker already hired";
      cardBody.appendChild(alreadyHired);
    }
    workerCard.appendChild(cardBody);
    workerCol.appendChild(workerCard);
    workerRow.appendChild(workerCol);
  });
  container.append(workerRow);
}
