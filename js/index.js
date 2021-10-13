import Cookies from "../node_modules/js-cookie/dist/js.cookie.min.mjs";

(function () {
  "use strict";

  let container = undefined;
  let url = "http://localhost:8080/";

  function loadPlayerInfo(data) {
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

    data.crops.forEach((crop) => {
      let cropCol = document.createElement("div");
      cropCol.classList.add("col-4");
      cropCol.classList.add("col-md-3");
      let cropCard = document.createElement("div");
      cropCard.classList.add("card");
      let cropImg = document.createElement("img");
      cropImg.classList.add("card-img-top");
      cropImg.src(url + crop.imageUrl);
      cropCard.appendChild(cropImg);
      let cropCardBody = document.createElement("div");
      cropCardBody.classList.add("card-body");
      let cropName = document.createElement("h5");
      cropName.classList.add("card-title");
      cropName.innerText = crop.name;
      cropCardBody.appendChild(cropName);
      if (crop.stage === "READYTOFARM") {
        let farmCrop = document.createElement("a");
        farmCrop.classList.add("btn");
        farmCrop.classList.add("btn-success");
        farmCrop.textContent = "Farm";
        cropCardBody.appendChild(farmCrop);
      }
      cropCard.appendChild(cropCardBody);
      cropCol.appendChild(cropCard);
      cropRow.appendChild(cropCol);
    });
  }

  function createUser() {
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
      if (name !== "") {
        let xhr = new XMLHttpRequest();
        xhr.responseType = "";
        xhr.onreadystatechange = () => {
          if (xhr.status == 200 && xhr.readyState == 4) {
            let player = JSON.parse(xhr.responseText);
            Cookies.set("player", player.id);
            loadPlayerInfo(player);
          }
        };
        xhr.open("GET", url + "api/v1/player/create/" + name);
        xhr.send();
      }
    });
    cardBody.appendChild(btn);
    card.appendChild(cardBody);
    col.appendChild(card);
    row.appendChild(col);
    container.appendChild(row);
  }

  function fetchPlayer() {
    let xhr = new XMLHttpRequest();
    xhr.responseType = "";
    xhr.onreadystatechange = () => {
      if (xhr.status == 200 && xhr.readyState == 4) {
        loadPlayerInfo(JSON.parse(xhr.responseText));
      }
    };
    xhr.open("GET", url + "api/v1/player/" + Cookies.get("player"));
    xhr.send();
  }

  function loadUser() {
    if (Cookies.get("player") === undefined) {
      createUser();
    } else {
      fetchPlayer();
    }
  }

  function inicializar() {
    container = document.querySelector("#container");
    loadUser();
  }

  document.addEventListener("DOMContentLoaded", inicializar);
})();
