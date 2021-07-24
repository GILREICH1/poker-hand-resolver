const {
  testForStraight,
  getFOAKCard,
  testForFlush,
  getPairsCards,
  getTOAKCard,
} = require("../testsForHands");

describe("testForHands functions", () => {
  it("testForStraight", () => {
    const straight = ["2", "3", "4", "5", "6"];
    const notStraight = ["2", "3", "4", "5", "7"];
    expect(testForStraight(straight)).toBe(true);
    expect(testForStraight(notStraight)).toBe(false);
  });

  it("getFOAKCard", () => {
    const FOAK = {
      2: 4,
      6: 1,
    };
    const noFOAK = {
      2: 3,
      5: 1,
      6: 1,
    };

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
    const TOAK = {
      2: 3,
      3: 1,
      6: 1,
    };
    const noTOAK = {
      2: 2,
      5: 1,
      6: 1,
      J: 1,
    };

    expect(getTOAKCard(TOAK)).toBe("2");
    expect(getTOAKCard(noTOAK)).toBe("");
  });

  it("getPairsCards function", () => {
    const pair = {
      2: 2,
      T: 1,
      3: 1,
      6: 1,
    };
    const noPair = {
      2: 1,
      T: 1,
      5: 1,
      6: 1,
      J: 1,
    };

    expect(getPairsCards(pair)).toEqual(["2"]);
    expect(getPairsCards(noPair)).toEqual([]);

    const twoPair = {
      2: 2,
      T: 2,
      6: 1,
    };

    expect(getPairsCards(twoPair)).toEqual(["2", "T"]);
  });
});
