const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");

jest.setTimeout(10000);

describe("$stdDevSamp expression tests", () => {
  const dbName = "stdDevSamp-expression-test";

  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop database '${dbName}':`, error.message);
    }
  });

  test("Should return the sample standard deviation of test scores per student", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/stdDevSamp/load-data.js",
        "aggregation/expressions/stdDevSamp/stdDevSamp-expression-example.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/stdDevSamp/stdDevSamp-expression-example-output.sh");
  });
});
