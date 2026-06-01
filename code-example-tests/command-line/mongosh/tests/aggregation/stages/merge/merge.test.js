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

describeWithSampleData("$merge aggregation stage tests", () => {

  describe("On-Demand Materialized View: Initial Creation", () => {
    afterEach(() => {
      dropCollection(dbName, "movieRatingSummary");
    });

    test("Should create movieRatingSummary from critically-acclaimed films through 1972", async () => {
      await Expect
        .outputFromExampleFiles([
          "aggregation/stages/merge/initial-creation.js",
          "aggregation/stages/merge/initial-creation-find.js"
        ])
        .withDbName(dbName)
        .shouldMatch("aggregation/stages/merge/initial-creation-find-output.sh");
    });
  });

  describe("On-Demand Materialized View: Update/Replace Data", () => {
    afterEach(() => {
      dropCollection(dbName, "movieRatingSummary");
    });

    test("Should update movieRatingSummary with films from 1963 onward", async () => {
      await Expect
        .outputFromExampleFiles([
          "aggregation/stages/merge/initial-creation.js",
          "aggregation/stages/merge/update-replace.js",
          "aggregation/stages/merge/update-replace-find.js"
        ])
        .withDbName(dbName)
        .shouldMatch("aggregation/stages/merge/update-replace-find-output.sh");
    });
  });

  describe("Only Insert New Data", () => {
    afterEach(() => {
      dropCollection(dbName, "movieArchive");
    });

    test("Should insert only new critically-acclaimed films into the archive", async () => {
      await Expect
        .outputFromExampleFiles([
          "aggregation/stages/merge/insert-only-archive-seed.js",
          "aggregation/stages/merge/insert-only-archive-index.js",
          "aggregation/stages/merge/insert-only.js"
        ])
        .withDbName(dbName)
        .shouldResemble("aggregation/stages/merge/insert-only-find-output.sh")
        .withSchema({
          count: 7,
          requiredFields: ["_id", "titles", "year"]
        });
    });
  });

  describe("Merge Results from Multiple Collections", () => {
    afterEach(() => {
      dropCollection(dbName, "yearlyStats");
    });

    test("Should create yearlyStats with movie counts", async () => {
      await Expect
        .outputFromExampleFiles([
          "aggregation/stages/merge/merge-movies.js",
          "aggregation/stages/merge/merge-yearly-stats-find.js"
        ])
        .withDbName(dbName)
        .shouldMatch("aggregation/stages/merge/merge-movies-find-output.sh");
    });

    test("Should merge comment counts into yearlyStats", async () => {
      await Expect
        .outputFromExampleFiles([
          "aggregation/stages/merge/merge-movies.js",
          "aggregation/stages/merge/merge-comments.js",
          "aggregation/stages/merge/merge-yearly-stats-find.js"
        ])
        .withDbName(dbName)
        .shouldMatch("aggregation/stages/merge/merge-combined-find-output.sh");
    });
  });

  describe("Use the Pipeline to Customize the Merge", () => {
    afterEach(() => {
      dropCollection(dbName, "monthlyCommentTotals");
    });

    test("Should accumulate daily comment count into monthly total", async () => {
      await Expect
        .outputFromExampleFiles([
          "aggregation/stages/merge/pipeline-customize-setup.js",
          "aggregation/stages/merge/pipeline-customize.js",
          "aggregation/stages/merge/pipeline-customize-find.js"
        ])
        .withDbName(dbName)
        .shouldMatch("aggregation/stages/merge/pipeline-customize-find-output.sh");
    });
  });

  describe("Use Variables to Customize the Merge", () => {
    afterEach(() => {
      dropCollection(dbName, "movieDetails");
    });

    test("Should add year variable to matched document via merge stage let", async () => {
      await Expect
        .outputFromExampleFiles([
          "aggregation/stages/merge/variables-merge-stage.js"
        ])
        .withDbName(dbName)
        .shouldMatch("aggregation/stages/merge/variables-merge-stage-output.sh");
    });

    test("Should add year variable to matched document via aggregate command let", async () => {
      await Expect
        .outputFromExampleFiles([
          "aggregation/stages/merge/variables-aggregate-command.js"
        ])
        .withDbName(dbName)
        .shouldMatch("aggregation/stages/merge/variables-aggregate-command-output.sh");
    });

    test("Should prefer merge stage let over aggregate command let when same variable defined in both", async () => {
      await Expect
        .outputFromExampleFiles([
          "aggregation/stages/merge/variables-merge-and-aggregate.js"
        ])
        .withDbName(dbName)
        .shouldMatch("aggregation/stages/merge/variables-merge-and-aggregate-output.sh");
    });
  });

  describe("On-Demand Materialized View: Initial Creation (materialized-views page)", () => {
    afterEach(() => {
      dropCollection(dbName, "movieYearStats");
    });

    test("Should create movieYearStats from movies from 2015 onward", async () => {
      await Expect
        .outputFromExampleFiles([
          "aggregation/stages/merge/materialized-view-define.js",
          "aggregation/stages/merge/materialized-view-initial-run.js",
          "aggregation/stages/merge/materialized-view-find.js"
        ])
        .withDbName(dbName)
        .shouldMatch("aggregation/stages/merge/materialized-view-find-output.sh");
    });
  });

  describe("On-Demand Materialized View: Refresh (materialized-views page)", () => {
    afterEach(() => {
      dropCollection(dbName, "movieYearStats");
      try {
        execSync(
          `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.movies.deleteOne({ title: 'Grove Test Movie' });"`,
          { encoding: "utf8" }
        );
      } catch (e) {
        // Document may not exist — safe to ignore
      }
    });

    test("Should update movieYearStats when new movie added for 2016", async () => {
      await Expect
        .outputFromExampleFiles([
          "aggregation/stages/merge/materialized-view-define.js",
          "aggregation/stages/merge/materialized-view-initial-run.js",
          "aggregation/stages/merge/materialized-view-seed.js",
          "aggregation/stages/merge/materialized-view-refresh-run.js",
          "aggregation/stages/merge/materialized-view-find.js"
        ])
        .withDbName(dbName)
        .shouldMatch("aggregation/stages/merge/materialized-view-refresh-find-output.sh");
    });
  });

}, dbName);
