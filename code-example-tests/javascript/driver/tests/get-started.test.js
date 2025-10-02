import { runGetStarted } from '../examples/get-started/get-started.js';
import outputMatchesExampleOutput from '../utils/outputMatchesExampleOutput.js';
import { describeWithSampleData } from '../utils/sampleDataChecker.js';

describeWithSampleData(
  'Get Started example tests',
  () => {
    it('Should retrieve a movie and produce output that matches the example output', async () => {
      const outputFilePath = 'get-started/get-started-output.sh';
      const result = await runGetStarted();
      const outputMatches = outputMatchesExampleOutput(outputFilePath, result);
      expect(outputMatches).toBe(true);
    });
  },
  'sample_mflix'
);
