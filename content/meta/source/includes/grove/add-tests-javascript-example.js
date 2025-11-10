import { loadFilterSampleData } from '../../../examples/aggregation/pipelines/filter/tutorial-setup.js';
import { loadGroupSampleData } from '../../../examples/aggregation/pipelines/group/tutorial-setup.js';
import { runFilterTutorial } from '../../../examples/aggregation/pipelines/filter/tutorial.js';
import { runGroupTutorial } from '../../../examples/aggregation/pipelines/group/tutorial.js';
import { MongoClient } from 'mongodb';
import outputMatchesExampleOutput from '../../../utils/outputMatchesExampleOutput.js';

describe('Aggregation pipeline filter tutorial tests', () => {
  afterEach(async () => {
    const uri = process.env.CONNECTION_STRING;
    const client = new MongoClient(uri);
    const db = client.db('agg_tutorials_db');

    await db.dropDatabase();
    await client.close();
  });

  it('Should return filtered output that includes the three specified person records', async () => {
    await loadFilterSampleData();
    const result = await runFilterTutorial();
    const outputFilepath = 'aggregation/pipelines/filter/tutorial-output.sh';
    const arraysMatch = outputMatchesExampleOutput(outputFilepath, result, {
      comparisonType: 'unordered',
    });
    expect(arraysMatch).toBe(true);
  });

  it('Should return grouped output that includes the three specified customer order records', async () => {
    await loadGroupSampleData();
    const result = await runGroupTutorial();
    const outputFilepath = 'aggregation/pipelines/group/tutorial-output.sh';
    const arraysMatch = outputMatchesExampleOutput(outputFilepath, result, {
      comparisonType: 'unordered',
    });
    expect(arraysMatch).toBe(true);
  });
});
