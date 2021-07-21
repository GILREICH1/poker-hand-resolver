const { PokerHand, Result } = require("./pokerhand.js");

const hand1 = new PokerHand("AC 4S 5S 8C AH");
const hand2 = new PokerHand("4S 5S 8C AS AD");

describe("PokerHand", () => {
  describe("cards", () => {
    it("a pokerHand instance should have a cards property", () => {
      expect(hand1.cards).toBeDefined();
    });
    it("the cards property of a pokerhand instance should be an array of length 5", () => {
      expect(hand1.cards.length).toBe(5);
    });
  });
  describe("compareWith()", () => {
    it("ties", () => {
      expect(hand1.compareWith(hand2)).toBe(Result.TIE);
    });
  });
});
