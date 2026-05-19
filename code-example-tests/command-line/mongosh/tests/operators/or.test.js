const { execSync } = require("child_process");
const Expect = require("../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../utils/sampleDataChecker");

jest.setTimeout(10000);

const mflixDbName = "sample_mflix";

describeWithSampleData("$or operator - sample_mflix queries", () => {

  test("Should find movies where runtime > 1000 OR year < 1910", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/or/or-movies.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/or/or-movies-output.sh");
  });

  test("Should find theaters using $geoIntersects OR state filter", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/or/or-theaters-geointersects.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/or/or-theaters-geointersects-output.sh");
  });

  test("Should find movies using $in as equivalent to $or on same field", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/or/or-equivalent-in.js"
      ])
      .withDbName(mflixDbName)
      .shouldMatch("operators/or/or-equivalent-in-output.sh");
  });

  test("Should find movies matching $or query (index behavior example)", async () => {
    await Expect
      .outputFromExampleFiles([
        "operators/or/or-index-query.js"
      ])
      .withDbName(mflixDbName)
      .shouldResemble("operators/or/or-index-query-output.sh")
      .withSchema({
        count: 6,
        requiredFields: ["title", "runtime", "year"],
      });
  });

  describe("$or index creation", () => {
    afterEach(() => {
      const mongoUri = process.env.CONNECTION_STRING;
      const command = `mongosh "${mongoUri}" --eval "
        db = db.getSiblingDB('${mflixDbName}');
        try { db.movies.dropIndex('runtime_1'); } catch(e) {}
        try { db.movies.dropIndex('year_1'); } catch(e) {}
      "`;
      try {
        execSync(command, { encoding: "utf8" });
      } catch (error) {
        if (!error.message.includes("index not found")) {
          console.error("Failed to drop indexes:", error.message);
        }
      }
    });

    test("Should create runtime and year indexes to support $or query", async () => {
      await Expect
        .outputFromExampleFiles([
          "operators/or/or-index-create.js"
        ])
        .withDbName(mflixDbName)
        .shouldMatch("operators/or/or-index-create-output.sh");
    });
  });

}, mflixDbName);
