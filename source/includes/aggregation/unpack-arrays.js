const { MongoClient } = require("mongodb");

const uri = "<connection string>";
const client = new MongoClient(uri);

async function run() {
  try {
    const aggDB = client.db("agg_tutorials_db");

    // start-coll
    const ordersColl = await aggDB.collection("orders");
    // end-coll

    // start-insert-orders
    await ordersColl.deleteMany({});

    const orderData = [
      {
        order_id: 6363763262239,
        products: [
          {
            prod_id: "abc12345",
            name: "Asus Laptop",
            price: 431,
          },
          {
            prod_id: "def45678",
            name: "Karcher Hose Set",
            price: 22,
          },
        ],
      },
      {
        order_id: 1197372932325,
        products: [
          {
            prod_id: "abc12345",
            name: "Asus Laptop",
            price: 429,
          },
        ],
      },
      {
        order_id: 9812343774839,
        products: [
          {
            prod_id: "pqr88223",
            name: "Morphy Richards Food Mixer",
            price: 431,
          },
          {
            prod_id: "def45678",
            name: "Karcher Hose Set",
            price: 21,
          },
        ],
      },
      {
        order_id: 4433997244387,
        products: [
          {
            prod_id: "def45678",
            name: "Karcher Hose Set",
            price: 23,
          },
          {
            prod_id: "jkl77336",
            name: "Picky Pencil Sharpener",
            price: 1,
          },
          {
            prod_id: "xyz11228",
            name: "Russell Hobbs Chrome Kettle",
            price: 16,
          },
        ],
      },
    ];

    await ordersColl.insertMany(orderData);
    // end-insert-orders

    const pipeline = [];

    // start-unwind
    pipeline.push({
      $unwind: {
        path: "$products",
      },
    });
    // end-unwind

    // start-match
    pipeline.push({
      $match: {
        "products.price": {
          $gt: 15,
        },
      },
    });
    // end-match

    // start-group
    pipeline.push({
      $group: {
        _id: "$products.prod_id",
        product: { $first: "$products.name" },
        total_value: { $sum: "$products.price" },
        quantity: { $sum: 1 },
      },
    });
    // end-group

    // start-set
    pipeline.push({
      $set: {
        product_id: "$_id",
      },
    });
    // end-set

    // start-unset
    pipeline.push({ $unset: ["_id"] });
    // end-unset

    // start-run-agg
    const aggregationResult = await ordersColl.aggregate(pipeline);
    // end-run-agg

    for await (const document of aggregationResult) {
      console.log(document);
    }
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
