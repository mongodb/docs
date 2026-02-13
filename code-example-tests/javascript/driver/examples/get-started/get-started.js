//	:replace-start: {
//	  "terms":
//	  {
//	  "process.env.CONNECTION_STRING": "\"<connection string URI>\"",
//    "export ": ""
//	  }
//	}
import { MongoClient } from 'mongodb';

// :snippet-start: example
// :uncomment-start:
//const { MongoClient } = require("mongodb");
// :uncomment-end:

export async function runGetStarted() {
  // Replace the uri string with your connection string
  const uri = process.env.CONNECTION_STRING;
  const client = new MongoClient(uri);

  try {
    const database = client.db('sample_mflix');
    const movies = database.collection('movies');

    // Queries for a movie that has a title value of 'Back to the Future'
    const query = { title: 'Back to the Future' };
    const movie = await movies.findOne(query);
    // :uncomment-start:
    //console.log(movie);
    // :uncomment-end:
    return movie; // :remove:
  } finally {
    await client.close();
  }
}
// :uncomment-start:
//runGetStarted().catch(console.dir);
// :uncomment-end:
// :snippet-end:
// :replace-end:
