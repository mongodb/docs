import { quickStartSetup } from '../../examples/time-series/quick-start/quick-start-setup.js';
import {
  runMetaFieldQuery,
  runTimeFieldQuery,
} from '../../examples/time-series/quick-start/quick-start.js';

import { MongoClient } from 'mongodb';
import Expect from '../../utils/Expect.js';

describe('Time series quick start tests', () => {
  beforeEach(async () => {
    const insertedDocCount = await quickStartSetup();
    expect(insertedDocCount).toBe(5);
  });

  afterEach(async () => {
    const uri = process.env.CONNECTION_STRING;
    const client = new MongoClient(uri);
    const db = client.db('timeseries');

    await db.dropDatabase();
    await client.close();
  });

  it('Should return the expected result from the meta field query', async () => {
    const result = await runMetaFieldQuery();
    const outputFilepath =
      'time-series/quick-start/quick-start-meta-field-output.sh';

    Expect.that(result)
      .withUnorderedSort()
      .shouldMatch(outputFilepath);
  });

  it('Should return the expected result from the time field query', async () => {
    const result = await runTimeFieldQuery();
    const outputFilepath =
      'time-series/quick-start/quick-start-time-field-output.sh';

    Expect.that(result)
      .withUnorderedSort()
      .shouldMatch(outputFilepath);
  });
});
