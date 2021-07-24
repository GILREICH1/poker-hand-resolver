const {
  testForStraight,
  getFOAKCard,
  testForFlush,
  getPairsCards,
  getTOAKCard,
} = require("./testsForHands");

describe("testForHands functions", () => {
  it("testForStraight", () => {
    const straight = ["2", "3", "4", "5", "6"];
    const notStraight = ["2", "3", "4", "5", "7"];
    expect(testForStraight(straight)).toBe(true);
    expect(testForStraight(notStraight)).toBe(false);
  });

  it("getFOAKCard", () => {
    const FOAK = ["2", "2", "2", "2", "6"];
    const noFOAK = ["2", "2", "2", "5", "6"];
    expect(getFOAKCard(FOAK)).toBe("2");
    expect(getFOAKCard(noFOAK)).toBe("");
  });

  it("testForFlush function", () => {
    const flush = ["S", "S", "S", "S", "S"];
    const notFlush = ["S", "S", "S", "S", "H"];
    expect(testForFlush(flush)).toBe(true);
    expect(testForFlush(notFlush)).toBe(false);
  });

  it("getTOAKCard", () => {
    const TOAK = ["2", "2", "2", "3", "6"];
    const noTOAK = ["2", "2", "3", "5", "6"];
    expect(getTOAKCard(TOAK)).toBe("2");
    expect(getTOAKCard(noTOAK)).toBe("");
  });

  it("getPairsCards function", () => {
    const pair = ["2", "2", "3", "4", "5"];
    const notPair = ["A", "2", "3", "4", "5"];
    expect(getPairsCards(pair)).toEqual(["2"]);
    expect(getPairsCards(notPair)).toEqual([]);

    const twoPair = ["2", "2", "3", "3", "4", "5"];
    expect(getPairsCards(twoPair)).toEqual(["2", "3"]);
  });
});
