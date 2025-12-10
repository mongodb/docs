const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");

jest.setTimeout(10000);

describe("mongosh query for missing field using missing type tests", () => {
  const dbName = "missing-type";

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

  test("Should return the 'a' fields type for each document", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/type/load-data.js",
        "aggregation/expressions/type/projection.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/type/projection-output.sh");
  });

  test("Should return only documents missing the 'a' field", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/type/load-data.js",
        "aggregation/expressions/type/missing-field.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/type/missing-output.sh");
  });
});