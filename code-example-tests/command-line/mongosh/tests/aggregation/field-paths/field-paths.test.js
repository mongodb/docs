const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");
const { describeWithSampleData } = require("../../../utils/sampleDataChecker");

jest.setTimeout(10000);

describe("field path expression tests", () => {
   const dbName = "field-paths-db";

   afterEach(() => {
      const mongoUri = process.env.CONNECTION_STRING;
      const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;
      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to drop database '${dbName}':`, error.message);
      }
   });

   test("Should project array of nested field values", async () => {
      await Expect
         .outputFromExampleFiles([
            "aggregation/field-paths/array-of-nested-fields/load-data.js",
            "aggregation/field-paths/array-of-nested-fields/project-array-field-path.js"
         ])
         .withDbName(dbName)
         .shouldMatch("aggregation/field-paths/array-of-nested-fields/output.sh");
   });

   test("Should project nested array of arrays", async () => {
      await Expect
         .outputFromExampleFiles([
            "aggregation/field-paths/nested-array-of-arrays/load-data.js",
            "aggregation/field-paths/nested-array-of-arrays/project-nested-array.js"
         ])
         .withDbName(dbName)
         .shouldMatch("aggregation/field-paths/nested-array-of-arrays/output.sh");
   });
});

const sampleDbName = "sample_mflix";

describeWithSampleData("sample_mflix field path expression tests", () => {
   test("Should project a nested field value from movies", async () => {
      await Expect
         .outputFromExampleFiles([
            "aggregation/field-paths/nested-field/project-nested-field.js"
         ])
         .withDbName(sampleDbName)
         .shouldMatch("aggregation/field-paths/nested-field/output.sh");
   });
}, sampleDbName);
