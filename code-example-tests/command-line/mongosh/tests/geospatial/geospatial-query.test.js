const { execSync } = require("child_process");  
const Expect = require("../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../utils/sampleDataChecker");

jest.setTimeout(30000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh geospatial query tests", () => {

  beforeAll(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    try {
      execSync(
        `mongosh "${mongoUri}" --quiet --eval ` +
        `'db = db.getSiblingDB("${dbName}"); ` +
        `db.theaters.createIndex({ "location.geo": "2dsphere" }, { sparse: true });'`,
        { encoding: "utf8" }
      );
    } catch (error) {
      throw new Error(
        `Failed to create geospatial index on ${dbName}.theaters: ${error.message}`
      );
    }
  });

  afterAll(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    try {
      execSync(
        `mongosh "${mongoUri}" --quiet --eval ` +
        `'db = db.getSiblingDB("${dbName}"); ` +
        `db.theaters.createIndex({ "location.geo": "2dsphere" }, { sparse: true });'`,
        { encoding: "utf8" }
      );
    } catch (error) {
      console.error("Failed to restore geospatial index:", error.message);
    }
  });

  test("Should find theaters near a location using $near", async () => {
    await Expect
      .outputFromExampleFiles(["geospatial/query/near.js"])
      .withDbName(dbName)
      .shouldResemble("geospatial/query/near-output.sh")
      .withSchema({
        count: 3,
        requiredFields: ["_id", "theaterId", "location"],
      });
  });

  test("Should find theaters near a location using $geoNear aggregation", async () => {
    await Expect
      .outputFromExampleFiles(["geospatial/query/geo-near.js"])
      .withDbName(dbName)
      .shouldResemble("geospatial/query/geo-near-output.sh")
      .withSchema({
        count: 3,
        requiredFields: ["_id", "theaterId", "location", "calcDistance"],
      });
  });

}, dbName);
