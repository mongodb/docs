import { MongoClient } from 'mongodb';

// Replace the placeholder with your connection string.
const uri = process.env.CONNECTION_STRING;

export async function runMetaFieldQuery() {
  const client = new MongoClient(uri);
  try {
    const timeSeriesDB = client.db('timeseries');
    const stocks = timeSeriesDB.collection('stocks');

    // :snippet-start: meta-field-query
    const metafieldResults = await stocks.find(
      { ticker: 'MDB' },
      { projection: { _id: 0 } }
    );
    // :snippet-end:

    const documents = [];
    for await (const document of metafieldResults) {
      documents.push(document);
    }
    return documents;
  } finally {
    await client.close();
  }
}

export async function runTimeFieldQuery() {
  const client = new MongoClient(uri);
  try {
    const timeSeriesDB = client.db('timeseries');
    const stocks = timeSeriesDB.collection('stocks');

    // :snippet-start: time-field-query
    const startTime = new Date(2021, 11, 18, 15, 50, 0, 0);
    const endTime = new Date(2021, 11, 18, 15, 56, 0, 0);

    const query = {
      $and: [{ date: { $gte: startTime } }, { date: { $lte: endTime } }],
    };

    const timefieldResults = await stocks.find(query, {
      projection: { _id: 0 },
    });
    // :snippet-end:

    const documents = [];
    for await (const document of timefieldResults) {
      documents.push(document);
    }
    return documents;
  } finally {
    await client.close();
  }
}
