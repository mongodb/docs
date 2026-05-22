const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(15000);

const dbName = "sample_mflix";

describeWithSampleData("$sort aggregation stage example tests", () => {

  // Drop indexes for a test that created one
  const dropIndexes = () => {
    const command = `mongosh "${process.env.CONNECTION_STRING}" --quiet --eval "db = db.getSiblingDB('${dbName}'); db.movies.dropIndexes();"`;
    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      // Ignore — index may not exist
    }
  };

  test("Should sort year 1925/1926 movies by year ascending", async () => {
    await Expect
      .outputFromExampleFiles(["aggregation/stages/sort/sort-by-year.js"])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/sort/sort-by-year-output.sh");
  });

  test("Should consistently sort year 1925/1926 movies by year and _id", async () => {
    await Expect
      .outputFromExampleFiles(["aggregation/stages/sort/sort-by-year-and-id.js"])
      .withDbName(dbName)
      .shouldResemble("aggregation/stages/sort/sort-by-year-and-id-output.sh")
      .withSchema({
        count: 9,
        requiredFields: ["_id", "title", "year"],
      });
  });

  test("Should sort by genres array ascending", async () => {
    await Expect
      .outputFromExampleFiles(["aggregation/stages/sort/array-sort-asc.js"])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/sort/array-sort-asc-output.sh");
  });

  test("Should sort by genres array descending", async () => {
    await Expect
      .outputFromExampleFiles(["aggregation/stages/sort/array-sort-desc.js"])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/sort/array-sort-desc-output.sh");
  });

  test("Should filter by genres and sort by genres ascending", async () => {
    await Expect
      .outputFromExampleFiles(["aggregation/stages/sort/array-filter-sort.js"])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/sort/array-filter-sort-output.sh");
  });

  test("Should sort movies by year descending then title ascending", async () => {
    await Expect
      .outputFromExampleFiles(["aggregation/stages/sort/sort-multi-field.js"])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/sort/sort-multi-field-output.sh");
  });

  test("Should sort by text score metadata with year as tiebreaker", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/stages/sort/create-text-index.js",
        "aggregation/stages/sort/text-score-sort.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/stages/sort/text-score-sort-output.sh");

      dropIndexes();
  });

}, dbName);
