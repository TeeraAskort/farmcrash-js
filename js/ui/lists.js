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

async function leaderboard() {
  getContainer();
  container.innerHTML = "";

  let players = await REST.default.getLeaderboard();

  let cadena = `<div class="row justify-content-center">
                    <div class="col-12 col-md-6 col-sm-8">
                        <h2>Leaderboard</h2>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col-12 col-md-6 col-sm-8">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">money</th>
                                </tr>
                            </thead>
                            <tbody>`;

  players.forEach((player, index) => {
    cadena += `<tr>
                    <th scope="row">${index + 1}</th>
                    <th>${player.name}</th>
                    <th>${player.money}</th>
                </tr>`;
  });

  cadena += `               </tbody>
                        </table>
                    </div>
                </div>`;

  container.innerHTML = cadena;
}

async function listCrops() {
  getContainer();
  container.innerHTML = "";

  let data = await REST.default.fetchPlayerData();

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
    cropsEmptyCol.classList.add("col-12");
    cropsEmptyCol.classList.add("col-sm-6");
    cropsEmptyCol.classList.add("col-md-3");
    let cropsEmptyH2 = document.createElement("h3");
    cropsEmptyH2.classList.add("text-center");
    cropsEmptyH2.innerText = "You don't have crops";
    cropsEmptyCol.appendChild(cropsEmptyH2);
    cropRow.appendChild(cropsEmptyCol);
  } else {
    data.crops.forEach((crop, index) => {
      let cropCol = document.createElement("div");
      cropCol.classList.add("col-12");
      cropCol.classList.add("col-sm-6");
      cropCol.classList.add("col-md-3");
      cropCol.classList.add("my-3");
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
}

async function listWokers() {
  getContainer();
  container.innerHTML = "";

  let data = await REST.default.fetchPlayerData();

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
  workerRow.classList.add("justify-content-center");

  if (data.workers.length === 0) {
    let workerEmptyCol = document.createElement("div");
    workerEmptyCol.classList.add("col-12");
    workerEmptyCol.classList.add("col-sm-6");
    workerEmptyCol.classList.add("col-md-3");
    workerEmptyCol.classList.add("colsToTest");
    let workerEmptyH2 = document.createElement("h3");
    workerEmptyH2.classList.add("text-center");
    workerEmptyH2.innerText = "You don't have workers";
    workerEmptyCol.appendChild(workerEmptyH2);
    workerRow.appendChild(workerEmptyCol);
  } else {
    data.workers.forEach((worker, index) => {
      let workerCol = document.createElement("div");
      workerCol.classList.add("col-12");
      workerCol.classList.add("col-sm-6");
      workerCol.classList.add("col-md-3");
      workerCol.classList.add("my-3");
      workerCol.classList.add("colsToTest");
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
  container.append(workerRow);
}

async function listItems() {
  getContainer();
  container.innerHTML = "";

  let data = await REST.default.fetchPlayerData();

  let itemH2Row = document.createElement("div");
  itemH2Row.classList.add("row");
  itemH2Row.classList.add("justify-content-center");

  let itemH2Col = document.createElement("div");
  itemH2Col.classList.add("col-6");
  itemH2Col.classList.add("col-md-3");
  itemH2Col.classList.add("my-3");

  let itemH2 = document.createElement("h2");
  itemH2.classList.add("text-center");
  itemH2.innerText = "Items";
  itemH2Col.appendChild(itemH2);
  itemH2Row.appendChild(itemH2Col);
  container.append(itemH2Row);

  let itemRow = document.createElement("div");
  itemRow.classList.add("row");
  itemRow.classList.add("justify-content-center");

  if (data.items.length === 0) {
    let itemEmptyCol = document.createElement("div");
    itemEmptyCol.classList.add("col-12");
    itemEmptyCol.classList.add("col-sm-6");
    itemEmptyCol.classList.add("col-md-3");
    let itemEmptyH2 = document.createElement("h3");
    itemEmptyH2.classList.add("text-center");
    itemEmptyH2.innerText = "You don't have items";
    itemEmptyCol.appendChild(itemEmptyH2);
    itemRow.appendChild(itemEmptyCol);
  } else {
    data.items.forEach((item, index) => {
      let itemCol = document.createElement("div");
      itemCol.classList.add("col-12");
      itemCol.classList.add("col-sm-6");
      itemCol.classList.add("col-md-3");
      itemCol.classList.add("my-3");
      let itemCard = document.createElement("div");
      itemCard.classList.add("card");
      let itemImg = document.createElement("img");
      itemImg.classList.add("card-img-top");
      itemImg.src = url + item.imageUrl;
      itemCard.appendChild(itemImg);
      let itemCardBody = document.createElement("div");
      itemCardBody.classList.add("card-body");
      let itemName = document.createElement("h5");
      itemName.classList.add("card-title");
      itemName.innerText = item.name;
      itemCardBody.appendChild(itemName);
      let itemSellBtn = document.createElement("a");
      itemSellBtn.classList.add("btn");
      itemSellBtn.classList.add("btn-success");
      itemSellBtn.textContent = "Sell";
      itemSellBtn.addEventListener("click", () => {
        REST.default.sellItem(index);
      });
      itemCardBody.appendChild(itemSellBtn);
      itemCard.appendChild(itemCardBody);
      itemCol.appendChild(itemCard);
      itemRow.appendChild(itemCol);
    });
  }
  container.append(itemRow);
}

export default { leaderboard, listCrops, listWokers, listItems };
