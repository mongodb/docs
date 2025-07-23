import { MongoClient } from 'mongodb';

// Replace the placeholder with your connection string.
const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

export async function runJoinOneToOneTutorial() {
  try {
    const aggDB = client.db('agg_tutorials_db');
    const orders = aggDB.collection('orders');

    const pipeline = [];
    // :snippet-start: match
    pipeline.push({
      $match: {
        orderdate: {
          $gte: new Date('2020-01-01T00:00:00Z'),
          $lt: new Date('2021-01-01T00:00:00Z'),
        },
      },
    });
    // :snippet-end:

    // :snippet-start: lookup
    pipeline.push({
      $lookup: {
        from: 'products',
        localField: 'product_id',
        foreignField: 'id',
        as: 'product_mapping',
      },
    });
    // :snippet-end:

    // :snippet-start: set
    pipeline.push(
      {
        $set: {
          product_mapping: { $first: '$product_mapping' },
        },
      },
      {
        $set: {
          product_name: '$product_mapping.name',
          product_category: '$product_mapping.category',
        },
      }
    );
    // :snippet-end:

    // :snippet-start: unset
    pipeline.push({ $unset: ['_id', 'product_id', 'product_mapping'] });
    // :snippet-end:

    // :snippet-start: run-pipeline
    const aggregationResult = await orders.aggregate(pipeline);
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
