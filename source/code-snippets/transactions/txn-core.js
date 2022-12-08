const { MongoError, MongoClient } = require('mongodb');

// drop collections
async function cleanUp(client) {
  await Promise.all( ['customers', 'inventory', 'orders'].map(async c => {
    try {
      const coll = client.db('testdb').collection(c);
      await coll.drop();
    } catch(e) {}
  }));
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

// start placeOrder
async function placeOrder(client, cart, payment) {
  const transactionOptions = {
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' },
    readPreference: 'primary'
  };

  const session = client.startSession();
  try {
    session.startTransaction(transactionOptions);

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
      )
      if (checkInventory === null) {
        throw new Error('Insufficient quantity or SKU not found.');
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
    await session.commitTransaction();
    console.log('Transaction successfully committed.');

  } catch (error) {
    if (error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')) {
      // add your logic to retry or handle the error
    }
    else if (error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')) {
      // add your logic to retry or handle the error
    } else {
      console.log('An error occured in the transaction, performing a data rollback:' + error);
    }
    await session.abortTransaction();
  } finally {
    await session.endSession();
  }
}
// end placeOrder

async function run() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  await cleanUp(client);
  await setup(client);

  const cart = [
    { name: 'sunblock', sku: 5432, qty: 1, price: 5.19 },
    { name: 'beach towel', sku: 7865, qty: 2, price: 15.99 }
  ];
  const payment = { customer: 98765, total: 37.17 };

  try {
    await placeOrder(client, cart, payment);
  } finally {
    await cleanUp(client);
    await client.close();
  }
}
run().then(() => queryData());
