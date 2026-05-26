const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

const mongoUri = process.env.CONNECTION_STRING;

// ---- insertOne without _id ----
describeWithSampleData("db.collection.insertOne() - without _id", () => {
  afterEach(() => {
    execSync(
      `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('sample_mflix'); db.movies.deleteOne({ title: 'Inception', year: 2010, genres: ['Action', 'Sci-Fi'] });"`,
      { encoding: "utf8" }
    );
  });

  test("Should insert a document and return insertedId", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.insertOne/insert-one-without-id.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.insertOne/insert-one-without-id-output.sh");
  });
}, "sample_mflix");

// ---- insertOne with _id ----
describeWithSampleData("db.collection.insertOne() - with _id", () => {
  afterEach(() => {
    execSync(
      `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('sample_mflix'); db.movies.deleteOne({ _id: 10 });"`,
      { encoding: "utf8" }
    );
  });

  test("Should insert a document with a specified _id", async () => {
    await Expect
      .outputFromExampleFiles([
        "mongosh-commands/db.collection.insertOne/insert-one-with-id.js"
      ])
      .withDbName("sample_mflix")
      .shouldMatch("mongosh-commands/db.collection.insertOne/insert-one-with-id-output.sh");
  });
}, "sample_mflix");
