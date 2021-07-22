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

// TODO
// function checkHandIsValid(hand){}

function compareScoreInTie(){}

function findCombinationScore(hand = []) {
  const sortedValues = extractValues(hand).sort((a, b) =>
    cardScores[a] > cardScores[b] ? 1 : -1
  );
  const cardSuits = extractSuits(hand);
  const highestCard = sortedValues[4];

  const numberOfPairs = testForPairs(sortedValues);
  const flush = testForFlush(cardSuits);
  const straight = testForStraight(sortedValues);
  const threeOfAKind = testForThreeOfAKind(sortedValues);

  if (flush && straight)
    return combinationScores.straightFlush + cardScores[highestCard];
  if (flush) return combinationScores.flush;
  if (testForFourOfAKind(sortedValues))
    return combinationScores.fourOfAKind + cardScores[highestCard];
    if (straight) return straight;
  if (numberOfPairs && threeOfAKind) return combinationScores.fullHouse;
  if (threeOfAKind) return combinationScores.threeOfAKind;
  if (numberOfPairs === 2) return combinationScores.twoPair;
  if (numberOfPairs === 1) return combinationScores.pair;
  return cardScores[highestCard] / 100;
}

function testForPairs(cardValues = []) {
  let numberOfPairsTimesTwo = 0;
  cardValues.forEach((testValue) => {
    if (cardValues.filter((cardValue) => testValue === cardValue).length === 2)
      numberOfPairsTimesTwo++;
  });
  return numberOfPairsTimesTwo / 2;
}

function testForThreeOfAKind(cardValues = []) {
  for (let i = 0; i < cardValues.length; i++) {
    if (cardValues.filter((value) => value === cardValues[i]).length === 3)
      return true;
}
  return false;
}

function testForStraight(cardValues = []) {
  // TODO handle Ace as 1
  for (let i = 0; i < cardValues.length - 1; i++) {
    const currentCard = cardValues[i];
    const nextCard = cardValues[i + 1];
    if (cardScores[nextCard] !== cardScores[currentCard] + 1) return 0;
  }

  return  combinationScores.straight + (cardScores[cardValues[4]] / 100); // prettier-ignore
}

function testForFourOfAKind(cardValues = []) {
  for (let i = 0; i < cardValues.length; i++) {
    if (cardValues.filter((value) => value === cardValues[i]).length === 4)
      return true;
  }
  return false;
}

function testForFlush(cardSuits = []) {
  for (let i = 0; i < cardSuits.length; i++) {
    if (cardSuits.filter((value) => value === cardSuits[i]).length === 5)
      return true;
  }

  return false;
}

function extractValues(hand = []) {
  return hand.map((card) => card.substring(0, 1));
}

function extractSuits(hand = []) {
  return hand.map((card) => card.substring(1));
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

// TODO ace as both low and high
const cardScores = {
  // A: 0,
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
