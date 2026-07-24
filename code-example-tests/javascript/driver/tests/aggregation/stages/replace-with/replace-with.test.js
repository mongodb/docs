import { runReplaceWith } from '../../../../examples/aggregation/stages/replace-with/replace-with.js';
import Expect from '../../../../utils/Expect.js';
import { describeWithSampleData } from '../../../../utils/sampleDataChecker.js';

describeWithSampleData(
  '$replaceWith aggregation stage tests',
  () => {
    it('Should replace each movie with its imdb subdocument', async () => {
      const result = await runReplaceWith();
      const outputFilepath =
        'aggregation/stages/replace-with/replace-with-output.sh';
      Expect.that(result)
        .shouldResemble(outputFilepath)
        .withSchema({
          count: 5,
          requiredFields: ['rating', 'votes', 'id'],
        });
    });
  },
  'sample_mflix'
);
