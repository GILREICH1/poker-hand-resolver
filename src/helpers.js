const { cardScores } = require("./constants");

function extractFrequencies(arrayOfValuesOrSuits = []) {
  const frequencies = {};

  for (const string of arrayOfValuesOrSuits) {
    if (string in frequencies) {
      frequencies[string]++;
    } else {
      frequencies[string] = 1;
    }
  }
  return frequencies;
}

// returns first key of object that has value of specified frequency
function findKeyByFrequency(frequencies = {}, frequency = 3) {
  for (const [key, value] of Object.entries(frequencies)) {
    if (value === frequency) {
      return key;
    }
  }

  return "";
}

function extractSortedCardValues(hand = []) {
  return hand
    .map((card) => card.substring(0, 1))
    .sort((a, b) => cardScores[a] - cardScores[b]);
}

function extractCardSuits(hand = []) {
  return hand.map((card) => card.substring(1).toUpperCase());
}

module.exports = {
  extractFrequencies,
  findKeyByFrequency,
  extractCardSuits,
  extractSortedCardValues,
};
