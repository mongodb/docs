import { subscribeToCommandEvent } from '../../examples/monitoring/apm-subscribe.js';
import Expect from '../../utils/Expect.js';

describe('Application Performance Monitoring (APM)', () => {
  describe('Subscribe to command monitoring events', () => {
    it('Should subscribe to and receive a commandStarted event', async () => {
      const events = await subscribeToCommandEvent();
      Expect.that([events[0]])
        .shouldResemble([{ commandName: 'ping', databaseName: 'admin' }])
        .withSchema({
          count: 1,
          requiredFields: ['commandName', 'databaseName'],
          fieldValues: { commandName: 'ping', databaseName: 'admin' },
        });
    });
  });
});
