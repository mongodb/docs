const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");

jest.setTimeout(10000);

describe("Time series create and query tests", () => {
  const dbName = "timeseries";

  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop database '${dbName}':`, error.message);
    }
  });

  it("Should return the expected timeseries options (granularity)", async () => {
    const exampleFiles = [
      "timeseries/create-query/create-collection.js",
      "timeseries/create-query/collection-options.js"
    ];
    const outputFile = "timeseries/create-query/collection-options-output.sh";

    await Expect.outputFromExampleFiles(exampleFiles)
      .withDbName(dbName)
      .shouldMatch(outputFile);
  });

  it("Should return the expected timeseries options (bucket)", async () => {
    const exampleFiles = [
      "timeseries/create-query/create-collection-bucket.js",
      "timeseries/create-query/collection-options.js"
    ];
    const outputFile = "timeseries/create-query/collection-options-bucket-output.sh";

    await Expect.outputFromExampleFiles(exampleFiles)
      .withDbName(dbName)
      .shouldMatch(outputFile);
  });

  it("Should return the expected results from the meta field query", async () => {
    const exampleFiles = [
      "timeseries/create-query/create-collection.js",
      "timeseries/create-query/populate-collection.js",
      "timeseries/create-query/meta-field-query.js"
    ];
    const outputFile = "timeseries/create-query/meta-field-output.sh";

    await Expect.outputFromExampleFiles(exampleFiles)
      .withDbName(dbName)
      .withIgnoredFields("_id")
      .shouldMatch(outputFile);
  });

  it("Should return the expected results from the time field query", async () => {
    const exampleFiles = [
      "timeseries/create-query/create-collection.js",
      "timeseries/create-query/populate-collection.js",
      "timeseries/create-query/time-field-query.js"
    ];
    const outputFile = "timeseries/create-query/time-field-output.sh";

    await Expect.outputFromExampleFiles(exampleFiles)
      .withDbName(dbName)
      .withIgnoredFields("_id")
      .shouldMatch(outputFile);
  });

  it("Should return the expected aggregation", async () => {
    const exampleFiles = [
      "timeseries/create-query/create-collection.js",
      "timeseries/create-query/populate-collection.js",
      "timeseries/create-query/aggregate.js"
    ];
    const outputFile = "timeseries/create-query/aggregate-output.sh";

    await Expect.outputFromExampleFiles(exampleFiles)
      .withDbName(dbName)
      .shouldMatch(outputFile);
  });

  it("Should return the expected document after calling find one", async () => {
    const exampleFiles = [
      "timeseries/create-query/create-collection.js",
      "timeseries/create-query/populate-collection.js",
      "timeseries/create-query/find-one.js"
    ];
    const outputFile = "timeseries/create-query/find-one-output.sh";

    await Expect.outputFromExampleFiles(exampleFiles)
      .withDbName(dbName)
      .withIgnoredFields("_id")
      .shouldMatch(outputFile);
  });
});
