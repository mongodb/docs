const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");

jest.setTimeout(10000);

// Skipping until mongosh v8.3.0 is released and CI is updated
describe.skip("mongosh tests for $hexHash", () => {
  const dbName = "hexhash-test";

  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop database '${dbName}':`, error.message);
    }
  });

  test("Should hash a field value", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/hexHash/hash-field-value/load-data.js",
        "aggregation/expressions/hexHash/hash-field-value/hash-field-value.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/hexHash/hash-field-value/output.sh");
  });

  test("Should return null for null or missing input", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/hexHash/null-missing/null-missing.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/hexHash/null-missing/output.sh");
  });
});
