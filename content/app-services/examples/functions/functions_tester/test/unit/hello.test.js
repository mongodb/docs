// :snippet-start: greeting-test
const { greet, greetWithPunctuation } = require("../../functions/hello");

test("should greet", () => {
  const helloWorld = greet("world");
  expect(helloWorld).toBe("hello world");
});

test("should greet with punctuation", () => {
  const excitedHelloWorld = greetWithPunctuation("world", "!!!");
  expect(excitedHelloWorld).toBe("hello world!!!");
});
// :snippet-end:
