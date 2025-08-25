function greet() {
  const greeting = context.values.get("greeting"); // the greeting is 'beautiful world'
  return "hello " + greeting;
}

exports = greet;

if (typeof module !== "undefined") {
  module.exports = greet;
}
