import { runStableAPIConnect } from '../../examples/connect/stable-api-connect.js';
import { MongoClient } from 'mongodb';
import Expect from '../../utils/Expect.js';

describe('Stable API connection test', () => {
  afterEach(async () => {
    const uri = process.env.CONNECTION_STRING;
    const client = new MongoClient(uri);
    await client.close();
  });

  it('Should return a successful response from the ping command', async () => {
    const result = await runStableAPIConnect();

    // Verify that the ping command returned successfully
    Expect.that(result.ok).shouldMatch(1);
  });
});
