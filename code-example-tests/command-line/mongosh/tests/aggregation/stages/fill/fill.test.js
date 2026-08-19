const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");

jest.setTimeout(10000);

const mongoUri = process.env.CONNECTION_STRING;
const dbName = "test_fill";

function dropTestDb() {
  try {
    execSync(
      `mongosh "${mongoUri}" --eval "db.getSiblingDB('${dbName}').dropDatabase();"`,
      { encoding: "utf8" }
    );
  } catch (e) {
    console.error(`Failed to drop ${dbName}:`, e.message);
  }
}

describe("mongosh tests for $fill aggregation stage", () => {

  beforeEach(() => {
    dropTestDb();
  });

  afterEach(() => {
    dropTestDb();
  });

  test("Should fill missing field values with a constant value", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/fill/dailysales-insert.js",
        "aggregation/stages/fill/fill-example-constant-value.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/fill/fill-example-constant-value-output.sh");
  });

  test("Should fill missing field values with linear interpolation", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/fill/stock-insert.js",
        "aggregation/stages/fill/fill-example-linear.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/fill/fill-example-linear-output.sh");
  });

  test("Should fill missing field values based on the last observed value", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/fill/restaurantreviews-insert.js",
        "aggregation/stages/fill/fill-example-locf.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/fill/fill-example-locf-output.sh");
  });

  test("Should fill data for distinct partitions", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/fill/restaurantreviewsmultiple-insert.js",
        "aggregation/stages/fill/fill-example-partition.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/fill/fill-example-partition-output.sh");
  });

  test("Should indicate if a field was populated using $fill", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/fill/restaurantreviews-insert.js",
        "aggregation/stages/fill/fill-example-indicate-populated.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/fill/fill-example-indicate-populated-output.sh");
  });

  test("Should interpolate identical values in different partitions", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/fill/restaurantreviewsmultiple-interpolate-insert.js",
        "aggregation/stages/fill/fill-example-interpolating-new-values.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/fill/fill-example-interpolating-new-values-output.sh");
  });

});
