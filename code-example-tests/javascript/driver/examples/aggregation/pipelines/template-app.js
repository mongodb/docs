//	:replace-start: {
//	  "terms": {
//	    "process.env.CONNECTION_STRING": "\"<connection-string>\""
//	  }
//	}
import { MongoClient } from 'mongodb';

// :snippet-start: example
// :uncomment-start:
//const { MongoClient } = require("mongodb");
// :uncomment-end:
// Replace the placeholder with your connection string.
const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);
export async function run() {
  try {
    const aggDB = client.db('agg_tutorials_db');

    // Get a reference to relevant collections.
    // ... const someColl =
    const someColl = aggDB.collection('some_coll'); // :remove:
    // ... const anotherColl =
    const anotherColl = aggDB.collection('another_coll'); // :remove:

    // Delete any existing documents in collections.
    // ... await someColl.deleteMany({});
    await someColl.deleteMany({}); // :remove:

    // Insert sample data into the collection or collections.
    // ... const someData = [ ... ];
    const someData = [{ name: 'sample1' }, { name: 'sample2' }]; // :remove:
    // ... await someColl.insertMany(someData);
    await someColl.insertMany(someData); // :remove:

    // Create an empty pipeline array.
    const pipeline = [];

    // Add code to create pipeline stages.
    // ... pipeline.push({ ... })
    // :remove-start:
    pipeline.push({
      $match: {
        name: 'sample2',
      },
    });
    // :remove-end:

    // Run the aggregation.
    // ... const aggregationResult = ...
    const aggregationResult = someColl.aggregate(pipeline); // :remove:

    const documents = []; // :remove:
    // Print the aggregation results.
    for await (const document of aggregationResult) {
      // :uncomment-start:
      //console.log(document);
      // :uncomment-end:
      documents.push(document); // :remove:
    }
    return documents; // :remove:
  } finally {
    await client.close();
  }
}

// :uncomment-start:
//run().catch(console.dir);
// :uncomment-end:
// :snippet-end:
// :replace-end:
