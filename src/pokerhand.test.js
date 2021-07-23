const { PokerHand } = require("./pokerhand.js");
const { extractSortedCardValues } = require("./helpers");
const { Result } = require("./constants");
const {
  getStraightScore,
  getFlushScore,
  getThreeOfKindScore,
  getFullHouseScore,
  getFOAKScore,
  getPairScore,
} = require("./handScorers");
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
  it("correctly evaluates pairs scores", () => {
    const pairs = ["T"];
    expect(getPairScore(pairs)).toBe(2.1);
    const twoPair = ["9", "2"];
    expect(getPairScore(twoPair)).toBe(3.09);
  });
});

describe("helper functions", () => {
  it("extractSortedCardValues sorts a hand", () => {
    const hand1 = ["AS", "4S", "6C", "5H", "2D"];
    expect(extractSortedCardValues(hand1)).toEqual(["2", "4", "5", "6", "A"]);
  });
});

describe("PokerHand", () => {
  const pair1 = new PokerHand("AC AH 4S 5S 8C");
  const pair2 = new PokerHand("AS AD 4S 5S 8C");
  const TOAK = new PokerHand("2C 2H 2S 3C 4H");
  const betterTOAK = new PokerHand("AC AH AD 4S 5S");
  const flush = new PokerHand("2C TC 4C 5C 8C");
  const betterFlush = new PokerHand("AC TC 4C 5C 8C");
  const fullHouse = new PokerHand("2C 2H 2S 3S 3C");
  const betterfullHouse = new PokerHand("AC AH AS 3S 3C");

  describe("the cards property of a hand", () => {
    it("a pokerHand instance should have a cards property", () => {
      expect(pair1.cards).toBeDefined();
    });
    it("the cards property of a pokerhand instance should be an array of length 5", () => {
      expect(pair1.cards.length).toBe(5);
    });
  });

  describe("the score property of a hand", () => {
    it("a pokerHand instance should have a score property", () => {
      expect(pair1.score).toBeDefined();
    });
    it("should be a number 0 < n <= 10 ", () => {
      expect(pair1.score).toBeGreaterThan(0);
      expect(pair1.score).toBeLessThanOrEqual(10);
    });
  });

  describe("The compareWith() function", () => {
    describe("basic comparisons", () => {
      it("ties", () => {
        expect(pair1.compareWith(pair2)).toBe(Result.TIE);
      });
      it("wins", () => {
        expect(flush.compareWith(pair1)).toBe(Result.WIN);
      });
      it("loses", () => {
        expect(TOAK.compareWith(flush)).toBe(Result.LOSS);
      });
    });

    describe("resolves first stage ties", () => {
      it("two TOAKs of different value", () => {
        expect(TOAK.compareWith(betterTOAK)).toBe(Result.LOSS);
      });
      it("two flushes of different value", () => {
        expect(flush.compareWith(betterFlush)).toBe(Result.LOSS);
      });
      it("two full houses of different value", () => {
        expect(fullHouse.compareWith(betterfullHouse)).toBe(Result.LOSS);
      });
    });
  });

  describe("second stage ties", () => {
    it("resolve TOAK with different Kickers", () => {
      const TOAK1 = new PokerHand("AC QS KS AC AH");
      const TOAK2 = new PokerHand("AS 5S 6C AS AD");

      expect(TOAK1.compareWith(TOAK2)).toBe(Result.WIN);
    });
  });
});
