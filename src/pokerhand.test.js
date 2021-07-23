const { PokerHand } = require("./pokerhand.js");
const { extractSortedCardValues } = require("./helpers");
const { Result } = require("./constants");
const { getStraightScore } = require("./handScorers");
const {
  testForStraight,
  testForFourOfAKind,
  testForFlush,
} = require("./testsForHands");

describe("testForHands functions", () => {
  it("testForStraight", () => {
    const straight = ["2", "3", "4", "5", "6"];
    const notStraight = ["2", "3", "4", "5", "7"];
    expect(testForStraight(straight)).toBe(true);
    expect(testForStraight(notStraight)).toBe(false);
  });

  it("testForFourOfAKind", () => {
    const FOAK = ["2", "2", "2", "2", "6"];
    const noFOAK = ["2", "2", "2", "5", "6"];
    expect(testForFourOfAKind(FOAK)).toBe(true);
    expect(testForFourOfAKind(noFOAK)).toBe(false);
  });

  it("testForFlush", () => {
    const flush = ["S", "S", "S", "S", "S"];
    const notFlush = ["S", "S", "S", "S", "H"];
    expect(testForFlush(flush)).toBe(true);
    expect(testForFlush(notFlush)).toBe(false);
  });
});

describe("handScorers functions", () => {
  it("straightScore", () => {
    const straight = ["2", "3", "4", "5", "6"];
    expect(getStraightScore(straight)).toBe(5.06);
  });
});

describe("helper functions", () => {
  it("extractSortedCardValues sorts a hand", () => {
    const hand1 = ["AS", "4S", "6C", "5H", "2D"];
    expect(extractSortedCardValues(hand1)).toEqual(["2", "4", "5", "6", "A"]);
  });
});

describe("PokerHand", () => {
  describe("the cards property of a hand", () => {
    const hand1 = new PokerHand("AC AH 4S 5S 8C");
    it("a pokerHand instance should have a cards property", () => {
      expect(hand1.cards).toBeDefined();
    });
    it("the cards property of a pokerhand instance should be an array of length 5", () => {
      expect(hand1.cards.length).toBe(5);
    });
  });

  describe("the score property of a hand", () => {
    const hand1 = new PokerHand("AC AH 4S 5S 8C");
    it("a pokerHand instance should have a score property", () => {
      expect(hand1.score).toBeDefined();
    });
    it("should be a number 0 < n <= 10 ", () => {
      expect(hand1.score).toBeGreaterThan(0);
      expect(hand1.score).toBeLessThanOrEqual(10);
    });
  });

  describe("The compareWith() function", () => {
    const tieHand1 = new PokerHand("AC AH 4S 5S 8C");
    const tieHand2 = new PokerHand("AS AD 4S 5S 8C");
    it("ties", () => {
      expect(tieHand1.compareWith(tieHand2)).toBe(Result.TIE);
    });
  });

  describe("Resolving ties", () => {
    it("resolve TOAK with different Kickers", () => {
      const TOAK1 = new PokerHand("AC QS KS AC AH");
      const TOAK2 = new PokerHand("AS 5S 6C AS AD");

      expect(TOAK1.compareWith(TOAK2)).toBe(Result.WIN);
    });
  });
});
