class PokerHand {
  compareWith(pokerHand) {
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
