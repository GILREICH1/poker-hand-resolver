const { combinationScores, cardScores } = require("./constants");

function getPairScore(pairsCards = []) {
  if (!pairsCards) {
    return 0;
  }

  const sortedPairsCard = pairsCards.sort();
  const highestPairCard = sortedPairsCard[pairsCards.length - 1];
  const highestPairScore = cardScores[highestPairCard];

  if (pairsCards.length === 2) {
    return combinationScores.twoPair + highestPairScore;
  } else return combinationScores.pair + highestPairScore;
}

function getThreeOfKindScore(TOAKCard = "") {
  if (!TOAKCard) {
    return 0;
  }

  return combinationScores.threeOfAKind + cardScores[TOAKCard];
}

// returns value of straight plus score of second card in case of tie
//  second card used due to low ace
function getStraightScore(sortedCardValues = []) {
  return combinationScores.straight + cardScores[sortedCardValues[1]];
}

function getFlushScore(sortedCardValues = []) {
  return combinationScores.flush + cardScores[sortedCardValues[4]];
}

function getFullHouseScore(TOAKCard = "") {
  if (!TOAKCard) {
    return 0;
  }
  return combinationScores.fullHouse + cardScores[TOAKCard];
}

function getFOAKScore(FOAKCard = "") {
  if (!FOAKCard) {
    return 0;
  }
  return combinationScores.fourOfAKind + cardScores[FOAKCard];
}

module.exports = {
  getThreeOfKindScore,
  getStraightScore,
  getFlushScore,
  getFullHouseScore,
  getFOAKScore,
  getPairScore,
};
