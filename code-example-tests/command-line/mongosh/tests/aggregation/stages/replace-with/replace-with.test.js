const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");

jest.setTimeout(10000);

const mongoUri = process.env.CONNECTION_STRING;
const dbName = "test_replaceWith";

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

describe("mongosh tests for $replaceWith aggregation stage", () => {

  beforeEach(() => {
    dropTestDb();
  });

  afterEach(() => {
    dropTestDb();
  });

  test("Should provide default fields with $mergeObjects to avoid missing-field errors", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/replace-with/behavior-insert.js",
        "aggregation/stages/replace-with/behavior-merge-objects.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/replace-with/behavior-merge-objects-output.sh");
  });

  test("Should skip documents missing the field with a $match stage", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/replace-with/behavior-insert.js",
        "aggregation/stages/replace-with/behavior-match.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/replace-with/behavior-match-output.sh");
  });

  test("Should substitute a default document with $ifNull", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/replace-with/behavior-insert.js",
        "aggregation/stages/replace-with/behavior-ifnull.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/replace-with/behavior-ifnull-output.sh");
  });

  test("Should merge an embedded document with a default document", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/replace-with/people-insert.js",
        "aggregation/stages/replace-with/people-merge-pets.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/replace-with/people-merge-pets-output.sh");
  });

  test("Should promote embedded documents nested in an array", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/replace-with/students-insert.js",
        "aggregation/stages/replace-with/students-promote-grades.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/replace-with/students-promote-grades-output.sh");
  });

  test("Should create new documents using $$NOW", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/replace-with/sales-insert.js",
        "aggregation/stages/replace-with/sales-new-documents.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/replace-with/sales-new-documents-output.sh");
  });

  test("Should reshape documents grouped by quarter", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/replace-with/reportedsales-insert.js",
        "aggregation/stages/replace-with/reportedsales-group-by-quarter.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/replace-with/reportedsales-group-by-quarter-output.sh");
  });

  test("Should apply default values for missing fields using $$ROOT", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/replace-with/contacts-insert.js",
        "aggregation/stages/replace-with/contacts-defaults.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/replace-with/contacts-defaults-output.sh");
  });

});
