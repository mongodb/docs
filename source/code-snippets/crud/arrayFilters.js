const { MongoClient } = require("mongodb");

// Replace the following string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";
const client = new MongoClient(uri);

async function printData() {
  try {
    const myDB = client.db("test");
    const myColl = myDB.collection("testColl");

    console.log(JSON.stringify(await myColl.find().toArray()));
  } finally {
    await client.close();
  }
}

async function runFirstArrayElement() {
  try {
    const myDB = client.db("test");
    const myColl = myDB.collection("testColl");

    console.log(JSON.stringify(await myColl.find().toArray()));

    // start firstArrayElement example
    const query = { "entries.x": { $type : "string" } };
    const updateDocument = {
      $inc: { "entries.$.y": 33 }
    };
    const result = await myColl.updateOne(query, updateDocument);
    // end firstArrayElement example
    console.log(result.modifiedCount);
    console.log(JSON.stringify(await myColl.find().toArray()));
  } finally {
    await client.close();
  }
}

async function runAllArrayElements() {
  try {
    const myDB = client.db("test");
    const myColl = myDB.collection("testColl");

    console.log(JSON.stringify(await myColl.find().toArray()));

    // start allArrayElement example
    const query = { date: "5/15/2023" };
    const updateDocument = {
      $unset: { "calls.$[].duration": "" }
    };
    const result = await myColl.updateOne(query, updateDocument);
    // end allArrayElement example
    console.log(result.modifiedCount);
    console.log(JSON.stringify(await myColl.find().toArray()));
  } finally {
    await client.close();
  }
}

async function arrayFiltersIdentifier() {
  try {
    const myDB = client.db("test");
    const myColl = myDB.collection("testColl");

    console.log(JSON.stringify(await myColl.find().toArray()));

    // start arrayFiltersIdentifier example
    const query = { date: "11/12/2023" };
    const updateDocument = {
      $mul: { "items.$[i].quantity": 2 }
    };
    const options = {
      arrayFilters: [
        {
          "i.recipe": "Fried rice",
          "i.item": { $not: { $regex: "oil" } },
        }
      ]
    };
    const result = await myColl.updateOne(query, updateDocument, options);
    // end arrayFiltersIdentifier example
    console.log(result.modifiedCount);

    console.log(JSON.stringify(await myColl.find().toArray()));
  } finally {
    await client.close();
  }
}
//run().catch(console.dir);
