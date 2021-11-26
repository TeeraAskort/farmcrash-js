import * as REST from "../rest/rest.js";
import checkThatCropsAreDisplayedInBuyPage from "../tests/checkThatCropsAreDisplayedInBuyPage.spec.js";

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

export default async function buyCrops(error) {
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
    cropCol.classList.add("colsToTest");
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
        let errorAmount = document.createElement("p");
        errorAmount.classList.add("text-danger");
        errorAmount.innerText = "Amount not valid";
        cardBody.appendChild(errorAmount);
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

  checkThatCropsAreDisplayedInBuyPage();
}
