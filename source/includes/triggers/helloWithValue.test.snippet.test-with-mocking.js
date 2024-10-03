// import the function
const greet = require("../../functions/helloWithValue");

// wrap the mock in beforeEach/afterEach blocks to avoid
// pollution of the global namespace
beforeEach(() => {
  // mock of context.values.get()
  global.context = {
    values: {
      get: (val) => {
        const valsMap = {
          greeting: "magnificent morning",
        };
        return valsMap[val];
      },
    },
  };
});

afterEach(() => {
  // delete the mock to not pollute global namespace
  delete global.context;
});

// test function using mock
test("should greet with value", () => {
  const greeting = greet();
  expect(greeting).toBe("hello magnificent morning");
});
