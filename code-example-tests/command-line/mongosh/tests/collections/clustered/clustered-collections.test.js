const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");

jest.setTimeout(10000);

describe("clustered collection tests", () => {
   const dbName = "clustered-collections-db";

   afterEach(() => {
      const mongoUri = process.env.CONNECTION_STRING;
      const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;
      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to drop database '${dbName}':`, error.message);
      }
   });

   test("Should create a clustered collection using runCommand", async () => {
      await Expect
         .outputFromExampleFiles([
            "collections/clustered/create/run-command.js"
         ])
         .withDbName(dbName)
         .shouldMatch("collections/clustered/create/run-command-output.sh");
   });

   test("Should create a clustered collection using db.createCollection", async () => {
      await Expect
         .outputFromExampleFiles([
            "collections/clustered/create/create-by-method.js"
         ])
         .withDbName(dbName)
         .shouldMatch("collections/clustered/create/create-by-method-output.sh");
   });

   test("Should insert orders and find by date range", async () => {
      await Expect
         .outputFromExampleFiles([
            "collections/clustered/date-key/create-orders.js",
            "collections/clustered/date-key/insert-orders.js",
            "collections/clustered/date-key/find-by-date.js"
         ])
         .withDbName(dbName)
         .shouldMatch("collections/clustered/date-key/find-by-date-output.sh");
   });
});
