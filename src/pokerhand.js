class PokerHand {
  constructor(cards) {
    this.cards = cards.split(" ");
  }
  // create an array from args
  compareWith(pokerHand) {
    // compare with iterate thru array
    // iterate through possible hand values in reverse order
    return Result.TIE;
  }
}

const Result = {
  WIN: 1,
  LOSS: 2,
  TIE: 3,
};

module.exports = { Result, PokerHand };
// export default PokerHand;
