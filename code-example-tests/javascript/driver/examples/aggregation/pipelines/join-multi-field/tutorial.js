import { MongoClient } from 'mongodb';

// Replace the placeholder with your connection string.
const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

export async function runJoinMultiFieldTutorial() {
  try {
    const aggDB = client.db('agg_tutorials_db');
    const products = aggDB.collection('products');

    const pipeline = [];
    // :snippet-start: embedded-pl-match-name-variation
    const embedded_pl = [];

    embedded_pl.push({
      $match: {
        $expr: {
          $and: [
            { $eq: ['$product_name', '$$prdname'] },
            { $eq: ['$product_variation', '$$prdvartn'] },
          ],
        },
      },
    });
    // :snippet-end:

    // :snippet-start: embedded-pl-match-orderdate
    embedded_pl.push({
      $match: {
        orderdate: {
          $gte: new Date('2020-01-01T00:00:00Z'),
          $lt: new Date('2021-01-01T00:00:00Z'),
        },
      },
    });
    // :snippet-end:

    // :snippet-start: embedded-pl-unset
    embedded_pl.push({
      $unset: ['_id', 'product_name', 'product_variation'],
    });
    // :snippet-end:

    // :snippet-start: lookup
    pipeline.push({
      $lookup: {
        from: 'orders',
        let: {
          prdname: '$name',
          prdvartn: '$variation',
        },
        pipeline: embedded_pl,
        as: 'orders',
      },
    });
    // :snippet-end:

    // :snippet-start: match
    pipeline.push({
      $match: {
        orders: { $ne: [] },
      },
    });
    // :snippet-end:

    // :snippet-start: unset
    pipeline.push({
      $unset: ['_id', 'description'],
    });
    // :snippet-end:

    // :snippet-start: run-pipeline
    const aggregationResult = await products.aggregate(pipeline);
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
