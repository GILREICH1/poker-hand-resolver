const { extractSortedCardValues, extractCardSuits } = require("../helpers");

describe("helper functions", () => {
  it("extractSortedCardValues extracts values and sorts a hand", () => {
    const cards = ["AS", "4S", "6C", "5H", "2D"];
    expect(extractSortedCardValues(cards)).toEqual(["2", "4", "5", "6", "A"]);
  });
  it("extractSortedCardValues extracts suits", () => {
    const cards = ["AS", "4S", "6C", "5H", "2D"];
    expect(extractCardSuits(cards)).toEqual(["S", "S", "C", "H", "D"]);
  });
});
