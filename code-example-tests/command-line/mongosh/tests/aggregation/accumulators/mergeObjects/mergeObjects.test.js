const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");

jest.setTimeout(10000);

const dbName = "mergeObjects-accumulator";

describe("$mergeObjects accumulator tests", () => {
  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;
    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error("Failed to drop database:", error.message);
    }
  });

  test("Should merge review data from multiple sources into a single document per movie", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/accumulators/mergeObjects/load-data.js",
        "aggregation/accumulators/mergeObjects/merge-ratings.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/accumulators/mergeObjects/merge-ratings-output.sh");
  });
});
