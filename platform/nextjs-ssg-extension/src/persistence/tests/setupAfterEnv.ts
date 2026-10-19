beforeAll(() => {
  // Disable console.time from crowding test output
  console.time = jest.fn();
  global.structuredClone = (val) => JSON.parse(JSON.stringify(val));
});
