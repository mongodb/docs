const { MongoClient } = require("mongodb");

// connect to your Atlas cluster
const uri =
    "<connection-string>";
    
const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        // set namespace
        const database = client.db("sample_mflix");
        const coll = database.collection("movies");

        // define pipeline
        const agg = [
            {$search: {autocomplete: {query: "ger", path: "title"}, highlight:{path: "title"}}},
            {$limit: 5},
            {$project: {score: {$meta: "searchScore"}, _id: 0,title: 1, highlights: {$meta: "searchHighlights"}}}
        ];
        // run pipeline
        const result = coll.aggregate(agg);

        // print results
        result.forEach((doc) => console.dir(JSON.stringify(doc)));
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
