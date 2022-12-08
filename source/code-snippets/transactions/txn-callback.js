const { MongoClient } = require('mongodb');

async function cleanUp(client) {
  try {
    const customersColl = client.db('testdb').collection('customers');
    await customersColl.drop();
  } catch(e) {}
  try {
    const inventoryColl = client.db('testdb').collection('inventory');
    await inventoryColl.drop();
  } catch(e) {}
  try {
    const ordersCollection = client.db('testdb').collection('orders')
    await ordersCollection.drop();
  } catch(e) {}
}

async function setup(client) {
  try {
    const customerColl = client.db('testdb').collection('customers');
    const inventoryColl = client.db('testdb').collection('inventory');

    await customerColl.insertOne({ _id: 98765, orders: [] });

    await inventoryColl.insertMany([
      { name: 'sunblock', sku: 5432, qty: 85 },
      { name: 'beach towel', sku: 7865, qty: 41 },
    ]);
  } catch (e) {
    console.log('Unable to insert test data: ' + e);
  }
}

async function queryData() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    await Promise.all(['customers', 'inventory', 'orders'].map(async c => {
      const coll = client.db('testdb').collection(c);
      console.log(JSON.stringify(await coll.find().toArray()));
    }, client));
  } finally {
    client.close();
  }
}

// start callback
async function placeOrder(client, session, cart, payment) {
  const ordersCollection = client.db('testdb').collection('orders');
  const orderResult = await ordersCollection.insertOne(
    {
      customer: payment.customer,
      items: cart,
      total: payment.total,
    },
    { session }
  );

  const inventoryCollection = client.db('testdb').collection('inventory');
  for (let i=0; i<cart.length; i++) {
    const item = cart[i];

    // Cancel the transaction when you have insufficient inventory
    const checkInventory = await inventoryCollection.findOne(
      {
        sku: item.sku,
        qty: { $gte: item.qty }
      },
      { session }
    );

    if (checkInventory === null) {
      await session.abortTransaction();
      console.error('Insufficient quantity or SKU not found.');
    }

    await inventoryCollection.updateOne(
      { sku: item.sku },
      { $inc: { 'qty': -item.qty }},
      { session }
    );
  }

  const customerCollection = client.db('testdb').collection('customers');
  await customerCollection.updateOne(
    { _id: payment.customer },
    { $push:  { orders: orderResult.insertedId }},
    { session }
  );
}
// end callback

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function run() {
  /* Test code: uncomment block to run
  await cleanUp(client);
  await setup(client);

  const cart = [
    { name: 'sunblock', sku: 5432, qty: 1, price: 5.19 },
    { name: 'beach towel', sku: 7865, qty: 2, price: 15.99 }
  ];
  const payment = { customer: 98765, total: 37.17 };

  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' },
    maxCommitTimeMS: 1000
  };

  const session = client.startSession();
  try {
    await session.withTransaction(async () => {
      await placeOrder(client, session, cart, payment)
    }, transactionOptions);
  } catch(error) {
    console.log('Encountered an error during the transaction: ' + error);
  } finally {
    await session.endSession();
  }
  await client.close();
  */

  // start session
  const transactionOptions = {
    readPreference: 'primary',
    readConcern: { level: 'local' },
    writeConcern: { w: 'majority' },
    maxCommitTimeMS: 1000
  };

  const session = client.startSession();
  try {
    await session.withTransaction(
      async (session) => { /* your transaction here */ },
      transactionOptions);
  } catch(error) {
    console.log('Encountered an error during the transaction: ' + error);
  } finally {
    await session.endSession();
  }
  // end session
}
run().then(() => queryData());
