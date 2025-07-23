import { MongoClient } from 'mongodb';

// Replace the placeholder with your connection string.
const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

export async function runUnwindTutorial() {
  try {
    const aggDB = client.db('agg_tutorials_db');
    const orders = aggDB.collection('orders');

    const pipeline = [];
    // :snippet-start: unwind
    pipeline.push({
      $unwind: {
        path: '$products',
      },
    });
    // :snippet-end:

    // :snippet-start: match
    pipeline.push({
      $match: {
        'products.price': {
          $gt: 15,
        },
      },
    });
    // :snippet-end:

    // :snippet-start: group
    pipeline.push({
      $group: {
        _id: '$products.prod_id',
        product: { $first: '$products.name' },
        total_value: { $sum: '$products.price' },
        quantity: { $sum: 1 },
      },
    });
    // :snippet-end:

    // :snippet-start: set
    pipeline.push({
      $set: {
        product_id: '$_id',
      },
    });
    // :snippet-end:

    // :snippet-start: unset
    pipeline.push({ $unset: ['_id'] });
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
