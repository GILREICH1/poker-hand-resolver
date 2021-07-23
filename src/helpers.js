const { cardScores } = require("./constants");

// TODO: move to helpers
function extractFrequencies(arrayOfStrings = []) {
  const frequencies = {};

  for (const string of arrayOfStrings) {
    if (string in frequencies) {
      frequencies[string]++;
    } else {
      frequencies[string] = 1;
    }
  }
  return frequencies;
}

// note: don't use below 3
// TODO: move to helpers
function findKeyByFrequency(frequencies = {}, frequency = 3) {
  for (const [key, value] of Object.entries(frequencies)) {
    if (value === frequency) {
      return key;
    }
  }

  return "";
}

// ['AS', '4S', '6C', '5H', '2D '] => ['2', '4' ,'5' ,'6', 'A']
function extractSortedCardValues(hand = []) {
  return hand
    .map((card) => card.substring(0, 1))
    .sort((a, b) => cardScores[a] - cardScores[b]);
}

// ['AS', '4S', '6C', '5H', '2D '] => ['S', 'S' ,'C' ,'H', 'D']
function extractCardSuits(hand = []) {
  return hand.map((card) => card.substring(1));
}

module.exports = {
  extractFrequencies,
  findKeyByFrequency,
  extractCardSuits,
  extractSortedCardValues,
};
