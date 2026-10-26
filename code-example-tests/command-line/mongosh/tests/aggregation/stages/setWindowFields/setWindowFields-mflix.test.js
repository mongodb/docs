const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh tests for $setWindowFields aggregation stage (sample_mflix)", () => {

  test("Should output the cumulative runtime for each rating using a documents window", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/cumulative-runtime-for-rating.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/cumulative-runtime-for-rating-output.sh");
  });

  test("Should output the cumulative runtime for each year using a documents window", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/cumulative-runtime-for-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/cumulative-runtime-for-year-output.sh");
  });

  test("Should output the moving average runtime for each year using a documents window", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/moving-average-runtime-for-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/moving-average-runtime-for-year-output.sh");
  });

  test("Should output the cumulative and maximum runtime for each year using a documents window", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/cumulative-and-maximum-runtime-for-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/cumulative-and-maximum-runtime-for-year-output.sh");
  });

  test("Should output the runtime from movies with a similar runtime using a range window", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/range-window-similar-runtime.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/range-window-similar-runtime-output.sh");
  });

  test("Should output recent releases using a time range window with a positive upper bound", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/time-range-window-positive-releases.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/time-range-window-positive-releases-output.sh");
  });

  test("Should output recent releases using a time range window with a negative upper bound", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/time-range-window-negative-releases.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/time-range-window-negative-releases-output.sh");
  });

  test("Should compare each runtime with the previous runtime using $shift", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/compare-previous-runtime.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/compare-previous-runtime-output.sh");
  });

}, dbName);
