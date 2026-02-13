import {
  createAndUseSecondaryIndex,
  createAndUseCompoundIndexes,
  createAndUseGeospatialIndex,
  cleanup,
} from '../../examples/time-series/secondary-indexes/secondary-indexes.js';

import Expect from '../../utils/Expect.js';

describe('Secondary indexes on time series collections', () => {
  afterAll(async () => {
    await cleanup();
  });

  it('Should create and use a secondary index for sorting', async () => {
    const { result, explainResult } = await createAndUseSecondaryIndex();

    // Verify the result matches expected output (ignoring _id field)
    const outputFilepath =
      'time-series/secondary-indexes/secondary-index-output.sh';
    Expect.that(result).withIgnoredFields('_id').shouldMatch(outputFilepath);

    // Verify the explain result uses the expected index scan type
    Expect.that(explainResult)
      .shouldResemble(
        'time-series/secondary-indexes/secondary-index-explain-output.sh'
      )
      .withSchema({
        count: 1,
        requiredFields: ['stages[0].$cursor.queryPlanner.winningPlan.stage'],
        fieldValues: {
          'stages[0].$cursor.queryPlanner.winningPlan.stage':
            'CLUSTERED_IXSCAN',
        },
      });
  });

  it('Should create and use compound indexes for last point queries', async () => {
    // First run the secondary index function to set up the collection
    await createAndUseSecondaryIndex();

    const { result, hintResult } = await createAndUseCompoundIndexes();

    // Verify we got results from the aggregation
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);

    // Each grouped document should have the expected fields
    result.forEach((doc) => {
      expect(doc).toHaveProperty('_id');
      expect(doc).toHaveProperty('ts');
      expect(doc).toHaveProperty('temperatureF');
    });

    // Verify hint result matches the regular result structure
    expect(hintResult).toBeDefined();
    expect(hintResult.length).toBe(result.length);
  });

  it('Should create and use a geospatial index for proximity queries', async () => {
    // First run the secondary index function to set up the collection
    await createAndUseSecondaryIndex();

    const result = await createAndUseGeospatialIndex();

    // Verify we got results from the geospatial query
    expect(result).toBeDefined();
    expect(result.length).toBeGreaterThan(0);

    // Documents should be sorted by distance (closest first)
    // The first result should be the one closest to the query point (-77.03653, 38.897676)
    // which is in Washington DC area - the sensor at -77.40711, 39.03335 should be closest
    expect(result[0].metadata.sensorId).toBe(5578);
  });
});
