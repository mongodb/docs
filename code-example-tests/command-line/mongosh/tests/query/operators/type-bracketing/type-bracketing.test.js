const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");

jest.setTimeout(10000);

const mongoUri = process.env.CONNECTION_STRING;
const dbName = "test_type_bracketing";

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

describe("mongosh tests for type bracketing", () => {
  beforeEach(() => {
    dropTestDb();
  });

  afterEach(() => {
    dropTestDb();
  });

  test("Should return only documents where qty is a number greater than 4", async () => {
    await Expect
      .outputFromExampleFiles([
        "query/operators/type-bracketing/type-bracketing-find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("query/operators/type-bracketing/type-bracketing-find-output.sh");
  });
});
