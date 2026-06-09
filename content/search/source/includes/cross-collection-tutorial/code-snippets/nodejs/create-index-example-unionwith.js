const { MongoClient } = require("mongodb");

// Replace the connection string with your MongoDB deployment's connection string
const uri =  "<connection-string>";

const client = new MongoClient(uri);

async function run() {
  try {
    const database = client.db("sample_training");
    
    // Get collections
    const companiesCollection = database.collection("companies");
    const inspectionsCollection = database.collection("inspections");

    // Create the MongoDB Search index definition with dynamic mapping
    const index = {
        name: "default",
        definition: {
            "mappings": {
                "dynamic": true
            }
        }
    }

    // Create index on companies collection
    const companiesResult = await companiesCollection.createSearchIndex(index);
    console.log("New index name for companies: " + companiesResult);
    
    // Create index on inspections collection
    const inspectionsResult = await inspectionsCollection.createSearchIndex(index);
    console.log("New index name for inspections: " + inspectionsResult);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
