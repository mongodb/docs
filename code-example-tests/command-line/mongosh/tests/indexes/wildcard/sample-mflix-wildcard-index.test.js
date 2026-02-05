const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh sample_mflix wildcard index tests", () => {

  // Drop all indexes on the sample_mflix.movies collection after running the tests
  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.movies.dropIndexes();"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop indexes on '${dbName}':`, error.message);
    }
  });

  test("Should create wildcard index", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/wildcard/create-wildcard/create-wildcard-awards-field/create.js",
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/wildcard/create-wildcard/create-wildcard-awards-field/output.sh");
  });
  
  test("Should find docs using wildcard index, awards.wins", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/wildcard/create-wildcard/create-wildcard-awards-field/create.js",
        "indexes/wildcard/find-wildcard/find-awards-wins/find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/wildcard/find-wildcard/find-awards-wins/output.sh");
  });

  test("Should find docs using wildcard index, awards.nominations", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/wildcard/create-wildcard/create-wildcard-awards-field/create.js",
        "indexes/wildcard/find-wildcard/find-awards-nominations/find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/wildcard/find-wildcard/find-awards-nominations/output.sh");
  });

  test("Should create index using wildcard index on all field paths", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/wildcard/create-wildcard/create-wildcard-all-field-paths/create.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/wildcard/create-wildcard/create-wildcard-all-field-paths/output.sh");
  });

  test("Should find documents using wildcard index on all field paths", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/wildcard/create-wildcard/create-wildcard-all-field-paths/create.js",
        "indexes/wildcard/find-wildcard/find-wildcard-all-field-paths/find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/wildcard/find-wildcard/find-wildcard-all-field-paths/output.sh");
  });

  test("Should find documents using wildcard index that includes specific fields", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/wildcard/create-wildcard/create-wildcard-include-specific-fields/create.js",
        "indexes/wildcard/find-wildcard/find-wildcard-include-specific-fields/find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/wildcard/find-wildcard/find-wildcard-include-specific-fields/output.sh");
  });
  
  test("Should find documents using wildcard index that omits specific fields", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/wildcard/create-wildcard/create-wildcard-omit-specific-fields/create.js",
        "indexes/wildcard/find-wildcard/find-wildcard-omit-specific-fields/find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/wildcard/find-wildcard/find-wildcard-omit-specific-fields/output.sh");
  });

  test("Should find movies with runtime greater than 300 mins using wildcard index", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/wildcard/create-wildcard/create-wildcard-all-field-paths/create.js",
        "indexes/wildcard/find-wildcard/find-runtime/find.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/wildcard/find-wildcard/find-runtime/output.sh");
  });

}, dbName);
