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
            { $search: { 
                index: "multilingual-tutorial",
                compound: { 
                    must: [{ text: { path: "fullplot", query:  "coppia"} }], 
                    mustNot: [{ range: { path: "released", gt: new Date("2000-01-01T00:00:00.000Z"), lt: new Date("2009-01-01T00:00:00.000Z") } }], 
                    should: [{ text: { query: "Drama", path: "genres" }}]}}}, 
            { $project: {_id: 0, title: 1, fullplot: 1, released: 1, genres: 1, score: { $meta: "searchScore" }}}
        ];
        // run pipeline
        const result = await coll.aggregate(agg);

        // print results
        await result.forEach((doc) => console.log(doc));
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
