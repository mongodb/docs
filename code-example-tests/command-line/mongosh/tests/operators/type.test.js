const { execSync } = require("child_process");
const Expect = require("../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../utils/sampleDataChecker");

jest.setTimeout(10000);

const mflixDbName = "sample_mflix";

const runCleanup = (cleanupCommands, errorContext) => {
  const mongoUri = process.env.CONNECTION_STRING;
  const command = `mongosh "${mongoUri}" --quiet --eval '${cleanupCommands}'`;
  try {
    execSync(command, { encoding: "utf8" });
  } catch (error) {
    console.error(`Failed to clean up ${errorContext}:`, error.message);
  }
};

describe("$type operator - MinKey and MaxKey behavior (data collection)", () => {
  const dbName = "type_behavior_test";

  afterEach(() => {
    runCleanup(
      `db = db.getSiblingDB("${dbName}"); db.dropDatabase();`,
      dbName
    );
  });

  test("Should find data document by minKey type", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/type/type-data-setup.js",
        "operators/type/type-data-find-minkey.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/type/type-data-find-minkey-output.sh");
  });

  test("Should find data document by maxKey type", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/type/type-data-setup.js",
        "operators/type/type-data-find-maxkey.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/type/type-data-find-maxkey-output.sh");
  });
});

describe("$type operator - MinKey and MaxKey examples (restaurants collection)", () => {
  const dbName = "type_operator_test";

  afterEach(() => {
    runCleanup(
      `db = db.getSiblingDB("${dbName}"); db.dropDatabase();`,
      dbName
    );
  });

  test("Should find restaurants with minKey grade", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/type/type-restaurants-setup.js",
        "operators/type/type-restaurants-find-minkey.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/type/type-restaurants-find-minkey-output.sh");
  });

  test("Should find restaurants with maxKey grade", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/type/type-restaurants-setup.js",
        "operators/type/type-restaurants-find-maxkey.js"
      ])
      .withDbName(dbName)
      .shouldMatch("operators/type/type-restaurants-find-maxkey-output.sh");
  });
});

describeWithSampleData("$type operator - sample_mflix queries", () => {

  test("Should find movies where imdb.rating is BSON string type (string alias)", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/type/type-query-imdb-string.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/type/type-query-imdb-string-output.sh");
  });

  test("Should find movies where imdb.rating is BSON string type (numeric code)", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/type/type-query-imdb-string-numeric-only.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/type/type-query-imdb-string-output.sh");
  });

  test("Should find movies where imdb.rating is a number type", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/type/type-query-number-alias.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/type/type-query-number-alias-output.sh");
  });

  test("Should find movies where imdb.rating is string or double (string aliases)", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/type/type-query-multiple-types.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/type/type-query-multiple-types-output.sh");
  });

  test("Should find movies where imdb.rating is string or double (numeric codes)", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/type/type-query-multiple-types-numeric-only.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/type/type-query-multiple-types-output.sh");
  });

  test("Should find movies where genres field is an array", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/type/type-query-array.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/type/type-query-array-output.sh");
  });

}, mflixDbName);
