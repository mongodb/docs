// Perform an aggregation

const { MongoClient } = require("mongodb");

const uri = process.env.MONGDODB_URI;
const client = new MongoClient(uri);

async function run() {
    // begin data insertion
    const db = client.db("aggregation");
    const coll = db.collection("restaurants");

    // Create sample documents
    const docs = [
        { stars: 3, categories: ["Bakery", "Sandwiches"], name: "Rising Sun Bakery" },
        { stars: 4, categories: ["Bakery", "Cafe", "Bar"], name: "Cafe au Late" },
        { stars: 5, categories: ["Coffee", "Bakery"], name: "Liz's Coffee Bar" },
        { stars: 3, categories: ["Steak", "Seafood"], name: "Oak Steakhouse" },
        { stars: 4, categories: ["Bakery", "Dessert"], name: "Petit Cookie" },
    ];

    // Insert documents into the restaurants collection
    const result = await coll.insertMany(docs);
    // end data insertion

    // begin aggregation
    // Define an aggregation pipeline with a match stage and a group stage
    const pipeline = [
        { $match: { categories: "Bakery" } },
        { $group: { _id: "$stars", count: { $sum: 1 } } }
    ];

    // Execute the aggregation
    const aggCursor = coll.aggregate(pipeline);
    
    // Print the aggregated results
    for await (const doc of aggCursor) {
        console.log(doc);
    }
    // end aggregation
}
// Run the program and print thrown errors, then close the connection
run().catch(console.dir).finally(() => client.close());
