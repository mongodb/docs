const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");

jest.setTimeout(10000);

// Skipping until mongosh v8.3.0 is released and CI is updated
describe.skip("mongosh tests for $hash", () => {
  const dbName = "hash-test";

  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop database '${dbName}':`, error.message);
    }
  });

  test("Should hash a field value using SHA-256", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/hash/hash-field-value/load-data.js",
        "aggregation/expressions/hash/hash-field-value/hash-field-value.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/hash/hash-field-value/output.sh");
  });

  test("Should hash a literal string using XXH64", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/hash/hash-literal-string/hash-literal-string.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/hash/hash-literal-string/output.sh");
  });

  test("Should hash BinData using SHA-256", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/hash/hash-bindata/load-data.js",
        "aggregation/expressions/hash/hash-bindata/hash-bindata.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/hash/hash-bindata/output.sh");
  });

  test("Should return null for null or missing input", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/hash/null-missing/null-missing.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/hash/null-missing/output.sh");
  });
});
