const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";
const mongoUri = process.env.CONNECTION_STRING;

function dropIndexes(collection) {
  try {
    execSync(
      `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db['${collection}'].dropIndexes();"`,
      { encoding: "utf8" }
    );
  } catch (e) {
    // Index may not exist — safe to ignore
  }
}

describeWithSampleData("Query optimization index and query tests", () => {

  describe("Create Indexes to Support Queries", () => {
    afterEach(() => dropIndexes("movies"));

    test("Should create single-field index on movies.rated", async () => {
      await Expect
        .outputFromExampleFiles([
          "indexes/query-optimization/create-index.js"
        ])
        .withDbName(dbName)
        .shouldMatch("indexes/query-optimization/create-index-output.sh");
    });
  });

  describe("Project Only Necessary Data", () => {
    test("Should return projected fields from movies sorted by year", async () => {
      await Expect
        .outputFromExampleFiles([
          "indexes/query-optimization/projection-query.js"
        ])
        .withDbName(dbName)
        .shouldResemble("indexes/query-optimization/projection-query-output.sh")
        .withSchema({
          count: 3,
          requiredFields: ["_id", "year", "title"]
        });
    });
  });

  describe("ESR Compound Index", () => {
    afterEach(() => dropIndexes("movies"));

    test("Should create ESR compound index on movies", async () => {
      await Expect
        .outputFromExampleFiles([
          "indexes/query-optimization/esr-index.js"
        ])
        .withDbName(dbName)
        .shouldMatch("indexes/query-optimization/esr-index-output.sh");
    });

    test("Should aggregate PG movies released after 2000 sorted by title", async () => {
      await Expect
        .outputFromExampleFiles([
          "indexes/query-optimization/esr-aggregate.js"
        ])
        .withDbName(dbName)
        .shouldResemble("indexes/query-optimization/esr-aggregate-output.sh")
        .withSchema({
          count: 5,
          requiredFields: ["_id", "imdb"]
        });
    });
  });

  describe("Limit Query Results", () => {
    test("Should return 10 most recent movies", async () => {
      await Expect
        .outputFromExampleFiles([
          "indexes/query-optimization/limit-query.js"
        ])
        .withDbName(dbName)
        .shouldResemble("indexes/query-optimization/limit-query-output.sh")
        .withSchema({
          count: 10
        });
    });
  });

  describe("Run Covered Queries", () => {
    afterEach(() => dropIndexes("movies"));

    test("Should create compound index for covered query on movies", async () => {
      await Expect
        .outputFromExampleFiles([
          "indexes/query-optimization/covered-query-index.js"
        ])
        .withDbName(dbName)
        .shouldMatch("indexes/query-optimization/covered-query-index-output.sh");
    });

    test("Should return PG movies starting with T using covered query", async () => {
      await Expect
        .outputFromExampleFiles([
          "indexes/query-optimization/covered-query-index.js",
          "indexes/query-optimization/covered-query.js"
        ])
        .withDbName(dbName)
        .shouldResemble("indexes/query-optimization/covered-query-output.sh")
        .withSchema({
          count: 3,
          requiredFields: ["title"]
        });
    });
  });

  describe("Embedded Documents Covered Query", () => {
    afterEach(() => dropIndexes("theaters"));

    test("Should create index on embedded theaters.location.address.city", async () => {
      await Expect
        .outputFromExampleFiles([
          "indexes/query-optimization/embedded-doc-index.js"
        ])
        .withDbName(dbName)
        .shouldMatch("indexes/query-optimization/embedded-doc-index-output.sh");
    });

    test("Should return Portland theaters using covered query on embedded field", async () => {
      await Expect
        .outputFromExampleFiles([
          "indexes/query-optimization/embedded-doc-index.js",
          "indexes/query-optimization/embedded-doc-find.js"
        ])
        .withDbName(dbName)
        .shouldResemble("indexes/query-optimization/embedded-doc-find-output.sh")
        .withSchema({
          count: 1,
          requiredFields: ["location"]
        });
    });
  });

}, dbName);
