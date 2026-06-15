import { subscribeToConnectionPoolEvent } from '../../examples/monitoring/cpm-subscribe.js';
import Expect from '../../utils/Expect.js';

describe('Connection Pool Monitoring', () => {
  describe('Subscribe to connection pool events', () => {
    it('Should subscribe to and receive a connectionPoolCreated event', async () => {
      const events = await subscribeToConnectionPoolEvent();
      Expect.that([events[0]])
        .shouldResemble([{ address: 'localhost:27017', time: new Date() }])
        .withSchema({
          count: 1,
          requiredFields: ['address', 'time'],
        });
    });
  });
});
