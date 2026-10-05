const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect.js");

jest.setTimeout(10000);

describe("$percentile expression tests", () => {
  const dbName = "percentile-expression-test";

  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop database '${dbName}':`, error.message);
    }
  });

  test("Should return 25th, 50th, and 75th percentile of test scores per student", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/percentile/load-data.js",
        "aggregation/expressions/percentile/score-percentiles-per-student.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/percentile/score-percentiles-per-student-output.sh");
  });
});
