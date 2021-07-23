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
