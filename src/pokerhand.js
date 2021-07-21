class PokerHand {
  constructor(cards) {
    // cards is an array of 5 cards
    this.cards = cards.split(" ");
  }
  compareWith(pokerHand) {
    const combo1 = findCombination(this.cards)
    const combo2 = findCombination(pokerHand)
    // iterate through possible hand values in reverse order
    return Result.TIE;
  }
}

// returns the combination as a numeric value (e.g. 10.3 combinationScore.highCard)
const findCombination = (hand = []) =>{
  if (testForFlush(hand)) return 10;
  return 0;
}

// returns true or false.
const testForFlush = (hand)=>{
  // testForStraight()
  // testForFlush()
  return false;
}

TestForStraight() {

}

const Result = {
  WIN: 1,
  LOSS: 2,
  TIE: 3,
};

const combinationScores = {
  highCard: 1,
  pair: 2,
  twoPair: 3,
  threeOfAKind: 4,
  straight: 5,
  flush: 6,
  fullHouse: 7,
  fourOfAKind: 8,
  straightFlush: 9,
  royalFlush: 10,
};

const cardsInOrder = ["A", 1, 2, 3, 4, 5, 6, 7, 8, 9, "T", "J", "Q", "K", "A"];
// Map of combinations: score


module.exports = { Result, PokerHand };
// export default PokerHand;
