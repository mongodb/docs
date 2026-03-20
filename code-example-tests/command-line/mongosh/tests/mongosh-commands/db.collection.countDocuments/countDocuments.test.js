const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("db.collection.countDocuments() tests", () => {
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

  test("Should count all documents in the sample_mflix.movies collection", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.countDocuments/count-all/count-all.js"
      ])
      .withDbName(dbName)
      .shouldMatch("21349");
  });

  test("Should count matched documents in the sample_mflix.movies collection where director field contains \"David Lynch\"", async () => {
   await Expect
     .outputFromExampleFiles([
       "mongosh-commands/db.collection.countDocuments/count-match/count-match.js"
     ])
     .withDbName(dbName)
     .shouldMatch("8");
 });

}, dbName);
