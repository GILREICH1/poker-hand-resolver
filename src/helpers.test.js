const { extractSortedCardValues } = require("./helpers");

describe("helper functions", () => {
  it("extractSortedCardValues sorts a hand", () => {
    const hand1 = ["AS", "4S", "6C", "5H", "2D"];
    expect(extractSortedCardValues(hand1)).toEqual(["2", "4", "5", "6", "A"]);
  });
});
