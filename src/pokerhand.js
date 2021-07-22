class PokerHand {
  constructor(cards) {
    this.cards = cards.split(" ");
    this.score = findCombinationScore(this.cards);
  }
  compareWith(pokerHand = []) {
    const comboScore2 = pokerHand.score;
    console.log("combo1", this.score);
    console.log("combo2", comboScore2);

    // combination: 'three' -> number
    // let comparisonScore  = combinationScores[combination.name]
    // 'TOA' vs flush
    // scoreName = whichScore('TOA') -> number
    // scoreName = whichScore('flush') -> number
    // if (sameScoreNames) {
    // based on score name
    // getTOAKscore(hand)
    // i need more info ('TOA', cards)
    // }

    if (this.score > comboScore2) return Result.WIN;
    if (this.score < comboScore2) return Result.LOSS;
    // determine the kind of tie
    const areBothTOAK =
      Math.floor(this.score) === combinationScores.threeOfAKind;

    if (areBothTOAK) return this.TOAKTieResolver(pokerHand.cards);

    return Result.TIE;
  }

  // 555-89 -> 4.05 combo1 = {name: 'three', cardValue: 4}

  // kiker issue with: pair, 2 pairs, toak, foak
  // in case of two identical TOAK hands
  // table 555A2
  // hand1 a4
  // hand2 23
  // 44446
  // 25
  // A7
  // right now: assumes both are TOAK

  // given 2 hands => give best hand only based on kiker 1 | 0 | -1
  TOAKTieResolver(comparisonCards = [], combo = "threeOfAKind") {
    const scoreOfTOAKCard = this.score - combinationScores[combo];
    const sanitizedScore = Math.round(scoreOfTOAKCard * 100) / 100;
    const valueOfTOAKCard = Object.keys(cardScores).find(
      (score) => cardScores[score] === sanitizedScore
    );

    // TODO getKickerSum()
    const comparisonCardsKickerScore = extractSortedCardValues(comparisonCards)
      .filter((value) => value !== valueOfTOAKCard)
      .reduce((acc, cur) => acc + cardScores[cur], 0);

    const myCardsKickerScore = extractSortedCardValues(this.cards)
      .filter((value) => value !== valueOfTOAKCard)
      .reduce((acc, cur) => acc + cardScores[cur], 0);

    if (myCardsKickerScore > comparisonCardsKickerScore) return Result.WIN;
    if (myCardsKickerScore < comparisonCardsKickerScore) return Result.LOSS;
    return Result.TIE;
  }
}

// **** ENTRY POINT-ish ****
function findCombinationScore(hand = []) {
  const sortedValues = extractSortedCardValues(hand);
  const cardSuits = extractCardSuits(hand);
  const highestCard = sortedValues[4];

  const threeOfAKindScore = testForThreeOfAKind(sortedValues);
  const isFOAK = testForFourOfAKind(sortedValues);
  const isFlush = testForFlush(cardSuits);
  // TODO: score flush considering tie breaker
  const isStraight = testForStraight(sortedValues);

  if (isFlush && isStraight) return combinationScores.straightFlush;

  if (isFlush) return combinationScores.flush;

  if (isFOAK) return combinationScores.fourOfAKind + cardScores[highestCard];

  if (isStraight) return getStraightScore(sortedValues);

  // is full house?
  // TODO make full house function return a score 5.2
  // outside compare 4.7 vs. 11.2 (higher triple wins)

  // is double pair?
  // function -> 4.6
  // (4.6, 7.8) => 1 | 0 | -1

  // table 555A2

  // hand1 a4
  // hand2 23
  const numberOfPairs = getPairsCount(sortedValues);
  if (numberOfPairs && threeOfAKindScore) return combinationScores.fullHouse;

  if (threeOfAKindScore) return threeOfAKindScore;
  if (numberOfPairs === 2) return combinationScores.twoPair;
  if (numberOfPairs === 1) return combinationScores.pair;

  return cardScores[highestCard];
}

// TODO: move to helpers
function extractFrequencies(arrayOfStrings = []) {
  const frequencies = {};

  for (const string of arrayOfStrings) {
    if (string in frequencies) {
      frequencies[string]++;
    } else {
      frequencies[string] = 1;
    }
  }
  return frequencies;
}

// return score of pairs
// AA432 => [26,0] / 2.26
// 22441 => [4,8]
// 47689 => [0,0]
function getPairsCount(cardValues = []) {
  let numberOfPairsTimesTwo = 0;
  cardValues.forEach((testValue) => {
    if (cardValues.filter((cardValue) => testValue === cardValue).length === 2)
      numberOfPairsTimesTwo++;
  });
  return numberOfPairsTimesTwo / 2;
}

// return score of three of a kind plus score of the triple card
// TODO: separate test and score
function testForThreeOfAKind(cardValues = []) {
  const frequencies = extractFrequencies(cardValues);
  const TOAKCard = findKeyByFrequency(frequencies, 3);

  if (TOAKCard) {
    return combinationScores.threeOfAKind + cardScores[TOAKCard];
  }

  return 0;
}

// note: don't use below 3
// TODO: move to helpers
function findKeyByFrequency(frequencies = {}, frequency = 3) {
  for (const [key, value] of Object.entries(frequencies)) {
    if (value === frequency) {
      return key;
    }
  }

  return "";
}

// note: smallest to biggest
function testForStraight(sortedCardValues = []) {
  for (let i = 0; i < sortedCardValues.length - 1; i++) {
    const currentCard = sortedCardValues[i];
    const nextCard = sortedCardValues[i + 1];
    let scoresDifference = cardScores[nextCard] - cardScores[currentCard];
    scoresDifference = Math.round(scoresDifference * 100) / 100;
    if (scoresDifference !== 0.01) {
      return false;
    }
  }

  return true;
}

// **** COMBINATIONS SCORERS ****

// only called when we have a straight
// returns value of straight plus score of highest card in case of tie
function getStraightScore(cardValues = []) {
  return combinationScores.straight + cardScores[cardValues[4]];
}

// **** SOMETHING ELSE ****

function testForFourOfAKind(cardValues = []) {
  const frequencies = extractFrequencies(cardValues);
  const FOAKCard = findKeyByFrequency(frequencies, 4);

  return Boolean(FOAKCard);
}

function testForFlush(cardSuits = []) {
  const frequencies = extractFrequencies(cardSuits);
  const flushSuit = findKeyByFrequency(frequencies, 5);

  return Boolean(flushSuit);
}

// ['AS', '4S', '6C', '5H', '2D '] => ['2', '4' ,'5' ,'6', 'A']
function extractSortedCardValues(hand = []) {
  return hand
    .map((card) => card.substring(0, 1))
    .sort((a, b) => cardScores[a] - cardScores[b]);
}

function extractCardSuits(hand = []) {
  return hand.map((card) => card.substring(1));
}

//
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

module.exports = {
  Result,
  PokerHand,
  extractSortedCardValues,
  testForFlush,
  testForStraight,
  straightScore: getStraightScore,
  testForFourOfAKind,
};
