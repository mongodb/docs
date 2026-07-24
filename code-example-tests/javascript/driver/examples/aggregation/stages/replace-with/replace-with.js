//	:replace-start: {
//	  "terms":
//	  {
//	  "process.env.CONNECTION_STRING": "\"<connection string URI>\"",
//    "export ": ""
//	  }
//	}
import { MongoClient } from 'mongodb';

export async function runReplaceWith() {
  const uri = process.env.CONNECTION_STRING;
  const client = new MongoClient(uri);

  try {
    const database = client.db('sample_mflix');
    const collection = database.collection('movies');

    // :snippet-start: replace-with
    const pipeline = [{ $replaceWith: '$imdb' }];

    const cursor = collection.aggregate(pipeline);
    // :uncomment-start:
    // return cursor;
    // :uncomment-end:
    // :snippet-end:

    const documents = [];
    for await (const document of cursor) {
      documents.push(document);
      if (documents.length >= 5) break;
    }
    return documents;
  } finally {
    await client.close();
  }
}
// :uncomment-start:
//runReplaceWith().catch(console.dir);
// :uncomment-end:
// :replace-end:
