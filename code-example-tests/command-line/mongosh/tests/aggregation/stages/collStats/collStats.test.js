const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000); // Do not increase this. If tests time out, the backupAndRestore or example is too slow — diagnose the root cause.

const dbName = "sample_mflix";

describeWithSampleData("$collStats stage example tests", () => {

  test("Should return latency statistics with histograms for the movies collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/collStats/latency-stats.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/collStats/latency-stats-output.sh");
  });

  test("Should return storage statistics for the movies collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/collStats/storage-stats.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/collStats/storage-stats-output.sh");
  });

  test("Should return time series storage statistics for the weather collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/collStats/create-weather-data.js",
        "aggregation/stages/collStats/storage-stats-timeseries.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/collStats/storage-stats-timeseries-output.sh");

    // Remove the time series collection created by the example so it
    // does not persist in sample_mflix. Safe to run even if it does
    // not exist.
    const mongoUri = process.env.CONNECTION_STRING;
    try {
      execSync(
        `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.weather.drop();"`,
        { encoding: "utf8" }
      );
    } catch (e) {
      console.error(`Failed to drop weather collection:`, e.message);
    }
  });

  test("Should return query execution statistics for the movies collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/collStats/query-exec-stats.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/collStats/query-exec-stats-output.sh");
  });

  test("Should return the document count for the movies collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/collStats/count.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/collStats/count-output.sh");
  });

}, dbName);
