const {
  PokerHand,
  Result,
  extractSortedCardValues,
  testForFlush,
  testForStraight,
  straightScore,
} = require("./pokerhand.js");

const hand1 = new PokerHand("AC 4S 5S 8C AH");
const hand2 = new PokerHand("4S 5S 8C AS AD");

describe("PokerHand", () => {
  describe("the cards property of a hand", () => {
    it("a pokerHand instance should have a cards property", () => {
      expect(hand1.cards).toBeDefined();
    });
    it("the cards property of a pokerhand instance should be an array of length 5", () => {
      expect(hand1.cards.length).toBe(5);
    });
  });

  describe("score", () => {
    it("a pokerHand instance should have a score property", () => {
      expect(hand1.score).toBeDefined();
    });
    it("should be a number 0 < n <= 10 ", () => {
      expect(hand1.score).toBeGreaterThan(0);
      expect(hand1.score).toBeLessThanOrEqual(10);
    });
  });

  describe("compareWith()", () => {
    it("ties", () => {
      expect(hand1.compareWith(hand2)).toBe(Result.TIE);
    });
  });

  it("extractSortedCardValues sorts a hand", () => {
    const hand1 = ["AS", "4S", "6C", "5H", "2D"];
    expect(extractSortedCardValues(hand1)).toEqual(["2", "4", "5", "6", "A"]);
  });

  it("testForStraight", () => {
    const straight = ["2", "3", "4", "5", "6"];
    const notStraight = ["2", "3", "4", "5", "7"];
    expect(testForStraight(straight)).toBe(true);
    expect(testForStraight(notStraight)).toBe(false);
  });

  it.only("straightScore", () => {
    const straight = ["2", "3", "4", "5", "6"];
    expect(straightScore(straight)).toBe(5.06);
  });

  it("testForFlush", () => {
    const flush = ["S", "S", "S", "S", "S"];
    const notFlush = ["S", "S", "S", "S", "H"];
    expect(testForFlush(flush)).toBe(true);
    expect(testForFlush(notFlush)).toBe(false);
  });

  it("resolve TOAK with different Kickers", () => {
    const TOAK1 = new PokerHand("AC QS KS AC AH");
    const TOAK2 = new PokerHand("AS 5S 6C AS AD");

    expect(TOAK1.compareWith(TOAK2)).toBe(Result.WIN);
  });
});
