import * as REST from "./rest.js";

let container = undefined;
let url = "http://localhost:4040";

function cleanActive() {
  if (localStorage.getItem("active")) {
    let option = document.querySelector(localStorage.getItem("active"));
    option.classList.remove("active");
  }
}

function loadPlayerInfo(data) {
  cleanActive();
  let home = document.querySelector("#home");
  home.classList.add("active");
  localStorage.setItem("active", "#home");
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
      } else if (crop.stage === "SELL") {
        let sellCrop = document.createElement("a");
        sellCrop.classList.add("btn");
        sellCrop.classList.add("btn-success");
        sellCrop.textContent = "Sell";
        sellCrop.addEventListener("click", () => {
          REST.default.sellCrop(index);
        });
        cropCardBody.appendChild(sellCrop);
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
        let assignTaskBtn = document.createElement("a");
        assignTaskBtn.classList.add("btn");
        assignTaskBtn.classList.add("btn-success");
        assignTaskBtn.textContent = "Assign Task";
        assignTaskBtn.addEventListener("click", () => {
          assignTask(index);
        });
        workerCardBody.appendChild(assignTaskBtn);
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
  h5.innerText = "Create user";
  cardBody.appendChild(h5);
  let username = document.createElement("input");
  username.type = "text";
  username.name = "username";
  username.id = "username";
  username.placeholder = "Username";
  username.classList.add("form-control");
  username.classList.add("mb-3");
  cardBody.appendChild(username);
  let password = document.createElement("input");
  password.type = "password";
  password.name = "password";
  password.id = "password";
  password.placeholder = "Placeholder";
  password.classList.add("form-control");
  password.classList.add("mb-3");
  cardBody.appendChild(password);
  let btn = document.createElement("a");
  btn.classList.add("btn");
  btn.classList.add("btn-primary");
  btn.textContent = "Send";
  btn.addEventListener("click", () => {
    let user = username.value;
    let pass = password.value;
    REST.default.createPlayer(user, pass);
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
  let btnLogin = document.createElement("a");
  btnLogin.classList.add("btn");
  btnLogin.classList.add("btn-primary");
  btnLogin.textContent = "Login";
  btnLogin.addEventListener("click", () => {
    let user = name.value;
    let pass = password.value;
    REST.default.loginPlayer(user, pass);
  });
  let btnRegister = document.createElement("a");
  btnRegister.classList.add("btn");
  btnRegister.classList.add("btn-primary");
  btnRegister.textContent = "Register";
  btnRegister.classList.add("mx-3");
  btnRegister.addEventListener("click", () => {
    createUser();
  });
  cardBody.appendChild(btnLogin);
  cardBody.appendChild(btnRegister);
  card.appendChild(cardBody);
  col.appendChild(card);
  row.appendChild(col);
  container.appendChild(row);
}

function getContainer() {
  container = document.querySelector("#container");
}

async function assignTask(index, error) {
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

async function buyCrops(error) {
  getContainer();
  container.innerHTML = "";
  let data = await REST.default.getAllCrops();
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
      '<font color="red">Error: ' + error + "</font><br>Buy crops";
  } else {
    title.innerText = "Buy crops";
  }
  titleCol.appendChild(title);
  titleRow.appendChild(titleCol);
  container.append(titleRow);
  let cropsRow = document.createElement("div");
  cropsRow.classList.add("row");
  data.forEach((crop) => {
    let cropCol = document.createElement("div");
    cropCol.classList.add("col-12");
    cropCol.classList.add("col-sm-8");
    cropCol.classList.add("col-md-6");
    cropCol.classList.add("col-lg-4");
    cropCol.classList.add("my-3");
    let cropCard = document.createElement("div");
    cropCard.classList.add("card");
    let cropImg = document.createElement("img");
    cropImg.classList.add("card-img-top");
    cropImg.src = url + crop.imageUrl;
    cropCard.appendChild(cropImg);
    let cropName = document.createElement("h5");
    cropName.classList.add("card-title");
    cropName.classList.add("m-3");
    cropName.innerText = crop.name;
    cropCard.appendChild(cropName);
    let cardBody = document.createElement("div");
    cardBody.classList.add("card-body");
    let price = document.createElement("p");
    price.innerText = "Price: " + crop.buyPrice + "€";
    cardBody.appendChild(price);
    let amount = document.createElement("input");
    amount.type = "number";
    amount.placeholder = 10;
    cardBody.appendChild(amount);
    let buy = document.createElement("a");
    buy.classList.add("btn");
    buy.classList.add("btn-success");
    buy.classList.add("mx-3");
    buy.innerText = "Buy";
    buy.addEventListener("click", () => {
      let am = amount.value;
      if (!am || am <= 0) {
        let error = document.createElement("p");
        error.classList.add("text-danger");
        error.innerText = "Amount not valid";
        cardBody.appendChild(error);
      } else {
        REST.default.buyCrop(crop.id, am);
      }
    });
    cardBody.appendChild(buy);
    cropCard.appendChild(cardBody);
    cropCol.appendChild(cropCard);
    cropsRow.appendChild(cropCol);
  });
  container.append(cropsRow);
}

async function hireWorker(error) {
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
        REST.default.hireWorker(worker.id);
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

export default { createUser, loadPlayerInfo, assignTask, buyCrops, hireWorker };
