const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");
const makeTempFileForTesting = require("../../../../utils/makeTempFileForTesting");

jest.setTimeout(10000);

const mongoUri = process.env.CONNECTION_STRING;
const dbName = "test_replaceRoot";

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

describe("mongosh tests for $replaceRoot aggregation stage", () => {

  beforeEach(() => {
    dropTestDb();
  });

  afterEach(() => {
    dropTestDb();
  });

  test("Should provide default fields with $mergeObjects to avoid missing-field errors", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/replace-root/behavior-insert.js",
        "aggregation/stages/replace-root/behavior-merge-objects.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/replace-root/behavior-merge-objects-output.sh");
  });

  test("Should skip documents missing the field with a $match stage", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/replace-root/behavior-insert.js",
        "aggregation/stages/replace-root/behavior-match.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/replace-root/behavior-match-output.sh");
  });

  test("Should substitute a default document with $ifNull", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/replace-root/behavior-insert.js",
        "aggregation/stages/replace-root/behavior-ifnull.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/replace-root/behavior-ifnull-output.sh");
  });

  test("Should merge an embedded document with a default document", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/replace-root/people-insert.js",
        "aggregation/stages/replace-root/people-merge-pets.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/replace-root/people-merge-pets-output.sh");
  });

  test("Should promote embedded documents nested in an array", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/replace-root/students-insert.js",
        "aggregation/stages/replace-root/students-promote-grades.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/replace-root/students-promote-grades-output.sh");
  });

  test("Should create a new document from multiple fields", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/replace-root/contacts-full-name-insert.js",
        "aggregation/stages/replace-root/contacts-full-name.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/replace-root/contacts-full-name-output.sh");
  });

  test("Should apply default values for missing fields using $$ROOT", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/replace-root/contacts-insert.js",
        "aggregation/stages/replace-root/contacts-defaults.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/replace-root/contacts-defaults-output.sh");
  });

  test("Should error when the replacement document field is missing", () => {
    const scriptPath = makeTempFileForTesting({
      connectionString: mongoUri,
      dbName,
      filepath: [
        "aggregation/stages/replace-root/behavior-insert.js",
        "aggregation/stages/replace-root/behavior-error.js"
      ],
      validateOutput: true
    });

    let output = "";
    try {
      execSync(`mongosh "${process.env.CONNECTION_STRING}" --file "${scriptPath}" --quiet`, {
        encoding: "utf8",
        stdio: ["pipe", "pipe", "pipe"]
      });
    } catch (error) {
      output = `${error.stdout || ""}\n${error.stderr || ""}`;
    }

    // The aggregate must fail specifically because $replaceRoot cannot
    // promote a missing "name" field to a document, not because mongosh
    // failed to connect or run the script, and not because of a different
    // $replaceRoot validation error (e.g., a scalar newRoot).
    expect(output).toContain("newRoot");
    expect(output).toMatch(/MISSING/i);
  });

});
