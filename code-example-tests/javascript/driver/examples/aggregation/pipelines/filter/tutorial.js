import { MongoClient } from 'mongodb';

// Replace the placeholder with your connection string.
const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

export async function runFilterTutorial() {
  try {
    const aggDB = client.db('agg_tutorials_db');
    const persons = aggDB.collection('persons');

    const pipeline = [];
    // :snippet-start: match
    pipeline.push({
      $match: {
        vocation: 'ENGINEER',
      },
    });
    // :snippet-end:

    // :snippet-start: sort
    pipeline.push({
      $sort: {
        dateofbirth: -1,
      },
    });
    // :snippet-end:

    // :snippet-start: limit
    pipeline.push({
      $limit: 3,
    });
    // :snippet-end:

    // :snippet-start: unset
    pipeline.push({
      $unset: ['_id', 'address'],
    });
    // :snippet-end:

    // :snippet-start: run-pipeline
    const aggregationResult = await persons.aggregate(pipeline);
    // :snippet-end:

    const documents = [];
    for await (const document of aggregationResult) {
      documents.push(document);
    }
    return documents;
  } finally {
    await client.close();
  }
}
