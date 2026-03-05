const { execSync } = require("child_process");
const Expect = require("../../../../utils/comparison/Expect");

jest.setTimeout(10000);

describe("mongosh tests for $convert", () => {
  const dbName = "convert-test";

  // Drop the database after running the tests
  afterEach(() => {
    const mongoUri = process.env.CONNECTION_STRING;
    const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;

    try {
      execSync(command, { encoding: "utf8" });
    } catch (error) {
      console.error(`Failed to drop database '${dbName}':`, error.message);
    }
  });

  /*
    This test is skipped because MongoDB 8.3 is not yet available for atlas-cli
    testing. 
    
    Once MongoDB 8.3 is available in atlas-cli, this test should be re-enabled 
    to ensure that the $convert operator can successfully convert an array of 
    integers to binData. 
  */
  test.skip("Should convert array of numeric values to binData", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/convert/array/load-data.js",
        "aggregation/expressions/convert/array/convert-array-to-bindata.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/convert/array/output.sh");
  });

  /*
    This test is skipped because MongoDB 8.3 is not yet available for atlas-cli
    testing. 
    
    Once MongoDB 8.3 is available in atlas-cli, this test should be re-enabled 
    to ensure that the $convert operator can successfully convert binData to all
    variants.
  */
  test.skip("Should convert binData to variants", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/convert/bindata-to-array/variants/load-data.js",
        "aggregation/expressions/convert/bindata-to-array/variants/convert-bindata-to-array-variants.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/convert/bindata-to-array/variants/output.sh");
  });

  test("Should convert a long to binData", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/convert/long/load-data.js",
        "aggregation/expressions/convert/long/convert-long-to-bindata.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/convert/long/output.sh");
  });

  test("Should convert a big-endian long to binData", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/convert/long-big-endian/load-data.js",
        "aggregation/expressions/convert/long-big-endian/convert-long-big-endian-to-bindata.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/convert/long-big-endian/output.sh");
  });

  test("Should convert a double to binData", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/convert/double/load-data.js",
        "aggregation/expressions/convert/double/convert-double-to-bindata.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/convert/double/output.sh");
  });

  test("Should convert an int to binData", async () => {
    await Expect
      .outputFromExampleFiles([
        "aggregation/expressions/convert/int/load-data.js",
        "aggregation/expressions/convert/int/convert-int-to-bindata.js"
      ])
      .withDbName(dbName)
      .shouldMatch("aggregation/expressions/convert/int/output.sh");
  });

});
