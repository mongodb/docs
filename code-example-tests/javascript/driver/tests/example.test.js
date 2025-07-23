// Import the file or files that contain the examples you want to test
import { yourExampleName } from '../examples/example-stub.js';

// The `describe` block is the outer wrapper for all of the individual test cases
describe('Example tests: show output printed to the console and return a value', () => {
  // The beforeEach block runs before every `it` block in this file
  beforeEach(async () => {
    //await loadSampleData();
  });

  // The afterEach block runs after every `it` block in this file
  afterEach(async () => {
    // const uri = process.env.CONNECTION_STRING;
    // const client = new MongoClient(uri);
    // const db = client.db("your-db-name");
    // await db.dropDatabase();
    // await client.close();
  });

  // Each `it` block describes an individual test case that can pass or fail
  it('Should return the expected text string when executing the example', async () => {
    const actualReturn = await yourExampleName();
    const expectedReturn = 'some output to verify in a test';

    // Insert your logic to verify the output matches your expectations
  });

  // Define as many `it` blocks as you need to test related code examples
});
