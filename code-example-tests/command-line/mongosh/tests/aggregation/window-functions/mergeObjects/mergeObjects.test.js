const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");

jest.setTimeout(10000);

const dbName = "mergeObjects-window";

describe("$mergeObjects window function tests", () => {
  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;
    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error("Failed to drop database:", error.message);
    }
  });

  test.skip("Should compute cumulative merged specs for each product", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/window-functions/mergeObjects/load-data.js",
        "aggregation/window-functions/mergeObjects/cumulative-specs.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/window-functions/mergeObjects/cumulative-specs-output.sh");
  });
});
