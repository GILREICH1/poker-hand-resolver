const {
  extractFrequencies,
  findKeyByFrequency,
  extractCardSuits,
  extractSortedCardValues,
} = require("./helpers");
const { Result, combinationScores, cardScores } = require("./constants");
const { getThreeOfKindScore, getStraightScore } = require("./handScorers");
const {
  testForStraight,
  testForFourOfAKind,
  testForFlush,
} = require("./testsForHands");

class PokerHand {
  constructor(cards) {
    this.cards = cards.split(" ");
    this.score = findCombinationScore(this.cards);
  }
  compareWith(pokerHand = []) {
    const comboScore2 = pokerHand.score;
    console.log("combo1", this.score);
    console.log("combo2", comboScore2);

    if (this.score > comboScore2) return Result.WIN;
    if (this.score < comboScore2) return Result.LOSS;
    // determine the kind of tie
    const areBothTOAK =
      Math.floor(this.score) === combinationScores.threeOfAKind;

    if (areBothTOAK) return this.TOAKTieResolver(pokerHand.cards);

    return Result.TIE;
  }

  // 555-89 -> 4.05 combo1 = {name: 'three', cardValue: 4}

  // kicker issue with: pair, 2 pairs, toak, foak
  // in case of two identical TOAK hands
  // table 555A2
  // hand1 a4
  // hand2 23
  // 44446
  // 25
  // A7
  // right now: assumes both are TOAK

  // given 2 hands => give best hand only based on kicker 1 | 0 | -1
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

function findCombinationScore(hand = []) {
  const sortedValues = extractSortedCardValues(hand);
  const cardSuits = extractCardSuits(hand);
  const highestCard = sortedValues[4];

  // TEST FOR STRAIGHTFLUSH
  // TODO: score flush considering tie breaker
  const isFlush = testForFlush(cardSuits);
  const isStraight = testForStraight(sortedValues);
  if (isFlush && isStraight) return combinationScores.straightFlush;

  // TEST FOR FOUR OF A KIND
  const isFOAK = testForFourOfAKind(sortedValues);
  if (isFOAK) return combinationScores.fourOfAKind + cardScores[highestCard];

  // TEST FOR FULL HOUSE
  // TODO make full house function return a score 5.2
  // outside compare 4.7 vs. 11.2 (higher triple wins)
  const TOAKcard = getTOAKCard(sortedValues);
  const numberOfPairs = getPairsCount(sortedValues);
  if (numberOfPairs && TOAKcard) return combinationScores.fullHouse;

  // TEST FOR FLUSH
  if (isFlush) return combinationScores.flush;

  // TEST FOR STRAIGHT
  if (isStraight) return getStraightScore(sortedValues);

  // TEST FOR THREE OF A KIND
  if (TOAKcard) return getThreeOfKindScore(TOAKcard);

  // TEST FOR TWO PAIR
  if (numberOfPairs === 2) return combinationScores.twoPair;

  // TEST FOR A PAIR
  if (numberOfPairs === 1) return combinationScores.pair;

  return cardScores[highestCard];
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
function getTOAKCard(cardValues = []) {
  const frequencies = extractFrequencies(cardValues);
  return findKeyByFrequency(frequencies, 3);
}

module.exports = {
  Result,
  PokerHand,
  extractSortedCardValues,
  testForFlush,
  testForStraight,
  straightScore: getStraightScore,
  testForFourOfAKind,
};
