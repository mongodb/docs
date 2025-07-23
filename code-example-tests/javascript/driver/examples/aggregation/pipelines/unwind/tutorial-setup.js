import { MongoClient } from 'mongodb';

const uri = process.env.CONNECTION_STRING;
const client = new MongoClient(uri);

export async function loadUnwindSampleData() {
  try {
    const aggDB = client.db('agg_tutorials_db');
    // :snippet-start: load-sample-data
    const orders = aggDB.collection('orders');

    await orders.insertMany([
      {
        order_id: 6363763262239,
        products: [
          {
            prod_id: 'abc12345',
            name: 'Asus Laptop',
            price: 431,
          },
          {
            prod_id: 'def45678',
            name: 'Karcher Hose Set',
            price: 22,
          },
        ],
      },
      {
        order_id: 1197372932325,
        products: [
          {
            prod_id: 'abc12345',
            name: 'Asus Laptop',
            price: 429,
          },
        ],
      },
      {
        order_id: 9812343774839,
        products: [
          {
            prod_id: 'pqr88223',
            name: 'Morphy Richards Food Mixer',
            price: 431,
          },
          {
            prod_id: 'def45678',
            name: 'Karcher Hose Set',
            price: 21,
          },
        ],
      },
      {
        order_id: 4433997244387,
        products: [
          {
            prod_id: 'def45678',
            name: 'Karcher Hose Set',
            price: 23,
          },
          {
            prod_id: 'jkl77336',
            name: 'Picky Pencil Sharpener',
            price: 1,
          },
          {
            prod_id: 'xyz11228',
            name: 'Russell Hobbs Chrome Kettle',
            price: 16,
          },
        ],
      },
    ]);
    // :snippet-end:
  } finally {
    await client.close();
  }
}
