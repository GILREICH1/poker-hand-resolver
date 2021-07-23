const Result = {
  WIN: 1,
  LOSS: 2,
  TIE: 3,
};

const combinationScores = {
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

// TODO ace as both low and high
const cardScores = {
  // A: 0,
  2: 0.02,
  3: 0.03,
  4: 0.04,
  5: 0.05,
  6: 0.06,
  7: 0.07,
  8: 0.08,
  9: 0.09,
  T: 0.1,
  J: 0.11,
  Q: 0.12,
  K: 0.12,
  A: 0.13,
};

module.exports = { Result, combinationScores, cardScores };
