const { MongoClient } = require("mongodb");

// Replace the following string with your MongoDB deployment's connection string.
const uri =
  "mongodb+srv://<user>:<password>@<cluster-url>?writeConcern=majority";
const client = new MongoClient(uri);

async function printData() {
  try {
    
    // Get the database and collection on which to run the operation
    const myDB = client.db("test");
    const myColl = myDB.collection("testColl");

    // Print all documents 
    console.log(JSON.stringify(await myColl.find().toArray()));
  } finally {
    await client.close();
  }
}

async function runFirstArrayElement() {
  try {
    
    // Get the database and collection on which to run the operation
    const myDB = client.db("test");
    const myColl = myDB.collection("testColl");

    // Print the result
    console.log(JSON.stringify(await myColl.find().toArray()));

    // start firstArrayElement example
    // Query for all elements in entries array where the value of x is a string
    const query = { "entries.x": { $type : "string" } };

    // On first matched element, increase value of y by 33
    const updateDocument = {
      $inc: { "entries.$.y": 33 }
    };

    // Execute the update operation
    const result = await myColl.updateOne(query, updateDocument);
    // end firstArrayElement example

    // Print all documents
    console.log(result.modifiedCount);
    console.log(JSON.stringify(await myColl.find().toArray()));
  } finally {
    await client.close();
  }
}

async function runAllArrayElements() {
  try {
    
    // Get the database and collection on which to run the operation
    const myDB = client.db("test");
    const myColl = myDB.collection("testColl");

    // Print all documents 
    console.log(JSON.stringify(await myColl.find().toArray()));

    // start allArrayElement example
    // Query for all documents where date is the string "5/15/2023"
    const query = { date: "5/15/2023" };

    // For each matched document, remove duration field from all entries in calls array 
    const updateDocument = {
      $unset: { "calls.$[].duration": "" }
    };

    // Execute the update operation
    const result = await myColl.updateOne(query, updateDocument);
    // end allArrayElement example
    
    console.log(result.modifiedCount);
    
    // Print all documents 
    console.log(JSON.stringify(await myColl.find().toArray()));
  } finally {
    await client.close();
  }
}

async function arrayFiltersIdentifier() {
  try {
    
    // Get the database and collection on which to run the operation
    const myDB = client.db("test");
    const myColl = myDB.collection("testColl");

    // Print all documents 
    console.log(JSON.stringify(await myColl.find().toArray()));

    // start arrayFiltersIdentifier example
    // Query for all documents where date is the string "11/12/2023"
    const query = { date: "11/12/2023" };
    
    // For each matched document, change the quantity of items to 2 
    const updateDocument = {
      $mul: { "items.$[i].quantity": 2 }
    };

    // Update only non-oil items used for fried rice 
    const options = {
      arrayFilters: [
        {
          "i.recipe": "Fried rice",
          "i.item": { $not: { $regex: "oil" } },
        }
      ]
    };

    // Execute the update operation
    const result = await myColl.updateOne(query, updateDocument, options);
    // end arrayFiltersIdentifier example
    console.log(result.modifiedCount);

    // Print all documents 
    console.log(JSON.stringify(await myColl.find().toArray()));
  } finally {
    await client.close();
  }
}
//run().catch(console.dir);
