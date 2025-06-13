const { MongoClient } = require("mongodb");

// connect to your Atlas cluster
const uri = "<CONNECTION-STRING>";

const client = new MongoClient(uri);

async function run() {
    try {
        await client.connect();

        // set namespace
        const database = client.db("<DATABASE-NAME>");
        const coll = database.collection("<COLLECTION-NAME>");

        // define pipeline
        const agg = [
            {
              '$vectorSearch': {
                'index': '<INDEX-NAME>',
                'path': '<FIELD-NAME>',
                'query': "<QUERY-TEXT>",
                'numCandidates': <NUMBER-OF-CANDIDATES-TO-CONSIDER>,
                'limit': <NUMBER-OF-DOCUMENTS-TO-RETURN>
              }
            }
          ];
        // run pipeline
        const result = coll.aggregate(agg);

        // print results
        await result.forEach((doc) => console.dir(JSON.stringify(doc)));
    } finally {
        await client.close();
    }
}
run().catch(console.dir);
