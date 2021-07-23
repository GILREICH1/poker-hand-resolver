const { combinationScores, cardScores } = require("./constants");

function getThreeOfKindScore(TOAKCard = "") {
  if (!TOAKCard) {
    return 0;
  }

  return combinationScores.threeOfAKind + cardScores[TOAKCard];
}

// returns value of straight plus score of highest card in case of tie
function getStraightScore(cardValues = []) {
  return combinationScores.straight + cardScores[cardValues[4]];
}

module.exports = { getThreeOfKindScore, getStraightScore };
