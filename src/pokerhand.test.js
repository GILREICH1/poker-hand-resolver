const { PokerHand, Result } = require("./pokerhand.js");

const hand1 = new PokerHand("AC 4S 5S 8C AH");
const hand2 = new PokerHand("4S 5S 8C AS AD");

describe("PokerHand", () => {
  describe("cards", () => {
    it("a pokerHand instance should have a cards property", () => {
      console.log(hand1.cards);
      expect(hand1.cards).toBeDefined();
    });
    it("the cards property of a pokerhand instance should be ", () => {
      expect(hand1.cards).toBeDefined();
    });
  });
  describe("compareWith()", () => {
    it("ties", () => {
      expect(hand1.compareWith(hand2)).toBe(Result.TIE);
    });
  });
});
