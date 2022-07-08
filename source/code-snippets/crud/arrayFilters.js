const { MongoClient } = require("mongodb");
const stream = require("stream");

// Replace the following string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";
const client = new MongoClient(uri);


async function loadData() {
  try {
    const database = client.db("test");
    const pizza = database.collection("pizza");

    await pizza.drop();

    await pizza.insertMany([
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
    ]);

    console.log(JSON.stringify(await (await pizza.find()).toArray()));
  } finally {
    await client.close();
  }
}


async function runAllArrayElements() {

  try {
    const database = client.db("test");
    const pizza = database.collection("pizza");

    console.log(JSON.stringify(await (await pizza.find()).toArray()));

    // start allArrayElement example
    const query = { "name": "Popeye" };
    const updateDocument = {
      $push: { "items.$[].toppings": "fresh mozzarella" }
    };
    const result = await pizza.updateOne(query, updateDocument);
    // end allArrayElement example
    console.log(result.modifiedCount);
    console.log(JSON.stringify(await (await pizza.find()).toArray()));
  } finally {
    await client.close();
  }
}
async function runFirstArrayElement() {

  try {
    const database = client.db("test");
    const pizza = database.collection("pizza");

    console.log(JSON.stringify(await (await pizza.find()).toArray()));

    // start firstArrayElement example
    const query = { name: "Steve Lobsters", "items.type": "pizza" };
    const updateDocument = {
      $set: { "items.$.size": "extra large" }
    };
    const result = await pizza.updateOne(query, updateDocument);
    // end firstArrayElement example
    console.log(result.modifiedCount);
    console.log(JSON.stringify(await (await pizza.find()).toArray()));
  } finally {
    await client.close();
  }
}


async function arrayFiltersOne() {
  try {
    const database = client.db("test");
    const pizza = database.collection("pizza");

    console.log(JSON.stringify(await (await pizza.find()).toArray()));

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

    const result = await pizza.updateMany(query, updateDocument, options);
    // end arrayFiltersOne example

    console.log(result.modifiedCount);
    console.log(JSON.stringify(await (await pizza.find()).toArray()));
  } finally {
    await client.close();
  }
}

async function arrayFiltersTwo() {
  try {
    const database = client.db("test");
    const pizza = database.collection("pizza");

    console.log(JSON.stringify(await (await pizza.find()).toArray()));

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
    const result = await pizza.updateOne(query, updateDocument, options);
    // end arrayFiltersTwo example
    console.log(result.modifiedCount);

    pizza.insertOne({
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

    console.log(JSON.stringify(await (await pizza.find()).toArray()));
  } finally {
    await client.close();
  }
}
//run().catch(console.dir);
