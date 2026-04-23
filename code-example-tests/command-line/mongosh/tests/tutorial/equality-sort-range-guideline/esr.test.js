const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh esr guideline tutorial tests", () => {

  // Drop all indexes on the sample_mflix.movies collection 
  const dropMoviesIndexes = () => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.movies.dropIndexes();"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop indexes on '${dbName}':`, error.message);
    }
  };

  test("Should find Equilibrium by title in the movies collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "tutorial/equality-sort-range-guideline/find/run.js"
      ])
      .withDbName(dbName)
      .shouldMatch("tutorial/equality-sort-range-guideline/find/output.sh");
  });

  test("Should find Equilibrium by title using $eq in the movies collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "tutorial/equality-sort-range-guideline/find-eq/run.js"
      ])
      .withDbName(dbName)
      .shouldMatch("tutorial/equality-sort-range-guideline/find-eq/output.sh");
  });

  test("Should find documents in the movies collection directed by David Lynch sorted by year, asc", async () => {
    await Expect
      .outputFromExampleFiles([
        "tutorial/equality-sort-range-guideline/find-sort/run.js"
      ])
      .withDbName(dbName)
      .shouldMatch("tutorial/equality-sort-range-guideline/find-sort/output.sh");
  });

  test("Should create an index on the movies collection, directors: 1 year: 1", async () => {
    dropMoviesIndexes();

    await Expect
      .outputFromExampleFiles([
        "tutorial/equality-sort-range-guideline/createIndex/run.js"
      ])
      .withDbName(dbName)
      .shouldMatch("directors_1_year_1");

    dropMoviesIndexes();
  });

  test("Should find documents in the movies collection with runtime greater than or equal to 1000 minutes", async () => {
    await Expect
      .outputFromExampleFiles([
         "tutorial/equality-sort-range-guideline/find-range-gte/run.js"
      ])
      .withDbName(dbName)
      .shouldMatch("tutorial/equality-sort-range-guideline/find-range-gte/output.sh");
  });

  test("Should find documents in the movies collection with year less than 1900", async () => {
    await Expect
      .outputFromExampleFiles([
         "tutorial/equality-sort-range-guideline/find-range-lt/run.js"
      ])
      .withDbName(dbName)
      .shouldMatch("tutorial/equality-sort-range-guideline/find-range-lt/output.sh");
  });

  test("Should find documents in the movies collection where 'type' is not equal to 'movie'", async () => {
    await Expect
      .outputFromExampleFiles([
         "tutorial/equality-sort-range-guideline/find-range-ne/run.js"
      ])
      .withDbName(dbName)
      .shouldResemble("tutorial/equality-sort-range-guideline/find-range-ne/output.sh")
      .withSchema({
        count: 5,
        requiredFields: ["_id", "title", "year", "type"],
      });
  });

  test("Should find documents in the movies collection where 'directors' is David Lynch, 'runtime' is less than 130 minutes, sorted by year, asc", async () => {
    await Expect
      .outputFromExampleFiles([
         "tutorial/equality-sort-range-guideline/find-all-esr-elements/run.js"
      ])
      .withDbName(dbName)
      .shouldMatch("tutorial/equality-sort-range-guideline/find-all-esr-elements/output.sh");
  });

}, dbName);
