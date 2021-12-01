import * as REST from "../rest/rest.js";
import {
  fromEvent,
  of,
  map,
  distinctUntilChanged,
  debounceTime,
  switchMap,
} from "rxjs";

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

  let searchRow = document.createElement("div");
  searchRow.classList.add("row");
  searchRow.classList.add("justify-content-around");
  let searchCol = document.createElement("div");
  searchCol.classList.add("col-12");
  searchCol.classList.add("col-md-6");
  let searchForm = document.createElement("form");
  let searchInput = document.createElement("input");
  searchInput.type = "text";
  searchInput.classList.add("form-control");
  searchInput.classList.add("form-control-lg");
  searchInput.placeholder = "Search for workers";
  searchForm.appendChild(searchInput);
  searchCol.appendChild(searchForm);
  searchRow.appendChild(searchCol);
  container.appendChild(searchRow);

  drawWorkers(workers, player, error);

  const fetchWorkers = (searchText) => {
    const fetchedWorkers =
      !searchText || searchText.length == 0
        ? workers
        : workers.filter((worker) =>
            worker.name.toLowerCase().includes(searchText.toLowerCase())
          );
    return of(fetchedWorkers);
  };

  let search$ = fromEvent(searchInput, "keyup").pipe(
    map((event) => event.target.value),
    distinctUntilChanged(),
    debounceTime(150),
    switchMap((searchText) => fetchWorkers(searchText))
  );

  search$.subscribe((data) => {
    container.removeChild(container.querySelector(".rowToRemove"));
    container.removeChild(container.querySelector(".rowToRemove"));
    drawWorkers(data, player);
  });
}

function drawWorkers(workers, player, error) {
  let titleRow = document.createElement("div");
  titleRow.classList.add("row");
  titleRow.classList.add("justify-content-center");
  titleRow.classList.add("rowToRemove");
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
  workerRow.classList.add("rowToRemove");
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
