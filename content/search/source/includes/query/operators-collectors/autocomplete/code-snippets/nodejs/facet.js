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
        const agg = [{$searchMeta: {facet: {
                operator: {
                  autocomplete: {path: "title", query: "Gravity"}
                },
                facets: {
                  titleFacet: {type: "string", path: "title"}
                }}}}];
        // run pipeline
        const result = coll.aggregate(agg);

        // print results
        await result.forEach((doc) => console.dir(JSON.stringify(doc)));
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
