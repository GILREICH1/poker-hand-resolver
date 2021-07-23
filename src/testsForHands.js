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

module.exports = { testForStraight, testForFourOfAKind, testForFlush };
