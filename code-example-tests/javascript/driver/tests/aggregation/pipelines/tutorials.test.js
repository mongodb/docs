import { loadFilterSampleData } from '../../../examples/aggregation/pipelines/filter/tutorial-setup.js';
import { loadGroupSampleData } from '../../../examples/aggregation/pipelines/group/tutorial-setup.js';
import { loadUnwindSampleData } from '../../../examples/aggregation/pipelines/unwind/tutorial-setup.js';
import { loadJoinOneToOneSampleData } from '../../../examples/aggregation/pipelines/join-one-to-one/tutorial-setup.js';
import { loadJoinMultiFieldSampleData } from '../../../examples/aggregation/pipelines/join-multi-field/tutorial-setup.js';
import { run } from '../../../examples/aggregation/pipelines/template-app.js';
import { runFilterTutorial } from '../../../examples/aggregation/pipelines/filter/tutorial.js';
import { runGroupTutorial } from '../../../examples/aggregation/pipelines/group/tutorial.js';
import { runUnwindTutorial } from '../../../examples/aggregation/pipelines/unwind/tutorial.js';
import { runJoinOneToOneTutorial } from '../../../examples/aggregation/pipelines/join-one-to-one/tutorial.js';
import { runJoinMultiFieldTutorial } from '../../../examples/aggregation/pipelines/join-multi-field/tutorial.js';
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

  it('Should return a basic document when executing the template app', async () => {
    const result = await run();
    expect(result[0]['name']).toStrictEqual('sample2');
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

  it('Should return unpacked output grouped by product name', async () => {
    await loadUnwindSampleData();
    const result = await runUnwindTutorial();
    const outputFilepath = 'aggregation/pipelines/unwind/tutorial-output.sh';
    const arraysMatch = outputMatchesExampleOutput(outputFilepath, result, {
      comparisonType: 'unordered',
    });
    expect(arraysMatch).toBe(true);
  });

  it('Should return joined data with the customer product name and category', async () => {
    await loadJoinOneToOneSampleData();
    const result = await runJoinOneToOneTutorial();
    const outputFilepath =
      'aggregation/pipelines/join-one-to-one/tutorial-output.sh';
    const arraysMatch = outputMatchesExampleOutput(outputFilepath, result, {
      comparisonType: 'unordered',
    });
    expect(arraysMatch).toBe(true);
  });

  it('Should return joined data based on multiple fields', async () => {
    await loadJoinMultiFieldSampleData();
    const result = await runJoinMultiFieldTutorial();
    const outputFilepath =
      'aggregation/pipelines/join-multi-field/tutorial-output.sh';
    const arraysMatch = outputMatchesExampleOutput(outputFilepath, result, {
      comparisonType: 'unordered',
    });
    expect(arraysMatch).toBe(true);
  });
});
