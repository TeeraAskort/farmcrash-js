import * as REST from "./rest.js";

let container = undefined;
let url = "http://localhost:8080";

function loadPlayerInfo(data) {
  getContainer();
  container.innerHTML = "";

  // Money

  let row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("justify-content-around");
  let col = document.createElement("div");
  col.classList.add("col-6");
  col.classList.add("col-md-3");
  let header = document.createElement("h2");
  header.innerText = " Money: " + data.money + "€";
  header.style.textAlign = "center";
  col.appendChild(header);
  row.appendChild(col);
  container.appendChild(row);

  // Crops list

  let cropH2Row = document.createElement("div");
  cropH2Row.classList.add("row");
  cropH2Row.classList.add("justify-content-around");

  let cropH2Col = document.createElement("div");
  cropH2Col.classList.add("col-6");
  cropH2Col.classList.add("col-md-3");
  cropH2Col.classList.add("my-3");

  let cropsH2 = document.createElement("h2");
  cropsH2.classList.add("text-center");
  cropsH2.innerText = "Crops";
  cropH2Col.appendChild(cropsH2);
  cropH2Row.appendChild(cropH2Col);
  container.append(cropH2Row);

  let cropRow = document.createElement("div");
  cropRow.classList.add("row");
  cropRow.classList.add("justify-content-around");

  if (data.crops.length === 0) {
    let cropsEmptyCol = document.createElement("div");
    cropsEmptyCol.classList.add("col-6");
    cropsEmptyCol.classList.add("col-md-3");
    let cropsEmptyH2 = document.createElement("h3");
    cropsEmptyH2.classList.add("text-center");
    cropsEmptyH2.innerText = "You don't have crops";
    cropsEmptyCol.appendChild(cropsEmptyH2);
    cropRow.appendChild(cropsEmptyCol);
  } else {
    data.crops.forEach((crop, index) => {
      let cropCol = document.createElement("div");
      cropCol.classList.add("col-4");
      cropCol.classList.add("col-md-3");
      let cropCard = document.createElement("div");
      cropCard.classList.add("card");
      let cropImg = document.createElement("img");
      cropImg.classList.add("card-img-top");
      cropImg.src = url + crop.imageUrl;
      cropCard.appendChild(cropImg);
      let cropCardBody = document.createElement("div");
      cropCardBody.classList.add("card-body");
      let cropName = document.createElement("h5");
      cropName.classList.add("card-title");
      cropName.innerText = crop.name;
      cropCardBody.appendChild(cropName);
      let cropAmount = document.createElement("p");
      cropAmount.classList.add("card-text");
      cropAmount.innerText = "Amount: " + crop.amount;
      cropCardBody.append(cropAmount);
      if (crop.stage === "READYTOFARM") {
        let farmCrop = document.createElement("a");
        farmCrop.classList.add("btn");
        farmCrop.classList.add("btn-success");
        farmCrop.textContent = "Farm";
        farmCrop.addEventListener("click", () => {
          REST.default.farmCrop(index);
        });
        cropCardBody.appendChild(farmCrop);
      }
      cropCard.appendChild(cropCardBody);
      cropCol.appendChild(cropCard);
      cropRow.appendChild(cropCol);
    });
  }
  container.appendChild(cropRow);

  // Workers list

  let workerH2Row = document.createElement("div");
  workerH2Row.classList.add("row");
  workerH2Row.classList.add("justify-content-around");

  let workerH2Col = document.createElement("div");
  workerH2Col.classList.add("col-6");
  workerH2Col.classList.add("col-md-3");
  workerH2Col.classList.add("my-3");

  let workerH2 = document.createElement("h2");
  workerH2.classList.add("text-center");
  workerH2.innerText = "Workers";
  workerH2Col.appendChild(workerH2);
  workerH2Row.appendChild(workerH2Col);
  container.append(workerH2Row);

  let workerRow = document.createElement("div");
  workerRow.classList.add("row");
  workerRow.classList.add("justify-content-around");

  if (data.workers.length === 0) {
    let workerEmptyCol = document.createElement("div");
    workerEmptyCol.classList.add("col-6");
    workerEmptyCol.classList.add("col-md-3");
    let workerEmptyH2 = document.createElement("h3");
    workerEmptyH2.classList.add("text-center");
    workerEmptyH2.innerText = "You don't have workers";
    workerEmptyCol.appendChild(workerEmptyH2);
    workerRow.appendChild(workerEmptyCol);
  } else {
    data.workers.forEach((worker, index) => {
      let workerCol = document.createElement("div");
      workerCol.classList.add("col-4");
      workerCol.classList.add("col-md-3");
      let workerCard = document.createElement("div");
      workerCard.classList.add("card");
      let workerImg = document.createElement("img");
      workerImg.classList.add("card-img-top");
      workerImg.src = url + worker.imageUrl;
      workerCard.appendChild(workerImg);
      let workerCardBody = document.createElement("div");
      workerCardBody.classList.add("card-body");
      let workerName = document.createElement("h5");
      workerName.classList.add("card-title");
      workerName.innerText = worker.name;
      workerCardBody.appendChild(workerName);

      if (!worker.taskAssignedTo) {
        let assignTask = document.createElement("a");
        assignTask.classList.add("btn");
        assignTask.classList.add("btn-success");
        assignTask.textContent = "Assign Task";
        assignTask.addEventListener("click", () => {
          REST.default.getTasksToAssign(index);
        });
        workerCardBody.appendChild(assignTask);
      } else {
        let workerTask = document.createElement("p");
        workerTask.classList.add("card-text");
        workerTask.innerText = "Task: " + worker.taskAssignedTo.type;
        workerCardBody.append(workerTask);
      }
      workerCard.appendChild(workerCardBody);
      workerCol.appendChild(workerCard);
      workerRow.appendChild(workerCol);
    });
  }
  container.appendChild(workerRow);
}

function createUser() {
  getContainer();
  let row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("justify-content-around");
  let col = document.createElement("div");
  col.classList.add("col-md-3");
  col.classList.add("col-6");
  let card = document.createElement("div");
  card.classList.add("card");
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  let h5 = document.createElement("h5");
  h5.classList.add("card-title");
  h5.innerText = "Create user";
  cardBody.appendChild(h5);
  let input = document.createElement("input");
  input.type = "text";
  input.name = "username";
  input.id = "username";
  input.placeholder = "Username";
  input.classList.add("form-control");
  input.classList.add("mb-3");
  cardBody.appendChild(input);
  let btn = document.createElement("a");
  btn.classList.add("btn");
  btn.classList.add("btn-primary");
  btn.textContent = "Send";
  btn.addEventListener("click", () => {
    let name = input.value;
    REST.default.createPlayer(name);
  });
  let btnLogin = document.createElement("a");
  btnLogin.classList.add("btn");
  btnLogin.classList.add("btn-primary");
  btnLogin.classList.add("mx-3");
  btnLogin.textContent = "Login";
  btnLogin.addEventListener("click", () => {
    login();
  });
  cardBody.appendChild(btn);
  cardBody.appendChild(btnLogin);
  card.appendChild(cardBody);
  col.appendChild(card);
  row.appendChild(col);
  container.appendChild(row);
}

function login() {
  getContainer();
  container.innerHTML = "";
  let row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("justify-content-around");
  let col = document.createElement("div");
  col.classList.add("col-md-3");
  col.classList.add("col-6");
  let card = document.createElement("div");
  card.classList.add("card");
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  let h5 = document.createElement("h5");
  h5.classList.add("card-title");
  h5.innerText = "Login";
  cardBody.appendChild(h5);
  let name = document.createElement("input");
  name.type = "text";
  name.name = "username";
  name.id = "username";
  name.placeholder = "Username";
  name.classList.add("form-control");
  name.classList.add("mb-3");
  cardBody.appendChild(name);
  let password = document.createElement("input");
  password.type = "password";
  password.name = "password";
  password.id = "password";
  password.placeholder = "Password";
  password.classList.add("form-control");
  password.classList.add("mb-3");
  cardBody.appendChild(password);
  let btn = document.createElement("a");
  btn.classList.add("btn");
  btn.classList.add("btn-primary");
  btn.textContent = "Login";
  btn.addEventListener("click", () => {
    let name = input.value;
    loginPlayer(name, password);
  });
  cardBody.appendChild(btn);
  card.appendChild(cardBody);
  col.appendChild(card);
  row.appendChild(col);
  container.appendChild(row);
}

function getContainer() {
  container = document.querySelector("#container");
}

function assignTask(index, data) {
  getContainer();
  container.innerHTML = "";

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
    h5.innerText = task.type;
    card.appendChild(h5);
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    let time = document.createElement("p");
    time.innerText = "Time to completion: " + task.daysLeft;
    cardBody.appendChild(time);
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

export default { createUser, loadPlayerInfo, assignTask };
