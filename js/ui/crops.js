import * as REST from "../rest/rest.js";
import checkThatCropsAreDisplayedInBuyPage from "../tests/checkThatCropsAreDisplayedInBuyPage.spec.js";
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

export default async function buyCrops(error) {
  getContainer();
  container.innerHTML = "";
  let data = await REST.default.getAllCrops();

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
  searchInput.placeholder = "Search for crops";
  searchForm.appendChild(searchInput);
  searchCol.appendChild(searchForm);
  searchRow.appendChild(searchCol);
  container.appendChild(searchRow);

  drawCrops(data, error);

  // searchInput.addEventListener("focusin", () => {
  //   document.addEventListener("keydown", () => {
  //     let searchText = searchInput.value.trim();
  //     let resultData = search(searchText, data);
  //     container.removeChild(container.querySelector(".rowToRemove"));
  //     container.removeChild(container.querySelector(".rowToRemove"));
  //     drawCrops(resultData);
  //   });
  // });

  const fetchCrops = (searchText) => {
    const fetchedCrops =
      !searchText || searchText.length == 0
        ? data
        : data.filter((crop) =>
            crop.name.toLowerCase().includes(searchText.toLowerCase())
          );
    return of(fetchedCrops);
  };

  let search$ = fromEvent(searchInput, "keyup").pipe(
    map((event) => event.target.value),
    distinctUntilChanged(),
    debounceTime(150),
    switchMap((searchText) => fetchCrops(searchText))
  );

  search$.subscribe((crops) => {
    container.removeChild(container.querySelector(".rowToRemove"));
    container.removeChild(container.querySelector(".rowToRemove"));
    drawCrops(crops);
  });

  checkThatCropsAreDisplayedInBuyPage();
}

// function search(searchText, crops) {
//   return crops.filter((crop) =>
//     crop.name.toLowerCase().includes(searchText.toLowerCase())
//   );
// }

function drawCrops(crops, error) {
  let titleRow = document.createElement("div");
  titleRow.classList.add("row");
  titleRow.classList.add("justify-content-around");
  titleRow.classList.add("rowToRemove");
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
  cropsRow.classList.add("justify-content-center");
  cropsRow.classList.add("rowToRemove");
  crops.forEach((crop) => {
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
    price.innerText = "Price: " + crop.buyPrice + "???";
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
}
