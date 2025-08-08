// Import the file or files that contain the examples you want to test
import { runApp } from '../../examples/time-series/sample-app.js';

// The `describe` block is the outer wrapper for all of the individual test cases
describe('Sample app: confirm app works and connects to client', () => {
  // Each `it` block describes an individual test case that can pass or fail
  it('Should return the expected text string when executing the example', async () => {
    const actualReturn = await runApp();
    const expectedReturn =
      'Pinged your deployment. You successfully connected to MongoDB!';
    expect(actualReturn).toStrictEqual(expectedReturn);
  });
});
