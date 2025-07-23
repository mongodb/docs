import { MongoClient } from 'mongodb';

const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

export async function loadJoinOneToOneSampleData() {
  try {
    const aggDB = client.db('agg_tutorials_db');
    // :snippet-start: load-sample-data
    const orders = aggDB.collection('orders');
    const products = aggDB.collection('products');

    await orders.insertMany([
      {
        customer_id: 'elise_smith@myemail.com',
        orderdate: new Date('2020-05-30T08:35:52Z'),
        product_id: 'a1b2c3d4',
        value: 431.43,
      },
      {
        customer_id: 'tj@wheresmyemail.com',
        orderdate: new Date('2019-05-28T19:13:32Z'),
        product_id: 'z9y8x7w6',
        value: 5.01,
      },
      {
        customer_id: 'oranieri@warmmail.com',
        orderdate: new Date('2020-01-01T08:25:37Z'),
        product_id: 'ff11gg22hh33',
        value: 63.13,
      },
      {
        customer_id: 'jjones@tepidmail.com',
        orderdate: new Date('2020-12-26T08:55:46Z'),
        product_id: 'a1b2c3d4',
        value: 429.65,
      },
    ]);

    await products.insertMany([
      {
        id: 'a1b2c3d4',
        name: 'Asus Laptop',
        category: 'ELECTRONICS',
        description: 'Good value laptop for students',
      },
      {
        id: 'z9y8x7w6',
        name: 'The Day Of The Triffids',
        category: 'BOOKS',
        description: 'Classic post-apocalyptic novel',
      },
      {
        id: 'ff11gg22hh33',
        name: 'Morphy Richardds Food Mixer',
        category: 'KITCHENWARE',
        description: 'Luxury mixer turning good cakes into great',
      },
      {
        id: 'pqr678st',
        name: 'Karcher Hose Set',
        category: 'GARDEN',
        description: 'Hose + nosels + winder for tidy storage',
      },
    ]);
    // :snippet-end:
  } finally {
    await client.close();
  }
}
