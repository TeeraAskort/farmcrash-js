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

export default async function assignTask(index, error) {
  getContainer();
  container.innerHTML = "";

  let data = await REST.default.getTasksToAssign();

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
      '<font color="red">Error: ' + error + "</font><br>Assign task";
  } else {
    title.innerText = "Assign task";
  }
  titleCol.appendChild(title);
  titleRow.appendChild(titleCol);
  container.append(titleRow);

  let row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("justify-content-around");

  data.forEach((task) => {
    let col = document.createElement("div");
    col.classList.add("col-6");
    col.classList.add("col-md-3");
    let card = document.createElement("div");
    card.classList.add("card");
    let h5 = document.createElement("h5");
    h5.classList.add("card-title");
    h5.classList.add("m-3");
    h5.innerText = task.type;
    card.appendChild(h5);
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    let time = document.createElement("p");
    time.innerText = "Time to completion: " + task.daysLeft;
    cardBody.appendChild(time);
    let cost = document.createElement("p");
    cost.innerText = "Cost: " + task.cost + "€";
    cardBody.appendChild(cost);
    let btn = document.createElement("a");
    btn.classList.add("btn");
    btn.classList.add("btn-primary");
    btn.innerText = "Assign Task";
    btn.addEventListener("click", () => {
      REST.default.assignTask(index, task.id);
    });
    cardBody.appendChild(btn);
    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
  });

  container.append(row);
}
