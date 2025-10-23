import { runGetStarted } from '../examples/get-started/get-started.js';
import Expect from '../utils/Expect.js';
import { describeWithSampleData } from '../utils/sampleDataChecker.js';

describeWithSampleData(
  'Get Started example tests',
  () => {
    it('Should retrieve a movie and produce output that matches the example output', async () => {
      const outputFilePath = 'get-started/get-started-output.sh';
      const result = await runGetStarted();

      Expect.that(result).shouldMatch(outputFilePath);
    });
  },
  'sample_mflix'
);
