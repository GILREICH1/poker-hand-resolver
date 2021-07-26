const {
  extractCardSuits,
  extractSortedCardValues,
  extractFrequencies,
} = require("./helpers");
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
const { Result, combinationScores, cardScores } = require("./constants");

class PokerHand {
  constructor(cards = "") {
    this.cards = cards.split(" ");
    this.score = findCombinationScore(this.cards);
    this.comboName = getCombinationName(this.score);
    this.comboCards = getComboCards(this.score, this.cards);
  }

  compareWith(pokerHand = {}) {
    const comboScore2 = pokerHand.score;
    if (this.score > comboScore2) return Result.WIN;
    if (this.score < comboScore2) return Result.LOSS;
    else return secondStageTieResolver(this, pokerHand);
  }
}

// return score of given an array of cards
// ["JS", "JH", "JC", "2D", "3D"]  => 4.11
function findCombinationScore(cards = []) {
  const sortedValues = extractSortedCardValues(cards);
  const cardSuits = extractCardSuits(cards);

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

// resolves the winning hand given two hands with the same score
function secondStageTieResolver(myPokerHand, comparisonPokerHand) {
  const thisCardsKickers = extractSortedCardValues(myPokerHand.cards).filter(
    (cardValue) => !myPokerHand.comboCards.includes(cardValue)
  );

  const comparisonCardsKickers = extractSortedCardValues(
    comparisonPokerHand.cards
  ).filter((cardValue) => !myPokerHand.comboCards.includes(cardValue));

  return kickerResolver(thisCardsKickers, comparisonCardsKickers);
}

function getCombinationName(totalScore) {
  const comboScore = Math.floor(totalScore);
  for (const [comboName, score] of Object.entries(combinationScores)) {
    if (comboScore === score) {
      return comboName;
    }
  }
}

// extracts card/s that forms the combo
// 4.11, ["JS", "JH", "JC", "2D", "3D"] => ["J"]
function getComboCards(totalScore, cards) {
  const integerScore = Math.floor(totalScore);
  if (integerScore === 3) {
    const cardValues = extractSortedCardValues(cards);
    const valueFrequencies = extractFrequencies(cardValues);
    return getPairsCards(valueFrequencies);
  }

  const comboCardScore = totalScore - integerScore;
  const sanitizedScore = Math.round(comboCardScore * 100) / 100;
  const comboCard = Object.keys(cardScores).find(
    (score) => cardScores[score] === sanitizedScore
  );
  return [comboCard];
}

// resolves the winning hand given an array of kickers
function kickerResolver(kicker1 = [], kickers2 = []) {
  // iterate from card with highest score to card with lowest score
  for (let i = kicker1.length - 1; i >= 0; i--) {
    if (kicker1[i] !== kickers2[i]) {
      if (cardScores[kicker1[i]] > cardScores[kickers2[i]]) return Result.WIN;
      if (cardScores[kicker1[i]] < cardScores[kickers2[i]]) return Result.LOSS;
    }
  }
  return Result.TIE;
}

module.exports = {
  PokerHand,
  findCombinationScore,
};
