const { execSync } = require("child_process");
const Expect = require("../../utils/comparison/Expect");

jest.setTimeout(10000);

describe("Time series create and query tests", () => {
  const dbName = "mydatabase";

  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop database '${dbName}':`, error.message);
    }
  });

  it("Should migrate data to a time series collection with aggregation and return matching document", async () => {
    const exampleFiles = [
      "timeseries/migrate-with-aggregation/insert-weather-data.js",
      "timeseries/migrate-with-aggregation/create-aggregation-pipeline.js",
      "timeseries/migrate-with-aggregation/query-new-ts-collection.js"
    ];
    const outputFile = "timeseries/migrate-with-aggregation/find-one-output.sh";

    await Expect.outputFromExampleFiles(exampleFiles)
      .withDbName(dbName)
      .shouldMatch(outputFile);
  });
});
