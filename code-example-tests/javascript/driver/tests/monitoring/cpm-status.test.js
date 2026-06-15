import { trackConnectionPoolStatus } from '../../examples/monitoring/cpm-status.js';
import Expect from '../../utils/Expect.js';

describe('Connection Pool Monitoring', () => {
  describe('Track connection pool status', () => {
    it('Should return a count of checked-out connections after an operation', async () => {
      const count = await trackConnectionPoolStatus();
      Expect.that(count).shouldMatch(0);
    });
  });
});
