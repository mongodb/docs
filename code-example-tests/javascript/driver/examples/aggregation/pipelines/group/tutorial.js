import { MongoClient } from 'mongodb';

// Replace the placeholder with your connection string.
const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

export async function runGroupTutorial() {
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

    // :snippet-start: sort-orderdate
    pipeline.push({
      $sort: {
        orderdate: 1,
      },
    });
    // :snippet-end:

    // :snippet-start: group
    pipeline.push({
      $group: {
        _id: '$customer_id',
        first_purchase_date: { $first: '$orderdate' },
        total_value: { $sum: '$value' },
        total_orders: { $sum: 1 },
        orders: {
          $push: {
            orderdate: '$orderdate',
            value: '$value',
          },
        },
      },
    });
    // :snippet-end:

    // :snippet-start: sort-first-purchase-date
    pipeline.push({
      $sort: {
        first_purchase_date: 1,
      },
    });
    // :snippet-end:

    // :snippet-start: set
    pipeline.push({
      $set: {
        customer_id: '$_id',
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
