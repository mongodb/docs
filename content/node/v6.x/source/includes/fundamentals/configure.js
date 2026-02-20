const { MongoClient, ReadPreference } = require('mongodb');

// start-client-settings
const clientOptions = {
  readPreference: ReadPreference.SECONDARY,
  readConcern: { level: "local" },
  writeConcern: { w: 2 },
};

const client = new MongoClient("mongodb://localhost:27017", clientOptions);
// end-client-settings

async function main() {
  await client.connect();

  // start-client-settings-uri
  const uri = "mongodb://localhost:27017/?readPreference=secondary&readConcernLevel=local&w=2";
  const clientWithUri = new MongoClient(uri);
  // end-client-settings-uri

  // start-transaction-settings
  const transactionOptions = {
    readPreference: ReadPreference.PRIMARY,
    readConcern: { level: "majority" },
    writeConcern: { w: 1 },
  };

  const session = client.startSession();
  session.startTransaction(transactionOptions);
  // end-transaction-settings

  // Sets read and write settings for the "test_database" database
  // start-database-settings
  const dbOptions = {
    readPreference: ReadPreference.PRIMARY_PREFERRED,
    readConcern: { level: "available" },
    writeConcern: { w: "majority" },
  };

  const db = client.db("test_database", dbOptions);
  // end-database-settings

  // Sets read and write settings for the "test_collection" collection
  // start-collection-settings
  const collOptions = {
    readPreference: ReadPreference.SECONDARY_PREFERRED,
    readConcern: { level: "available" },
    writeConcern: { w: 0 },
  };

  const collection = db.collection("test_collection", collOptions);
  // end-collection-settings

  // Instructs the library to prefer reads from secondary replica set members
  // located in New York, followed by a secondary in San Francisco, and
  // lastly fall back to any secondary.
  // start-tag-set
  const taggedReadPreference = new ReadPreference(
    ReadPreference.SECONDARY,
    [
      { dc: "ny" },
      { dc: "sf" },
      {}
    ]
  );

  const dbWithTags = client.db(
    "test_database",
    { readPreference: taggedReadPreference }
  );
  // end-tag-set

  // Instructs the library to distribute reads between members within 35 milliseconds
  // of the closest member's ping time
  // start-local-threshold
  const clientWithLocalThreshold = new MongoClient("mongodb://localhost:27017", {
    replicaSet: "repl0",
    readPreference: ReadPreference.SECONDARY_PREFERRED,
    localThresholdMS: 35
  });
  // end-local-threshold

  // Create the "souvenirs" collection and specify the French Canadian collation
  // start-collection-collation
  const db = client.db("db")
  db.createCollection("names", {
    collation: { locale: "fr_CA" },
  });
  // end-collection-collation

  // Create an index collation on the "souvenirs" collection
  // start-index-collation
  const coll = db.collection("names");
  coll.createIndex(
    { "last_name" : 1 },
    { "collation" : { "locale" : "en_US" } });
  // end-index-collation

  // Apply a collation to an operation
  // start-operation-collation
  coll.findOneAndUpdate(
    { first_name: { $lt: "Gunter" } },
    { $set: { verified: true } },
    { collation: { locale: "de@collation=phonebook" } },
  );
  // end-operation-collation
}

main().catch(console.error);