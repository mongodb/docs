const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";
const mongoUri = process.env.CONNECTION_STRING;

function dropCollection(db, collection) {
  try {
    execSync(
      `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${db}'); db['${collection}'].drop();"`,
      { encoding: "utf8" }
    );
  } catch (e) {
    // Collection may not exist — safe to ignore
  }
}

describeWithSampleData("$out aggregation stage tests", () => {

  describe("Output to Same Database", () => {
    afterEach(() => {
      dropCollection(dbName, "movies_by_year");
    });

    test("Should write grouped movies to movies_by_year in sample_mflix", async () => {
      await Expect
        .outputFromExampleFiles([
          "aggregation/stages/out/out-same-db.js",
          "aggregation/stages/out/out-same-db-find.js"
        ])
        .withDbName(dbName)
        .shouldMatch("aggregation/stages/out/out-same-db-find-output.sh");
    });
  });

  describe("Output to a Different Database", () => {
    afterEach(() => {
      try {
        execSync(
          `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('reporting'); db.dropDatabase();"`,
          { encoding: "utf8" }
        );
      } catch (e) {
        // Database may not exist — safe to ignore
      }
    });

    test("Should write grouped movies to movies_by_year in reporting database", async () => {
      await Expect
        .outputFromExampleFiles([
          "aggregation/stages/out/out-different-db.js",
          "aggregation/stages/out/out-different-db-find.js"
        ])
        .withDbName(dbName)
        .shouldMatch("aggregation/stages/out/out-different-db-find-output.sh");
    });
  });

}, dbName);
