const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");

jest.setTimeout(10000);

const mongoUri = process.env.CONNECTION_STRING;
const dbName = "test_setWindowFields";

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

describe("mongosh tests for $setWindowFields aggregation stage", () => {

  beforeEach(() => {
    dropTestDb();
  });

  afterEach(() => {
    dropTestDb();
  });

  test("Should output the cumulative quantity for each state using a documents window", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/cake-sales-insert.js",
        "aggregation/stages/setWindowFields/cumulative-quantity-for-state.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/cumulative-quantity-for-state-output.sh");
  });

  test("Should output the cumulative quantity for each year using a documents window", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/cake-sales-insert.js",
        "aggregation/stages/setWindowFields/cumulative-quantity-for-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/cumulative-quantity-for-year-output.sh");
  });

  test("Should output the moving average quantity for each year using a documents window", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/cake-sales-insert.js",
        "aggregation/stages/setWindowFields/moving-average-quantity-for-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/moving-average-quantity-for-year-output.sh");
  });

  test("Should output the cumulative and maximum quantity for each year using a documents window", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/cake-sales-insert.js",
        "aggregation/stages/setWindowFields/cumulative-and-maximum-quantity-for-year.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/cumulative-and-maximum-quantity-for-year-output.sh");
  });

  test("Should output the quantity from similar orders using a range window", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/cake-sales-insert.js",
        "aggregation/stages/setWindowFields/range-window-similar-orders.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/range-window-similar-orders-output.sh");
  });

  test("Should output recent orders using a time range window with a positive upper bound", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/cake-sales-insert.js",
        "aggregation/stages/setWindowFields/time-range-window-positive.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/time-range-window-positive-output.sh");
  });

  test("Should output recent orders using a time range window with a negative upper bound", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/cake-sales-insert.js",
        "aggregation/stages/setWindowFields/time-range-window-negative.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/time-range-window-negative-output.sh");
  });

  test("Should compare each price with the previous price using $shift", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/setWindowFields/cake-sales-insert.js",
        "aggregation/stages/setWindowFields/compare-previous-price.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/setWindowFields/compare-previous-price-output.sh");
  });

});
