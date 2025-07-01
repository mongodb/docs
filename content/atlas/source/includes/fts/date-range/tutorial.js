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
                index: 'date-range-tutorial',
                compound: { 
                    must: [{  range: { path: "released", gt: new Date("2015-01-01T00:00:00.000Z"), lt: new Date("2015-12-31T00:00:00.000Z") }}], 
                    should: [{ near: { path: "released", origin: new Date("2015-07-01T00:00:00.000Z"), pivot: 2629800000 }}]}}},
            { $project: {_id: 0, title: 1, released: 1, genres: 1, score: { $meta: "searchScore" }}}, 
            { $limit: 6 }
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
