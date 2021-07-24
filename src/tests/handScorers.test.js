const {
  getStraightScore,
  getFlushScore,
  getThreeOfKindScore,
  getFullHouseScore,
  getFOAKScore,
  getPairScore,
} = require("../handScorers");

describe("handScorers functions", () => {
  it("correctly evaluates a TOAK score", () => {
    const TOAKCard = "T";
    expect(getThreeOfKindScore(TOAKCard)).toBe(4.1);
  });
  it("correctly evaluates a straight Score", () => {
    const straight = ["2", "3", "4", "5", "6"];
    expect(getStraightScore(straight)).toBe(5.06);
  });
  it("correctly evaluates a flush score", () => {
    const flush = ["2", "3", "4", "5", "6"];
    expect(getFlushScore(flush)).toBe(6.06);
  });
  it("correctly evaluates a Full house score", () => {
    const TOAKCard = "T";
    expect(getFullHouseScore(TOAKCard)).toBe(7.1);
  });
  it("correctly evaluates a Four of a Kind score", () => {
    const FOAKCard = "T";
    expect(getFOAKScore(FOAKCard)).toBe(8.1);
  });
  it("correctly evaluates pair and two pair scores", () => {
    const pairs = ["T"];
    expect(getPairScore(pairs)).toBe(2.1);
    const twoPair = ["9", "2"];
    expect(getPairScore(twoPair)).toBe(3.09);
  });
});
