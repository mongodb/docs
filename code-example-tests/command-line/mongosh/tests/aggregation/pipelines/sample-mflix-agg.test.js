const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh sample_mflix example tests", () => {

  test("Should return results specifying batch size", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/batch-size/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/batch-size/output.sh");
  });

  test("Should return results with fr collation applied", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/collation/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/collation/output.sh");
  });

  test("Should return three movies from 1994", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/comment/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/comment/output.sh");
  });

  test("Should return agg pipeline results using currentOp", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/currentOp/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/currentOp/output.sh");
  });

  test("Should return explain field results", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/explain-field/run-pipeline.js"
      ])
      .withDbName(dbName)
      .withIgnoredFields("stages", "queryHashShape", "serverInfo", "serverParameters")
      .shouldMatch("aggregation/pipelines/explain-field/output.sh");
  });

  test("Should return explain results", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/explain/run-pipeline.js"
      ])
      .withDbName(dbName)
      .withIgnoredFields("stages", "queryHashShape", "serverInfo", "serverParameters")
      .shouldMatch("aggregation/pipelines/explain/output.sh");
  });

  test("Should return top three directors with the most movies", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/full-pipeline/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/full-pipeline/output.sh");
  });

  test("Should return results using index hint", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/hint/apply-index-one.js",
        "aggregation/pipelines/hint/apply-index-two.js",
        "aggregation/pipelines/hint/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/hint/output.sh");
  });

  test("Should return agg pipeline results with let", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/let-agg-method/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/let-agg-method/output.sh");
  });

  test("Should return agg pipeline results using runCommand with let", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/let-option-run-cmd/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/let-option-run-cmd/output.sh");
  });

  test("Should return results after pmatch-group-sort-limit pipeline", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/match-group-sort-limit/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/match-group-sort-limit/output.sh");
  });

  test("Should return results after projection unwinding and grouping", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/project-unwind-group/run-pipeline.js"
      ])
      .withDbName(dbName)
      .withIgnoredFields("_id", "count")
      .shouldMatch("aggregation/pipelines/project-unwind-group/output.sh");
  });

  test("Should return top results using maj read concern", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/read-concern/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/read-concern/output.sh");
  });

  test("Should return agg pipeline results using runCommand", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/run-cmd-pipeline/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/run-cmd-pipeline/output.sh");
  });

}, dbName);
