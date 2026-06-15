import { subscribeToSdamEvent } from '../../examples/monitoring/sdam-subscribe.js';
import Expect from '../../utils/Expect.js';

describe('Server Discovery and Monitoring (SDAM)', () => {
  describe('Subscribe to SDAM events', () => {
    it('Should subscribe to and receive a serverOpening event', async () => {
      const events = await subscribeToSdamEvent();
      Expect.that([events[0]])
        .shouldResemble([{ address: 'localhost:27017' }])
        .withSchema({
          count: 1,
          requiredFields: ['address'],
        });
    });
  });
});
