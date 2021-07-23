const { extractCardSuits, extractSortedCardValues } = require("./helpers");
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
    this.comboCard = getComboCards(this.score);
  }

  compareWith(pokerHand = []) {
    const comboScore2 = pokerHand.score;
    if (this.score > comboScore2) return Result.WIN;
    if (this.score < comboScore2) return Result.LOSS;
    return this.secondStageTieResolver(pokerHand.cards);
  }

  secondStageTieResolver(comparisonCards = []) {
    const thisCardsKickers = extractSortedCardValues(this.cards).filter(
      (cardValue) => cardValue !== this.comboCard
    );
    const comparisonCardsKickers = extractSortedCardValues(
      comparisonCards
    ).filter((cardValue) => cardValue !== this.comboCard);

    return kickerResolver(thisCardsKickers, comparisonCardsKickers);
  }
}

function kickerResolver(nonComboValues1 = [], nonComboValues2 = []) {
  for (let i = 0; i < nonComboValues1.length; i++) {
    if (nonComboValues1[i] !== nonComboValues2) {
      if (cardScores[nonComboValues1[i]] > cardScores[nonComboValues2[i]])
        return Result.WIN;
      if (cardScores[nonComboValues1[i]] < cardScores[nonComboValues2[i]])
        return Result.LOSS;
    }
  }
  return Result.TIE;
}

// 3.11 => "J"
// TODO make this array in case of TwoPair
function getComboCards(totalScore) {
  let integerScore = Math.floor(totalScore);
  let comboCardScore = totalScore - integerScore;
  const sanitizedScore = Math.round(comboCardScore * 100) / 100;
  const comboCard = Object.keys(cardScores).find(
    (score) => cardScores[score] === sanitizedScore
  );
  return comboCard;
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
  // TODO have frequencies generated once here
  const sortedValues = extractSortedCardValues(hand);
  const cardSuits = extractCardSuits(hand);
  const highestCard = sortedValues[4];

  // TEST FOR STRAIGHTFLUSH
  const isFlush = testForFlush(cardSuits);
  const isStraight = testForStraight(sortedValues);
  if (isFlush && isStraight)
    return combinationScores.straightFlush + cardScores[highestCard];

  // TEST FOR FOUR OF A KIND
  const FOAKCard = getFOAKCard(sortedValues);
  if (FOAKCard) return getFOAKScore(FOAKCard);

  // TEST FOR FULL HOUSE
  const TOAKcard = getTOAKCard(sortedValues);
  const pairsArray = getPairsCards(sortedValues);
  if (pairsArray.length !== 0 && TOAKcard) return getFullHouseScore(TOAKcard);

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
