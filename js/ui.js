import * as REST from "./rest.js";

let container = undefined;
let url = "http://localhost:8080";

function loadPlayerInfo(data) {
  getContainer();
  container.innerHTML = "";
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

  let cropRow = document.createElement("div");
  cropRow.classList.add("row");
  cropRow.classList.add("justify-content-around");

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
  container.appendChild(cropRow);
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

export default { createUser, loadPlayerInfo };
