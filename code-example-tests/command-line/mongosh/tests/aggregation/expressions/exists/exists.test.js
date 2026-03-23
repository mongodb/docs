const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh $exists operator example tests", () => {

  // Drop all indexes on the sample_mflix.movies collection after running the tests
  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.movies.dropIndexes();"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop indexes on '${dbName}':`, error.message);
    }
  });

  test("Should create a sparse index on metacritic field", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/exists/create-index.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/exists/create-index-outout.sh");
  });

  test("Should return movies where rated field does not exist", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/exists/false.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/exists/false-output.sh");
  });

  test("Should count documents where metacritic field exists", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/exists/metacritic.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/exists/metacritic-output.sh");
  });

  test("Should count documents where metacritic is not null", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/exists/metracritic-2.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/exists/metacritic-2-output.sh");
  });

  test("Should return movies where rated field exists", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/exists/null-values.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/exists/null-values-output.sh");
  });

  test("Should return movies where rated exists and is not R or PG-13", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/exists/exists-and-not-equal.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/exists/exists-and-not-equal-output.sh");
  });

}, dbName);
