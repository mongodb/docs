// ignored first line
const { MongoClient } = require("mongodb");
const stream = require("stream");

// Replace the following string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?w=majority";
const client = new MongoClient(uri);


async function loadData() {
  try {
    await client.connect();

    const database = client.db("test");
    const collection = database.collection("pizza");

    await collection.drop();

    await collection.insertMany([
      {
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
      },
      {
        name: "Popeye",
        address:"1 Sweetwater",
        items: [
          {
            type: "pizza",
            size: "large",
            toppings: ["garlic", "spinach"]
          },
          {
            type: "calzone",
            toppings: ["ham"],
          },
        ]
      }
    );

    console.log(JSON.stringify(await (await collection.find()).toArray()));
  } finally {
    await client.close();
  }
}


async function runAllArrayElements() {

  try {
    await client.connect();

    const database = client.db("test");
    const collection = database.collection("pizza");

    console.log(JSON.stringify(await (await collection.find()).toArray()));

    // start allArrayElement example
    const query = { "name": "Popeye" };
    const updateDocument = {
      $push: { "items.$[].toppings": "fresh mozzarella" }
    };
    const result = await collection.updateOne(query, updateDocument);
    // end allArrayElement example
    console.log(result.modifiedCount);
    console.log(JSON.stringify(await (await collection.find()).toArray()));
  } finally {
    await client.close();
  }
}
async function runFirstArrayElement() {

  try {
    await client.connect();

    const database = client.db("test");
    const collection = database.collection("pizza");

    console.log(JSON.stringify(await (await collection.find()).toArray()));

    // start firstArrayElement example
    const query = { name: "Steve Lobsters", "items.type": "pizza" };
    const updateDocument = {
      $set: { "items.$.size": "extra large" }
    };
    const result = await collection.updateOne(query, updateDocument);
    // end firstArrayElement example
    console.log(result.modifiedCount);
    console.log(JSON.stringify(await (await collection.find()).toArray()));
  } finally {
    await client.close();
  }
}


async function arrayFiltersOne() {
  try {
    await client.connect();

    const database = client.db("test");
    const collection = database.collection("pizza");

    console.log(JSON.stringify(await (await collection.find()).toArray()));

    // start arrayFiltersOne example
    const query = { name: "Steve Lobsters" };
    const updateDocument = {
      $push: { "items.$[orderItem].toppings": "garlic" }
    };
    const options = {
      arrayFilters: [{
        "orderItem.type": "pizza",
        "orderItem.size": "large",
      }]
    };

    const result = await collection.updateMany(query, updateDocument, options);
    // end arrayFiltersOne example

    console.log(result.modifiedCount);
    console.log(JSON.stringify(await (await collection.find()).toArray()));
  } finally {
    await client.close();
  }
}

async function arrayFiltersTwo() {
  try {
    await client.connect();

    const database = client.db("test");
    const collection = database.collection("pizza");

    console.log(JSON.stringify(await (await collection.find()).toArray()));

    // start arrayFiltersTwo example
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
    // end arrayFiltersTwo example
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
//run().catch(console.dir);
