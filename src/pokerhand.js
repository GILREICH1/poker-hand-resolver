const {
  extractCardSuits,
  extractSortedCardValues,
  extractFrequencies,
} = require("./helpers");
const { Result, combinationScores, cardScores } = require("./constants");
const {
  getThreeOfKindScore,
  getStraightScore,
  getFlushScore,
  getFullHouseScore,
  getFOAKScore,
  getPairScore,
} = require("./handScorers");
const {
  testForStraight,
  getFOAKCard,
  testForFlush,
  getTOAKCard,
  getPairsCards,
} = require("./testsForHands");

class PokerHand {
  constructor(cards) {
    this.cards = cards.split(" ");
    this.score = findCombinationScore(this.cards);
    this.comboName = getCombinationName(this.score);
    this.comboCards = getComboCards(this.score);
  }

  compareWith(pokerHand = []) {
    const comboScore2 = pokerHand.score;
    if (this.score > comboScore2) return Result.WIN;
    if (this.score < comboScore2) return Result.LOSS;
    return this.secondStageTieResolver(pokerHand.cards);
  }

  secondStageTieResolver(comparisonCards = []) {
    const thisCardsKickers = extractSortedCardValues(this.cards).filter(
      (cardValue) => !this.comboCards.includes(cardValue)
    );

    const comparisonCardsKickers = extractSortedCardValues(
      comparisonCards
    ).filter((cardValue) => !this.comboCards.includes(cardValue));

    return kickerResolver(thisCardsKickers, comparisonCardsKickers);
  }
}

function kickerResolver(nonComboValues1 = [], nonComboValues2 = []) {
  // iterate from card with highest score to card with lowest score
  for (let i = nonComboValues1.length - 1; i >= 0; i--) {
    if (nonComboValues1[i] !== nonComboValues2[i]) {
      if (cardScores[nonComboValues1[i]] > cardScores[nonComboValues2[i]])
        return Result.WIN;
      if (cardScores[nonComboValues1[i]] < cardScores[nonComboValues2[i]])
        return Result.LOSS;
    }
  }
  return Result.TIE;
}

// 3.11 => ["J"]
function getComboCards(totalScore, cards) {
  let integerScore = Math.floor(totalScore);
  if (integerScore === 3) {
    const cardValues = extractSortedCardValues(cards);
    return getPairsCards(cardValues);
  }

  let comboCardScore = totalScore - integerScore;
  const sanitizedScore = Math.round(comboCardScore * 100) / 100;
  const comboCard = Object.keys(cardScores).find(
    (score) => cardScores[score] === sanitizedScore
  );
  return [comboCard];
}

function getCombinationName(totalScore) {
  const comboScore = Math.floor(totalScore);
  for (const [comboName, score] of Object.entries(combinationScores)) {
    if (comboScore === score) {
      return comboName;
    }
  }
}

function findCombinationScore(hand = []) {
  const sortedValues = extractSortedCardValues(hand);
  const cardSuits = extractCardSuits(hand);

  const valueFrequencies = extractFrequencies(sortedValues);
  const highestCard = sortedValues[4];

  // TEST FOR STRAIGHTFLUSH
  const isFlush = testForFlush(cardSuits);
  const isStraight = testForStraight(sortedValues);
  if (isFlush && isStraight)
    return combinationScores.straightFlush + cardScores[highestCard];

  // TEST FOR FOUR OF A KIND
  const FOAKCard = getFOAKCard(valueFrequencies);
  if (FOAKCard) return getFOAKScore(FOAKCard);

  // TEST FOR FULL HOUSE
  const TOAKcard = getTOAKCard(valueFrequencies);
  const pairsArray = getPairsCards(valueFrequencies);
  if (pairsArray.length === 1 && TOAKcard) return getFullHouseScore(TOAKcard);

  // TEST FOR FLUSH
  if (isFlush) return getFlushScore(sortedValues);

  // TEST FOR STRAIGHT
  if (isStraight) return getStraightScore(sortedValues);

  // TEST FOR THREE OF A KIND
  if (TOAKcard) return getThreeOfKindScore(TOAKcard);

  // TEST FOR TWO PAIR
  if (pairsArray.length > 0) return getPairScore(pairsArray);

  return cardScores[highestCard];
}

module.exports = {
  PokerHand,
  findCombinationScore,
};
