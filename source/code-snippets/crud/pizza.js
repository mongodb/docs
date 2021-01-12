const { MongoClient } = require("mongodb");

// Replace the following string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";
const client = new MongoClient(uri);

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  try {
    await client.connect();

    const database = client.db("test");
    const orders = database.collection("orders");

    // start find crud example
    const findResult = await orders.find({
      name: "Lemony Snicket",
      date: {
        $gte: new Date(new Date().setHours(00, 00, 00)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
    });
    // end find crud example
    console.log(await findResult.toArray());

    // start aggregate crud example
    const aggregateResult = await orders.aggregate([
      {
        $match: {
          date: {
            $gte: new Date(new Date().getTime() - 1000 * 3600 * 24 * 7),
            $lt: new Date(),
          },
        },
      },
      {
        $group: {
          _id: "$status",
          count: {
            $sum: 1,
          },
        },
      },
    ]);
    // end aggregate crud example
    console.log(await aggregateResult.toArray());

    // start watch crud example
    const changeStream = orders.watch([
      { $match: { operationType: "insert" } },
      {
        $project: {
          "fullDocument.name": 1,
          "fullDocument.address": 1,
        },
      },
    ]);
    changeStream.on("change", change => {
      const { name, address } = change.fullDocument;
      console.log(`New order for ${name} at ${address}.`);
    });
    // end watch crud example

    // force change stream to instantiate so it can see the insert
    await sleep(1);

    // start insert crud example
    const insertResult = await orders.insertOne({
      date: new Date(Date.now()),
      address: "667 Dark Avenue, San Francisco, CA, 94110",
      name: "Lemony Snicket",
      items: [
        {
          name: "pizza",
          toppings: ["pepperoni", "mushrooms"],
          notes: "extra shrooms",
          price: 11,
        },
        {
          name: "wings",
          sauce: "buffalo",
          notes: "extra crispy",
          price: 10,
        },
      ],
      status: "created",
    });
    // end insert crud example
    console.log(insertResult.insertedCount); // should be 1

    // start update crud example
    const updateResult = await orders.updateOne(
      {
        address: "667 Dark Avenue, San Francisco, CA, 94110",
        date: {
          $gte: new Date(new Date().setHours(00, 00, 00)),
          $lt: new Date(new Date().setHours(23, 59, 59)),
        },
      },
      { $set: { address: "667 Dark Avenue, San Francisco, CA, 94103" } },
    );
    // end update crud example
    console.log(updateResult.modifiedCount); // should be 1

    // start delete crud example
    const deleteResult = await orders.deleteOne({
      address: "13 Lousy Lane",
      name: "Violet Baudelaire",
      date: {
        $gte: new Date(new Date().setHours(00, 00, 00)),
        $lt: new Date(new Date().setHours(23, 59, 59)),
      },
    });
    // end delete crud example
    console.log(deleteResult.deletedCount); // should be 0

    await changeStream.close();
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
