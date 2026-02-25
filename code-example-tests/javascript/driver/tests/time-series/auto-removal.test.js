import Expect from '../../utils/Expect.js';
import {
  updateCollectionOptions,
  getCollectionInfo,
  removeRemoval,
  cleanup,
} from '../../examples/time-series/auto-removal.js';

describe('Auto removal time series collection tests', () => {
  afterEach(async () => {
    await cleanup();
  });

  it('Should update collection options successfully', async () => {
    const result = await updateCollectionOptions();

    Expect.that(result)
      .shouldResemble({ ok: 1 })
      .withSchema({
        count: 1,
        requiredFields: ['ok'],
        fieldValues: { ok: 1 },
      });
  });

  it('Should return the correct collection expiry', async () => {
    const result = await getCollectionInfo();
    Expect.that(result).shouldMatch(86400);
  });

  it('Should remove expireAfterSeconds successfully', async () => {
    const result = await removeRemoval();
    Expect.that(result).shouldMatch(true);
  });
});

