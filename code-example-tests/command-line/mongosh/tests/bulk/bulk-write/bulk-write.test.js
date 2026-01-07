const { execSync } = require("child_process");
const Expect = require("../../../utils/comparison/Expect");

describe("bulkWrite examples", () => {
   const dbName = "sample_mflix";

   /**
    * Cleanup function to revert write operations from write-getMongo.js
    */
   const cleanupGetMongoBulkWriteData = () => {
      const mongoUri = process.env.CONNECTION_STRING;

      const cleanupCommands = `db = db.getSiblingDB('${dbName}'); db.users.deleteMany({ email: { \\$in: ['cersei.l@example.com', 'sansa.s@example.com'] } }); db.theaters.updateOne({ theaterId: 1000 }, { \\$set: { 'location.address.street1': '340 W Market', 'location.address.city': 'Bloomington' } });`;

      const command = `mongosh "${mongoUri}" --eval "${cleanupCommands}"`;

      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to clean up test data:`, error.message);
      }
   };

   /**
    * Cleanup function to revert write operations from insert.js
    */
   const cleanupInsert = () => {
      const mongoUri = process.env.CONNECTION_STRING;

      const cleanupCommands = `db = db.getSiblingDB('${dbName}'); db.users.deleteOne({ _id: ObjectId('67a1b2c3d4e5f6a7b8c9d0e2') }); db.users.deleteOne({ _id: ObjectId('67a1b2c3d4e5f6a7b8c9d0e3') }); db.users.updateOne({ name: 'Ned Stark' }, { \\$unset: { email: 1 } });`;

      const command = `mongosh "${mongoUri}" --eval "${cleanupCommands}"`;

      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to clean up insert test data:`, error.message);
      }
   };

   /**
    * Cleanup function to revert write operations from insert-error.js
    * Operations: inserts Sansa, updates Catelyn email, deletes Ned, replaces Robb
    */
   const cleanupInsertError = () => {
      const mongoUri = process.env.CONNECTION_STRING;

      const cleanupCommands = `db = db.getSiblingDB('${dbName}'); db.users.deleteOne({ _id: ObjectId('67a1b2c3d4e5f6a7b8c9d0e9') }); db.users.deleteOne({ name: 'Catelyn Stark' }); db.users.insertOne({ _id: ObjectId('59b99db5cfa9a34dcd7885b9'), name: 'Catelyn Stark', email: 'michelle_fairley@gameofthron.es', password: '\\$2b\\$12\\$fiaTH5Sh1zKNFX2i/FTEreWGjxoJxvmV7XL.qlfqCr8CwOxK.mZWS' }); db.users.deleteOne({ name: 'Robb Stark' }); db.users.insertOne({ _id: ObjectId('59b99dbacfa9a34dcd7885c2'), name: 'Robb Stark', email: 'richard_madden@gameofthron.es', password: '\\$2b\\$12\\$XPLvWQW7tjWc/PX9jMVRnO8w.lR6hv144ee8pc8nDsWIAWxfwxHzy' }); db.users.insertOne({ _id: ObjectId('59b99db4cfa9a34dcd7885b6'), name: 'Ned Stark', email: 'sean_bean@gameofthron.es', password: '\\$2b\\$12\\$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu' });`;

      const command = `mongosh "${mongoUri}" --eval "${cleanupCommands}"`;

      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to clean up insert error test data:`, error.message);
      }
   };

   /**
    * Cleanup function to revert write operations from majority-write-concern.js
    */
   const cleanupMajorityWriteConcern = () => {
      const mongoUri = process.env.CONNECTION_STRING;

      const cleanupCommands = `db = db.getSiblingDB('${dbName}'); db.users.updateMany({ name: { \\$regex: /Stark\\$/ } }, { \\$unset: { house: 1, verified: 1 } }); db.users.updateOne({ name: 'Ned Stark' }, { \\$unset: { title: 1 } }); db.users.updateOne({ name: 'Catelyn Stark' }, { \\$unset: { title: 1 } });`;

      const command = `mongosh "${mongoUri}" --eval "${cleanupCommands}"`;

      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to clean up majority write concern test data:`, error.message);
      }
   };

   /**
    * Cleanup function to revert write operations from single-namespace.js
    * Operations: inserts Tyrion, updates Ned email, deletes Tyrion
    */
   const cleanupSingleNamespace = () => {
      const mongoUri = process.env.CONNECTION_STRING;

      const cleanupCommands = `db = db.getSiblingDB('${dbName}'); db.users.deleteOne({ _id: ObjectId('67a1b2c3d4e5f6a7b8c9d0e1') }); db.users.updateOne({ name: 'Ned Stark' }, { \\$set: { email: 'sean_bean@gameofthron.es' } });`;

      const command = `mongosh "${mongoUri}" --eval "${cleanupCommands}"`;

      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to clean up single namespace test data:`, error.message);
      }
   };

   /**
    * Cleanup function to revert write operations from multiple-namespaces.js
    * Operations: inserts Sansa & Bran, updates Ned email, deletes Bran,
    *             updates theater 1000 city, updates theaters status, deletes specific theater, deletes VT theaters
    */
   const cleanupMultipleNamespaces = () => {
      const mongoUri = process.env.CONNECTION_STRING;

      const cleanupCommands = `db = db.getSiblingDB('${dbName}'); db.users.deleteOne({ _id: ObjectId('67a1b2c3d4e5f6a7b8c9d0e7') }); db.users.deleteOne({ _id: ObjectId('67a1b2c3d4e5f6a7b8c9d0e8') }); db.users.updateOne({ name: 'Ned Stark' }, { \\$set: { email: 'sean_bean@gameofthron.es' } }); db.theaters.updateMany({ theaterId: { \\$lt: 1010 } }, { \\$unset: { status: 1 } }); db.theaters.updateOne({ theaterId: 1000 }, { \\$set: { 'location.address.city': 'Bloomington' } }); db.theaters.insertOne({ _id: ObjectId('59a47286cfa9a3a73e51e72c'), theaterId: 1000, location: { address: { street1: '340 W Market', city: 'Bloomington', state: 'MN', zipcode: '55425' }, geo: { type: 'Point', coordinates: [-93.24565, 44.85466] } } }); db.theaters.insertMany([{ _id: ObjectId('59a47287cfa9a3a73e51eae6'), theaterId: 360, location: { address: { street1: '26 Cypress St', city: 'Williston', state: 'VT', zipcode: '05495' }, geo: { type: 'Point', coordinates: [-73.108429, 44.443977] } } }, { _id: ObjectId('59a47287cfa9a3a73e51ec9c'), theaterId: 8159, location: { address: { street1: '1200 Airport Drive', street2: null, city: 'S. Burlington', state: 'VT', zipcode: '5403' }, geo: { type: 'Point', coordinates: [-73.154758, 44.469108] } } }]);`;

      const command = `mongosh "${mongoUri}" --eval "${cleanupCommands}"`;

      try {
         execSync(command, { encoding: "utf8" });
      } catch (error) {
         console.error(`Failed to clean up multiple namespaces test data:`, error.message);
      }
   };

   test("Should return confirmation of a getMongo bulk write operation", async () => {
      const exampleFiles = [
         "bulk/write-getMongo.js"
      ]
      const outputFile = "bulk/getMongo-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("insertedId")
         .shouldMatch(outputFile);

      cleanupGetMongoBulkWriteData();
   });

   test("Should return confirmation of a bulk write insert operation", async () => {
      const exampleFiles = [
         "bulk/insert.js"
      ]
      const outputFile = "bulk/insert-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("insertedId")
         .shouldMatch(outputFile);

      cleanupInsert();
   });

   test("Should return confirmation a bulk write insert operation with 1 insert and 2 modified", async () => {
      const exampleFiles = [
         "bulk/insert-error.js"
      ]
      const outputFile = "bulk/insert-error-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("insertedId")
         .shouldMatch(outputFile);

      cleanupInsertError();
   });

   test("Should return confirmation of a bulk write insert operation with write concern set", async () => {
      const exampleFiles = [
         "bulk/majority-write-concern.js"
      ]
      const outputFile = "bulk/majority-write-concern-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("insertedId")
         .shouldMatch(outputFile);

      cleanupMajorityWriteConcern();
   });

   test("Should return confirmation of a bulk write insert on a single namespace", async () => {
      const exampleFiles = [
         "bulk/single-namespace.js"
      ]
      const outputFile = "bulk/single-namespace-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("insertedId")
         .shouldMatch(outputFile);

      cleanupSingleNamespace();
   });

   test("Should return confirmation of a bulk write insert on multiple namespaces", async () => {
      const exampleFiles = [
         "bulk/multiple-namespaces.js"
      ]
      const outputFile = "bulk/multiple-namespaces-output.sh";
      await Expect
         .outputFromExampleFiles(exampleFiles)
         .withDbName(dbName)
         .withIgnoredFields("insertedId")
         .shouldMatch(outputFile);

      cleanupMultipleNamespaces();
   });

});