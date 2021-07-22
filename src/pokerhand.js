class PokerHand {
  constructor(cards) {
    this.cards = cards.split(" ");
    this.score = this.findCombinationScore(this.cards);
  }
  compareWith(pokerHand) {
    const comboScore2 = this.findCombinationScore(pokerHand.cards.split(" "));
    if (this.score > comboScore2) return Result.WIN;
    if (this.score < comboScore2) return Result.LOSS;
    // determine the kind of tie
    const areBothTOAK =
      Math.floor(this.score) === combinationScores.threeOfAKind;

    if (areBothTOAK) return this.TOAKTieResolver(pokerHand.cards);

    return Result.TIE;
  }

  // TO DO checkHandIsValid(hand){}

  findCombinationScore(hand = []) {
    const sortedValues = extractValues(hand).sort((a, b) =>
      cardScores[a] > cardScores[b] ? 1 : -1
    );
    const cardSuits = extractSuits(hand);
    const highestCard = sortedValues[4];

    const numberOfPairs = testForPairs(sortedValues);
    const flush = testForFlush(cardSuits);
    const straight = testForStraight(sortedValues);
    const threeOfAKind = testForThreeOfAKind(sortedValues);

    if (flush && straight) return combinationScores.straightFlush;
    if (flush) return combinationScores.flush;
    if (testForFourOfAKind(sortedValues))
      return combinationScores.fourOfAKind + cardScores[highestCard];
    if (straight) return straight;
    if (numberOfPairs && threeOfAKind) return combinationScores.fullHouse;
    if (threeOfAKind) return combinationScores.threeOfAKind;
    if (numberOfPairs === 2) return combinationScores.twoPair;
    if (numberOfPairs === 1) return combinationScores.pair;
    return cardScores[highestCard];
  }
  TOAKTieResolver(comparisonCards = [], combo = "threeOfAKind") {
    const scoreOfTOAKCard = this.score - combinationScores[combo];
    const sanitizedScore = Math.round(scoreOfTOAKCard * 100) / 100;
    const valueOfTOAKCard = Object.keys(cardScores).find(
      (score) => cardScores[score] === sanitizedScore
    );

    // TODO getKickerSum()
    const comparisonCardsKickerScore = extractValues(comparisonCards)
      .filter((value) => value !== valueOfTOAKCard)
      .reduce((acc, cur) => acc + cardScores[cur], 0);

    const myCardsKickerScore = extractValues(this.cards)
      .filter((value) => value !== valueOfTOAKCard)
      .reduce((acc, cur) => acc + cardScores[cur], 0);

    if (myCardsKickerScore > comparisonCardsKickerScore) return Result.WIN;
    if (myCardsKickerScore < comparisonCardsKickerScore) return Result.LOSS;
    return Result.TIE;
  }
}

function findCombinationScore(hand = []) {
  const sortedValues = extractValues(hand).sort((a, b) =>
    cardScores[a] > cardScores[b] ? 1 : -1
  );
  const cardSuits = extractSuits(hand);
  const highestCard = sortedValues[4];

  const numberOfPairs = testForPairs(sortedValues);
  // [,] -> numberOfPairs
  const threeOfAKindScore = testForThreeOfAKind(sortedValues);

  // Test for straightFlush
  const flush = testForFlush(cardSuits);
  const straight = straightScore(sortedValues);
  if (flush && straight) return combinationScores.straightFlush;

  if (flush) return combinationScores.flush;

  if (testForFourOfAKind(sortedValues))
    return combinationScores.fourOfAKind + cardScores[highestCard];

  if (straight) return straight;

  // is full house?
  // TODO make full house function return a score 5.2
  // outside compare 4.7 vs. 11.2 (higher triple wins)

  // is double pair?
  // function -> 4.6
  // (4.6, 7.8) => 1 | 0 | -1

  // table 555A2

  // hand1 a4
  // hand2 23
  if (numberOfPairs && threeOfAKindScore) return combinationScores.fullHouse;

  if (threeOfAKindScore) return threeOfAKindScore;
  if (numberOfPairs === 2) return combinationScores.twoPair;
  if (numberOfPairs === 1) return combinationScores.pair;

  return cardScores[highestCard];
}

function testForPairs(cardValues = []) {
  let numberOfPairsTimesTwo = 0;
  cardValues.forEach((testValue) => {
    if (cardValues.filter((cardValue) => testValue === cardValue).length === 2)
      numberOfPairsTimesTwo++;
  });
  return numberOfPairsTimesTwo / 2;
}

// return score of three of a kind plus score of the triple card
function testForThreeOfAKind(cardValues = []) {
  const frequencies = {};

  for (const cardValue of cardValues) {
    if (cardValue in frequencies) {
      frequencies[cardValue]++;
    } else {
      frequencies[cardValue] = 1;
    }
  }

  // find card that forms TOAK
  let TOAKCard = "";
  Object.entries(frequencies).forEach(([key, value]) => {
    if (value === 3) {
      TOAKCard = key;
    }
  });

  if (TOAKCard) {
    return combinationScores.threeOfAKind + cardScores[TOAKCard];
  }

  return 0;
}

// returns value of straight plus score of highest card in case of tie
function testForStraight(cardValues = []) {
  // TODO handle Ace as 1
  for (let i = 0; i < cardValues.length - 1; i++) {
    const currentCard = cardValues[i];
    const nextCard = cardValues[i + 1];
    if (cardScores[nextCard] !== cardScores[currentCard] + 1) return 0;
  }

  return combinationScores.straight + cardScores[cardValues[4]];
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

// ['AS', '4S', '6C', '5H', '2D '] => ['2', '4' ,'5' ,'6', 'A']
function extractSortedCardValues(hand = []) {
  return hand
    .map((card) => card.substring(0, 1))
    .sort((a, b) => cardScores[a] - cardScores[b]);
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

module.exports = { Result, PokerHand };
// export default PokerHand;
