const { MongoClient } = require("mongodb");

// connect to your Atlas cluster
const uri = "<connection-string>";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        // set namespace
        const database = client.db("sample_mflix");
        const coll = database.collection("movies");

        // define pipeline
        const agg = [
            {$search: 
              {
                index: "partial-match-tutorial-autocomplete", 
                autocomplete: 
                  {
                    query: "Great", 
                    path: "title"
                  }
                }
            },
            {$limit: 10},
            {$project: {_id: 0,title: 1}}
        ];
        // run pipeline
        const result = await coll.aggregate(agg);
        console.log(result)

        // print results
        await result.forEach((doc) => console.log(doc));
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
