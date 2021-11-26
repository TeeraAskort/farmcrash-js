import "mocha/mocha.css";
import mocha from "mocha/mocha-es2018";
import chai from "chai";
import * as REST from "../rest/rest.js";

var expect = chai.expect;

export default function checkThatCropsAreDisplayedInBuyPage() {
  var crops = undefined;
  var cols = undefined;

  mocha.setup("bdd");
  mocha.cleanReferencesAfterRun(false);

  mocha.suite.suites = [];
  mocha.suite._bail = false;

  describe(`Check that crops are displayed on the buy crops page`, () => {
    describe(`Fetch crops and test that it's not empty`, () => {
      it(`Fetch crops`, async function () {
        crops = await REST.default.getAllCrops();
      });
      it(`Check that there are crops fetched`, () => {
        expect(crops).to.not.be.empty;
      });
    });
    describe(`Check that there are crops displayed`, () => {
      it("Get all columns", () => {
        cols = document.querySelectorAll(".colsToTest");
      });
      it(`Check that there are columns`, () => {
        expect(cols).to.not.be.empty;
      });
      it(`Check that there are crops displayed`, () => {
        cols.forEach((col, index) => {
          let name = col.querySelector(".card-title").innerText;
          console.log(name);

          expect(name).to.contain(crops[index].name);
        });
      });
      it(`Check that there are the same columns as crops`, () => {
        expect(cols).to.have.length(crops.length);
      });
    });
  });

  mocha.run();
}
