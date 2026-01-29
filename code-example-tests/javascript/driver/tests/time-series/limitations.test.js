import Expect from '../../utils/Expect.js';
import {
  getDistinctDocuments,
  cleanup,
} from '../../examples/time-series/limitations.js';

describe('Limitations tests', () => {
  afterEach(async () => {
    await cleanup();
  });

  it('Should return distinct meta.type values for project 10', async () => {
    const result = await getDistinctDocuments();

    // Should return 2 documents (type 'a' and 'b' for project 10)
    Expect.that(result.length).shouldMatch(2);

    // Extract the _id values (which are the distinct meta.type values)
    const types = result.map((doc) => doc._id).sort();
    Expect.that(types).shouldMatch(['a', 'b']);
  });
});
