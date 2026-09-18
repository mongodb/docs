const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh sample_mflix compound index tutorial tests", () => {

  // Drop the compound index created by the tests after each test
  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.movies.dropIndex({ title: 1, metacritic: -1 });"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop compound index on '${dbName}':`, error.message);
    }
  });

  test("Should create a compound index on the title and metacritic fields", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/compound/create-compound-index-tutorial/create-index.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/compound/create-compound-index-tutorial/create-index-output.sh");
  });

  test("Should find a movie that matches both indexed fields", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/compound/create-compound-index-tutorial/create-index.js",
        "indexes/compound/create-compound-index-tutorial/find-both-fields.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/compound/create-compound-index-tutorial/find-both-fields-output.sh");
  });

  test("Should find a movie using only the index prefix field", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/compound/create-compound-index-tutorial/create-index.js",
        "indexes/compound/create-compound-index-tutorial/find-prefix.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/compound/create-compound-index-tutorial/find-prefix-output.sh");
  });

  test("Should query on a non-prefix field", async () => {
    await Expect
      .outputFromExampleFiles([
        "indexes/compound/create-compound-index-tutorial/create-index.js",
        "indexes/compound/create-compound-index-tutorial/find-non-prefix.js"
      ])
      .withDbName(dbName)
      .shouldMatch("indexes/compound/create-compound-index-tutorial/find-non-prefix-output.sh");
  });

}, dbName);
