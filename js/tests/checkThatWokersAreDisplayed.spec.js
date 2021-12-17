import "mocha/mocha.css";
import mocha from "mocha/mocha-es2018";
import chai from "chai";
import * as REST from "../rest/rest.js";

var expect = chai.expect;

export default function checkThatWokersAreDisplayed() {
  mocha.setup("bdd");

  mocha.suite.suites = [];
  mocha.suite._bail = false;

  mocha.cleanReferencesAfterRun(false);

  var playerData = undefined;
  var cols = undefined;

  describe(`Test that workers are displayed on user info page`, () => {
    describe(`Get player data and test that it has content`, () => {
      it(`Get player data`, async function () {
        playerData = await REST.default.fetchPlayerData();
      });
      it(`Test that playerData is not empty`, () => {
        expect(playerData).to.not.be.empty;
      });
    });
    describe(`Test that workers are displayed or that a message appears`, () => {
      it(`Get columns`, () => {
        cols = document.querySelectorAll(".colsToTest");
      });
      it(`Check that there are columns`, () => {
        expect(cols).to.not.be.empty;
      });
      it(`Check that workers are displayed or that a message appears`, () => {
        if (!playerData.workers || playerData.workers.length === 0) {
          expect(cols[0].innerHTML).to.contain("You don't have workers");
        } else {
          cols.forEach((col, index) => {
            let name = col.querySelector(".card-title").innerText;
            expect(name).to.contain(playerData.workers[index].name);
          });
        }
      });
      it(`Check that there are the same columns as workers or one if there are none`, () => {
        if (!playerData.workers || playerData.workers.length === 0) {
          expect(cols).to.have.length(1);
        } else {
          expect(cols).to.have.length(playerData.workers.length);
        }
      });
    });
  });

  mocha.run();
}
