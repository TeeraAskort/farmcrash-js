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

function createUser(error) {
  getContainer();
  container.innerHTML = "";
  let row = document.createElement("div");
  row.classList.add("row");
  row.classList.add("justify-content-center");
  let col = document.createElement("div");
  col.classList.add("col-md-6");
  col.classList.add("col-sm-8");
  col.classList.add("col-12");
  let card = document.createElement("div");
  card.classList.add("card");
  let cardBody = document.createElement("div");
  cardBody.classList.add("card-body");
  let h5 = document.createElement("h5");
  h5.classList.add("card-title");
  if (error) {
    h5.innerHTML = '<font color="red">' + error + "</font><br>Create user";
  } else {
    h5.innerText = "Create user";
  }
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
  password.placeholder = "Password";
  password.classList.add("form-control");
  password.classList.add("mb-3");
  cardBody.appendChild(password);
  let passwordRepeat = document.createElement("input");
  passwordRepeat.type = "password";
  passwordRepeat.name = "password";
  passwordRepeat.id = "password";
  passwordRepeat.placeholder = "Repeat password";
  passwordRepeat.classList.add("form-control");
  passwordRepeat.classList.add("mb-3");
  cardBody.appendChild(passwordRepeat);
  let btn = document.createElement("a");
  btn.classList.add("btn");
  btn.classList.add("btn-primary");
  btn.textContent = "Send";
  btn.addEventListener("click", () => {
    let user = username.value;
    let pass = password.value;
    let passR = passwordRepeat.value;
    if (pass === passR) {
      REST.default.createPlayer(user, pass, passR);
    } else {
      createUser("Passwords do not match");
    }
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
  row.classList.add("justify-content-center");
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

export default { createUser, login };
