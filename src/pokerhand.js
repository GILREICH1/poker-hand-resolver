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

    // determine the kind of tie
    // TODO SECOND STAGE TIE RESOLVER

    if (this.comboName === "threeOfAKind")
      return this.secondStageTieResolver(pokerHand.cards, this.comboName);

    return Result.TIE;
  }

  secondStageTieResolver(comparisonCards = [], comboName = "pair") {
    const scoreOfTOAKCard = this.score - combinationScores[comboName];
    const sanitizedScore = Math.round(scoreOfTOAKCard * 100) / 100;
    const valueOfTOAKCard = Object.keys(cardScores).find(
      (score) => cardScores[score] === sanitizedScore
    );

    // TODO kickerResolver()
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

// 3.11 => "J"
// TODO make this array in case of TwoPair
function getComboCards(totalScore) {
  let integerScore = Math.floor(totalScore);
  let comboCardScore = totalScore - integerScore;
  const sanitizedScore = Math.round(comboCardScore * 100) / 100;
  const comboCards = Object.keys(cardScores).find(
    (score) => cardScores[score] === sanitizedScore
  );
  return comboCards;
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
