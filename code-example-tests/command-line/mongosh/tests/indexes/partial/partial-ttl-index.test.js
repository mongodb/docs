const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");

jest.setTimeout(10000);

describe("partial TTL index tests", () => {
   const dbName = "partial-ttl-index-examples";

   afterEach(() => {
      const mongoUri = process.env.CONNECTION_STRING;
      const command = `mongosh "${mongoUri}" --eval "db = db.getSiblingDB('${dbName}'); db.dropDatabase();"`;
      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to drop database '${dbName}':`, error.message);
      }
   });

   test("Should create a partial TTL index", async () => {
      await Expect
         .outputFromExampleFiles([
            "indexes/partial/create-partial-ttl-index.js"
         ])
         .withDbName(dbName)
         .shouldMatch("indexes/partial/create-partial-ttl-index-output.sh");
   });

   test("Should insert event documents", async () => {
      await Expect
         .outputFromExampleFiles([
            "indexes/partial/insert-events.js"
         ])
         .withDbName(dbName)
         .withIgnoredFields("insertedIds")
         .shouldMatch("indexes/partial/insert-events-output.sh");
   });
});
