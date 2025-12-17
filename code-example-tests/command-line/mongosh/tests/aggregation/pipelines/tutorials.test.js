const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");

jest.setTimeout(10000);

describe("mongosh aggregation pipeline tutorial tests", () => {
  const dbName = "agg-pipeline";

  // Drop the database after running the tests
  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop database '${dbName}':`, error.message);
    }
  });

  test("Should return filtered output that includes the three specified person records", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/filter/load-data.js",
        "aggregation/pipelines/filter/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/filter/output.sh");
  });

  test("Should return grouped and totaled output that includes the three expected records", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/group/load-data.js",
        "aggregation/pipelines/group/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/group/output.sh");
  });

  test("Should return unpacked output grouped by product name", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/unwind/load-data.js",
        "aggregation/pipelines/unwind/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/unwind/output.sh");
  });

  test("Should return joined data with the customer product name and category", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/join-one-to-one/load-data-orders.js",
        "aggregation/pipelines/join-one-to-one/load-data-products.js",
        "aggregation/pipelines/join-one-to-one/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/join-one-to-one/output.sh");
  });

  test("Should return joined data based on multiple fields", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/pipelines/join-multi-field/load-data-orders.js",
        "aggregation/pipelines/join-multi-field/load-data-products.js",
        "aggregation/pipelines/join-multi-field/create-embedded-pipeline.js",
        "aggregation/pipelines/join-multi-field/run-pipeline.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/pipelines/join-multi-field/output.sh");
  });

});
