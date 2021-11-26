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

export default async function leaderboard() {
  getContainer();
  container.innerHTML = "";

  let players = await REST.default.getLeaderboard();

  let cadena = `<div class="row justify-content-around">
                    <div class="col-12 col-md-6 col-sm-8">
                        <h2>Leaderboard</h2>
                    </div>
                </div>
                <div class="row justify-content-around">
                    <div class="col-12 col-md-6 col-sm-8">
                        <table class="table">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">First</th>
                                    <th scope="col">Last</th>
                                    <th scope="col">Handle</th>
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
