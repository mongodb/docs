const Expect = require("../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../utils/sampleDataChecker");

jest.setTimeout(30000);

const dbName = "sample_mflix";

describeWithSampleData("mongosh geospatial query tests", () => {

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
