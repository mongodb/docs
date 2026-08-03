const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");

jest.setTimeout(10000);

const mongoUri = process.env.CONNECTION_STRING;
const dbName = "test_projectionElemMatch";

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

describe("$elemMatch projection operator example tests", () => {

  beforeEach(() => {
    dropTestDb();
  });

  afterAll(() => {
    dropTestDb();
  });

  test("Should project the first students element matching one field", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/projection-elemMatch/insert-schools.js",
        "operators/projection-elemMatch/zip-search.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/projection-elemMatch/zip-search-output.sh");
  });

  test("Should project the first students element matching multiple fields", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/projection-elemMatch/insert-schools.js",
        "operators/projection-elemMatch/zip-multiple-search.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/projection-elemMatch/zip-multiple-search-output.sh");
  });

  test("Should return only _id when matching objects against scalar array elements", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/projection-elemMatch/insert-schools.js",
        "operators/projection-elemMatch/athletics-object-incomplete.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/projection-elemMatch/athletics-object-incomplete-output.sh");
  });

  test("Should project scalar array elements matching an equality condition", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/projection-elemMatch/insert-schools.js",
        "operators/projection-elemMatch/athletics-scalar.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/projection-elemMatch/athletics-scalar-output.sh");
  });

});
