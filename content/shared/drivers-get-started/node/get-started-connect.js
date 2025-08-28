const { MongoClient } = require("mongodb");

// Replace the uri string with your connection string
const uri = "<connection string URI>";

const client = new MongoClient(uri);

async function run() {
    try {
        const database = client.db('sample_mflix');
        const movies = database.collection('movies');

        // Queries for a movie that has a title value of 'Back to the Future'
        const query = { title: 'Back to the Future' };
        const movie = await movies.findOne(query);

        console.log(movie);
    } finally {
        await client.close();
    }
}
run().catch(console.dir);