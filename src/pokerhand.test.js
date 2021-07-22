const { PokerHand, Result } = require("./pokerhand.js");

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
});
