// ignored first line
const { MongoClient } = require("mongodb");
const stream = require("stream");

// Replace the following string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&w=majority&useUnifiedTopology=true";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();

    const database = client.db("test");
    const collection = database.collection("pizza");

    console.log(JSON.stringify(await (await collection.find()).toArray()));

    // start arrayFilters example
    const query = { name: "Steve Lobsters" };
    const updateDocument = {
      $push: { "items.$[item].toppings": "salami" },
    };
    const options = {
      arrayFilters: [
        {
          "item.type": "pizza",
          "item.toppings": "pepperoni",
        },
      ],
    };
    const result = await collection.updateOne(query, updateDocument, options);
    // end arrayFilters example
    console.log(result.modifiedCount);

    collection.insertOne({
      name: "Steve Lobsters",
      address: "731 Yexington Avenue",
      items: [
        {
          type: "pizza",
          size: "large",
          toppings: ["pepperoni"],
        },
        {
          type: "pizza",
          size: "medium",
          toppings: ["mushrooms", "sausage", "green peppers"],
          comment: "Extra green peppers please!",
        },
        {
          type: "pizza",
          size: "large",
          toppings: ["pineapple, ham"],
          comment: "red pepper flakes on top",
        },
        {
          type: "calzone",
          fillings: ["canadian bacon", "sausage", "onion"],
        },
        {
          type: "beverage",
          name: "Diet Pepsi",
          size: "16oz",
        },
      ],
    });

    console.log(JSON.stringify(await (await collection.find()).toArray()));
  } finally {
    await client.close();
  }
}
run().catch(console.dir);
