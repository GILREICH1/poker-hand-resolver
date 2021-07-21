class PokerHand {
  constructor(cards) {
    // cards is an array of strings e.g. 5H
    this.cards = cards;
  }
  compareWith(pokerHand) {
    const combo1 = findCombinationScore(this.cards.split(" "));
    const combo2 = findCombinationScore(pokerHand.cards.split(" "));
    if (combo1 > combo2) return Result.WIN;
    else if (combo1 < combo2) return Result.LOSS;
    else return Result.TIE;
  }
}

function findCombinationScore(hand = []) {
  if (testForStraight(hand)) return combinationScores.straight;
  if (testForThreeOfAKind(hand)) return combinationScores.threeOfAKind;
  if (testForPairs(hand) === 2) return combinationScores.twoPair;
  if (testForPairs(hand) === 1) return combinationScores.pair;
  return 0;
}

function testForPairs(hand = []) {
  const cardValues = extractValues(hand);
  let numberOfPairsTimesTwo = 0;
  cardValues.forEach((cardValue) => {
    if (cardValues.indexOf(cardValue) !== cardValues.lastIndexOf(cardValue)) {
      numberOfPairsTimesTwo++;
    }
  });
  return numberOfPairsTimesTwo / 2;
}
function testForThreeOfAKind(hand = []) {
  const cardValues = extractValues(hand);
  let result = false;
  cardValues.forEach((testValue) => {
    if (cardValues.filter((cardValue) => testValue === cardValue).length === 3)
      result = true;
  });
  return result;
}
function testForStraight(hand = []) {
  const values = extractValues(hand);
  values.sort((a, b) => (cardsInOrder[a] > cardsInOrder[b] ? 1 : -1));
  for (let i = 0; i < values.length - 1; i++) {
    const currentCard = values[i];
    const nextCard = values[i + 1];
    if (cardsInOrder[nextCard] !== cardsInOrder[currentCard] + 1) return false;
  }
  return true;
}

TestForStraight() {

function extractValues(hand) {
  return hand.map((card) => card.substring(0, 1));
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

const cardsInOrder = {
  A: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  T: 10,
  J: 11,
  Q: 12,
  K: 12,
  A: 13,
};


module.exports = { Result, PokerHand };
// export default PokerHand;
