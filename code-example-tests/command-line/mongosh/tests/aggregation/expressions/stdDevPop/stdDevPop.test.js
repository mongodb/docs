const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");

jest.setTimeout(10000);

describe("$stdDevPop expression tests", () => {
  const dbName = "stdDevPop-expression-test";

  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop database '${dbName}':`, error.message);
    }
  });

  test("Should return the population standard deviation of test scores per student", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/stdDevPop/load-data.js",
        "aggregation/expressions/stdDevPop/stdDevPop-expression-example.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/stdDevPop/stdDevPop-expression-example-output.sh");
  });
});
