const { PokerHand } = require("./pokerhand.js");
const { Result } = require("./constants");

describe("PokerHand", () => {
  const pair1 = new PokerHand("AC AH 4S 5S 8C");
  const pair2 = new PokerHand("AS AD 4S 5S 8C");

  const TOAK = new PokerHand("2C 2H 2S 3C 4H");
  const betterTOAK = new PokerHand("AC AH AD KS QH");

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

  describe("the comboCards property of a hand", () => {
    it("comboCards property present", () => {
      expect(pair1.comboCards).toBeDefined();
    });
    it("should be the correct comboCards", () => {
      expect(pair1.comboCards).toEqual(["A"]);
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
        expect(TOAK.compareWith(fullHouse)).toBe(Result.LOSS);
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
    it("resolves TOAK with different Kickers", () => {
      const worseTOAKByKickers = new PokerHand("2C 2H 2D JS QH");
      const betterTOAKByKickers = new PokerHand("2C 2H 2D KS QH");

      expect(betterTOAKByKickers.compareWith(worseTOAKByKickers)).toBe(
        Result.WIN
      );
      expect(worseTOAKByKickers.compareWith(betterTOAKByKickers)).toBe(
        Result.LOSS
      );
      expect(TOAK.compareWith(TOAK)).toBe(Result.TIE);
    });

    it("resolves flush with same highest card", () => {
      const worseFlushByKickers = new PokerHand("AC 2C 5C TC QC");
      const betterFlushByKickers = new PokerHand("AC 2C 5C TC KC");

      expect(betterFlushByKickers.compareWith(worseFlushByKickers)).toBe(
        Result.WIN
      );
      expect(worseFlushByKickers.compareWith(betterFlushByKickers)).toBe(
        Result.LOSS
      );
    });

    it("resolves full house with same TOAK", () => {
      const worseFHByKickers = new PokerHand("2C 2H 2D TS TH");
      const betterFHByKickers = new PokerHand("2C 2H 2D QS QH");

      expect(betterFHByKickers.compareWith(worseFHByKickers)).toBe(Result.WIN);
      expect(worseFHByKickers.compareWith(betterFHByKickers)).toBe(Result.LOSS);
    });

    it("resolves FOAK by kickers", () => {
      const worseFOAKByKickers = new PokerHand("2C 2H 2D 2S TH");
      const betterFOAKByKickers = new PokerHand("2C 2H 2D 2S QH");

      expect(betterFOAKByKickers.compareWith(worseFOAKByKickers)).toBe(
        Result.WIN
      );
      expect(worseFOAKByKickers.compareWith(betterFOAKByKickers)).toBe(
        Result.LOSS
      );
    });

    it("resolves pairs by kickers", () => {
      const betterPairByKickers = new PokerHand("AC AH 3S 4S 8C");
      const worsepairByKickers = new PokerHand("AC AH 3S 4S 6C");

      expect(betterPairByKickers.compareWith(worsepairByKickers)).toBe(
        Result.WIN
      );
      expect(worsepairByKickers.compareWith(betterPairByKickers)).toBe(
        Result.LOSS
      );
    });
    it("resolves twoPair by kicker", () => {
      const worseTwoPairByKicker = new PokerHand("AC AH 4S 4S 6C");
      const betterTwoPairByKicker = new PokerHand("AC AH 4S 4S 8C");

      expect(betterTwoPairByKicker.compareWith(worseTwoPairByKicker)).toBe(
        Result.WIN
      );
      expect(worseTwoPairByKicker.compareWith(betterTwoPairByKicker)).toBe(
        Result.LOSS
      );
    });
  });
});
