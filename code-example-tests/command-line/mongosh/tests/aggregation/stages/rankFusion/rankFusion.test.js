const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000); // Do not increase this. If tests time out, the backupAndRestore or example is too slow — diagnose the root cause.

const dbName = "sample_mflix";

// This test is skipped because the $rankFusion example uses Atlas Search
// stages ($search and $vectorSearch), which require a connection to Atlas or
// an Atlas local deployment. The example also contains placeholders
// (<INDEX_NAME>, <FIELD_NAME>, <QUERY_EMBEDDINGS>, <QUERY_TERM>) that must be
// replaced with concrete values before the example can run. To enable this
// test, connect to an Atlas cluster, replace the placeholders in the example
// files, remove .skip, and capture the expected output files. The index
// creation examples (create-search-index.js and create-vector-index.js) run
// as setup for this test and have no output files of their own.
describeWithSampleData("$rankFusion stage example tests", () => {

  test.skip("Should run the $rankFusion pipeline with search and vectorSearch inputs", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/rankFusion/create-search-index.js",
        "aggregation/stages/rankFusion/create-vector-index.js",
        "aggregation/stages/rankFusion/rank-fusion-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/rankFusion/rank-fusion-pipeline-output.sh");
  });

}, dbName);
