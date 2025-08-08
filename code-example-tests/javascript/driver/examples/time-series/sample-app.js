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

export async function runApp() {
  try {
    // :remove-start:
    await client.connect();
    await client.db('admin').command({ ping: 1 });
    return 'Pinged your deployment. You successfully connected to MongoDB!';
    // :remove-end:
    // start example code here

    // end example code here
  } finally {
    await client.close();
  }
}

// :uncomment-start:
//runApp().catch(console.dir);
// :uncomment-end:
// :snippet-end:
// :replace-end:
