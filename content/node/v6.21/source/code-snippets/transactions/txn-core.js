/* Performs multiple write operations in a transaction */

const { MongoError, MongoClient } = require('mongodb');

/* Drop the "customers", "inventory", and "orders" collections from the
"testdb" database */
async function cleanUp(client) {
  await Promise.all( ['customers', 'inventory', 'orders'].map(async c => {
    try {
      const coll = client.db('testdb').collection(c);
      await coll.drop();
    } catch(e) {} // Ignore any exceptions
  }));
}

async function setup(client) {
  try {
    const customerColl = client.db('testdb').collection('customers');
    const inventoryColl = client.db('testdb').collection('inventory');

    // Insert order data for customer "98765" in the customers collection
    await customerColl.insertOne({ _id: 98765, orders: [] });

    // Insert inventory data for "sunblock" and "beach towel"
    await inventoryColl.insertMany([
      { item: 'sunblock', item_id: 5432, qty: 85 },
      { item: 'beach towel', item_id: 7865, qty: 41 },
    ]);
  } catch (e) {
    // Print the exception if one was thrown
    console.log('Unable to insert test data: ' + e);
  }
}

// Print all documents in the "customers", "inventory", and "orders" collections
async function queryData() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);
  try {
    await Promise.all(['customers', 'inventory', 'orders'].map(async c => {
      const coll = client.db('testdb').collection(c);
      console.log(JSON.stringify(await coll.find().toArray()));
    }, client));

  } finally {
    // Close your connection
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

  // Start the session
  const session = client.startSession();
  try {
    // Start the transaction in the session, specifying the transaction options
    session.startTransaction(transactionOptions);

    const ordersCollection = client.db('testdb').collection('orders');
    /* Within the session, insert an order that contains information about the
    customer, items purchased, and the total payment */
    const orderResult = await ordersCollection.insertOne(
      {
        customer: payment.customer,
        items: cart,
        total: payment.total,
      },
      { session }
    );

    const inventoryCollection = client.db('testdb').collection('inventory');
    
    for (const item of order) {  
      /* Update the inventory for the purchased items. End the
      transaction if the quantity of an item in the inventory is
      insufficient to complete the purchase. */
      const inStock = await inventoryCollection.findOneAndUpdate(
        {
          item_id: item.item_id,
          item_id: { $gte: item.qty }
        },
        { $inc: { 'qty': -item.qty }},
        { session }
      )
      if (inStock === null) {
        throw new Error('Insufficient quantity or item ID not found.');
      }
    }

    const customerCollection = client.db('testdb').collection('customers');

    // Within the session, add the order details to the "orders" array of the customer document
    await customerCollection.updateOne(
      { _id: payment.customer },
      { $push:  { orders: orderResult.insertedId }},
      { session }
    );

    // Commit the transaction to apply all updates performed within it
    await session.commitTransaction();
    console.log('Transaction successfully committed.');

  } catch (error) {
    /*
      Handle any exceptions thrown during the transaction and end the
      transaction. Roll back all the updates performed in the transaction.
    */
    if (error instanceof MongoError && error.hasErrorLabel('UnknownTransactionCommitResult')) {
      // Add your logic to retry or handle the error
    }
    else if (error instanceof MongoError && error.hasErrorLabel('TransientTransactionError')) {
      // Add your logic to retry or handle the error
    } else {
      console.log('An error occured in the transaction, performing a data rollback:' + error);
    }
    await session.abortTransaction();
  } finally {
    // End the session
    await session.endSession();
  }
}
// end placeOrder


// Run the full transaction example
async function run() {
  const uri = process.env.MONGODB_URI;
  const client = new MongoClient(uri);

  // Call a method that removes data from prior runs of this example
  await cleanUp(client);

  // Call a method that creates sample inventory data for this example
  await setup(client);

  // Create sample data for a customer's shopping cart
  const cart = [
    { item: 'sunblock', item_id: 5432, qty: 1, price: 5.19 },
    { item: 'beach towel', item_id: 7865, qty: 2, price: 15.99 }
  ];

  /* Create sample data for a customer's payment based on the contents
  of their cart */
  const payment = { customer: 98765, total: 37.17 };

  try {
    // Call the method that updates the customer and inventory in a transaction
    await placeOrder(client, cart, payment);
  } finally {
    // Call a method that removes data from prior runs of this example
    await cleanUp(client);

    // Close your connection
    await client.close();
  }
}
run().then(() => queryData());
