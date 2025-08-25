function greet(word) {
  return "hello " + word;
}

function greetWithPunctuation(word, punctuation) {
  return greet(word) + punctuation;
}

// Function exported to App Services
exports = greetWithPunctuation;

// export locally for use in unit test
if (typeof module !== "undefined") {
  module.exports = { greet, greetWithPunctuation };
}
