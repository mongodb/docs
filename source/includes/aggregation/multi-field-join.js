const { MongoClient } = require("mongodb");

const uri = "<connection string>";
const client = new MongoClient(uri);

async function run() {
  try {
    const aggDB = client.db("agg_tutorials_db");

    // start-colls
    const productsColl = await aggDB.collection("products");
    const ordersColl = await aggDB.collection("orders");
    // end-colls

    // start-insert-products
    await productsColl.deleteMany({});

    const productsData = [
      {
        name: "Asus Laptop",
        variation: "Ultra HD",
        category: "ELECTRONICS",
        description: "Great for watching movies",
      },
      {
        name: "Asus Laptop",
        variation: "Standard Display",
        category: "ELECTRONICS",
        description: "Good value laptop for students",
      },
      {
        name: "The Day Of The Triffids",
        variation: "1st Edition",
        category: "BOOKS",
        description: "Classic post-apocalyptic novel",
      },
      {
        name: "The Day Of The Triffids",
        variation: "2nd Edition",
        category: "BOOKS",
        description: "Classic post-apocalyptic novel",
      },
      {
        name: "Morphy Richards Food Mixer",
        variation: "Deluxe",
        category: "KITCHENWARE",
        description: "Luxury mixer turning good cakes into great",
      },
    ];

    await productsColl.insertMany(productsData);
    // end-insert-products

    // start-insert-orders
    await ordersColl.deleteMany({});

    const orderData = [
      {
        customer_id: "elise_smith@myemail.com",
        orderdate: new Date("2020-05-30T08:35:52Z"),
        product_name: "Asus Laptop",
        product_variation: "Standard Display",
        value: 431.43,
      },
      {
        customer_id: "tj@wheresmyemail.com",
        orderdate: new Date("2019-05-28T19:13:32Z"),
        product_name: "The Day Of The Triffids",
        product_variation: "2nd Edition",
        value: 5.01,
      },
      {
        customer_id: "oranieri@warmmail.com",
        orderdate: new Date("2020-01-01T08:25:37Z"),
        product_name: "Morphy Richards Food Mixer",
        product_variation: "Deluxe",
        value: 63.13,
      },
      {
        customer_id: "jjones@tepidmail.com",
        orderdate: new Date("2020-12-26T08:55:46Z"),
        product_name: "Asus Laptop",
        product_variation: "Standard Display",
        value: 429.65,
      },
    ];

    await ordersColl.insertMany(orderData);
    // end-insert-orders

    const pipeline = [];

    // start-embedded-pl-match1
    const embedded_pl = [];

    embedded_pl.push({
      $match: {
        $expr: {
          $and: [
            { $eq: ["$product_name", "$$prdname"] },
            { $eq: ["$product_variation", "$$prdvartn"] },
          ],
        },
      },
    });
    // end-embedded-pl-match1

    // start-embedded-pl-match2
    embedded_pl.push({
      $match: {
        orderdate: {
          $gte: new Date("2020-01-01T00:00:00Z"),
          $lt: new Date("2021-01-01T00:00:00Z"),
        },
      },
    });
    // end-embedded-pl-match2

    // start-embedded-pl-unset
    embedded_pl.push({
      $unset: ["_id", "product_name", "product_variation"],
    });
    // end-embedded-pl-unset

    // start-lookup
    pipeline.push({
      $lookup: {
        from: "orders",
        let: {
          prdname: "$name",
          prdvartn: "$variation",
        },
        pipeline: embedded_pl,
        as: "orders",
      },
    });
    // end-lookup

    // start-match
    pipeline.push({
      $match: {
        orders: { $ne: [] },
      },
    });
    // end-match

    // start-unset
    pipeline.push({
      $unset: ["_id", "description"],
    });
    // end-unset

    // start-run-agg
    const aggregationResult = await productsColl.aggregate(pipeline);
    // end-run-agg

    for await (const document of aggregationResult) {
      console.log(document);
    }
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
