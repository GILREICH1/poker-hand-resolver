const { extractFrequencies, findKeyByFrequency } = require("./helpers");
const { cardScores } = require("./constants");

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

function getFOAKCard(valueFrequencies = {}) {
  // const frequencies = extractFrequencies(cardValues);
  const FOAKCard = findKeyByFrequency(valueFrequencies, 4);

  return FOAKCard;
}

function testForFlush(cardSuits = []) {
  const frequencies = extractFrequencies(cardSuits);
  const flushSuit = findKeyByFrequency(frequencies, 5);

  return Boolean(flushSuit);
}

function getTOAKCard(valueFrequencies = {}) {
  // const frequencies = extractFrequencies(cardValues);
  return findKeyByFrequency(valueFrequencies, 3);
}

// returns array of cards that form pairs
//  ["2","2","4","7","J"] => ["2"]
//  ["2","2","4","4","J"] => ["2", "4"]
function getPairsCards(valueFrequencies = {}) {
  // const frequencies = extractFrequencies(cardValues);
  const pairCards = [];
  for (const [key, value] of Object.entries(valueFrequencies)) {
    if (value === 2) {
      pairCards.push(key);
    }
  }
  return pairCards;
}

module.exports = {
  testForStraight,
  getFOAKCard,
  testForFlush,
  getTOAKCard,
  getPairsCards,
};
