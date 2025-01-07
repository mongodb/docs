const { MongoClient, ObjectId } = require('mongodb');

const uri = '<connection string>'; // Add your MongoDB connection string here

(async () => {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        await client.connect();
        
        const database = client.db('sample_mflix');
        const movies = database.collection('movies');

        // Clean up collection
        await movies.deleteMany({});

        // begin-sample-data
        // const movies = database.collection('movies');
        
        const docs = [
        { title: "Inception", year: 2010, rated: "PG-13", released: "2010-07-16" },
        { title: "Interstellar", year: 2014, rated: "PG-13", released: "2014-11-07" },
        { title: "The Dark Knight", year: 2008, rated: "PG-13", released: "2008-07-18" },
        { title: "Tenet", year: 2020, rated: "PG-13", released: "2020-09-03"}
        ];
        // end-sample-data

        // begin-insert
        const bulkOps = [
        { insertOne: { document: { title: "Inception", year: 2010, rated: "PG-13", released: "2010-07-16" } } },
        { insertOne: { document: { title: "Interstellar", year: 2014, rated: "PG-13", released: "2014-11-07" } } },
        { insertOne: { document: { title: "The Dark Knight", year: 2008, rated: "PG-13", released: "2008-07-18" } } },
        { insertOne: { document: { title: "Tenet", year: 2020, rated: "PG-13", released: "2020-09-03" } } }
          ];

        await movies.bulkWrite(bulkOps);
        // end-insert

        await movies.insertMany(docs);

        // Inserting additional movies
        const additionalMovies = [
        { title: "Dunkirk", year: 2017, rated: "PG-13", released: "2017-07-21" },
        { title: "Memento", year: 2000, rated: "R", released: "2000-09-05" }
        ];
        await movies.insertMany(additionalMovies);


        // begin-replace
        const replaceOperations = [
            {
                replaceOne: {
                    filter: { title: "The Dark Knight" },
                    replacement: { title: "The Dark Knight Rises", year: 2012, rating: "PG-13" },
                    upsert: false
                }
            },
            {
                replaceOne: {
                    filter: { title: "Inception" },
                    replacement: { title: "Inception Reloaded", year: 2010, rating: "PG-13" },
                    upsert: false
                }
            }
        ];

        const replace_result = await movies.bulkWrite(replaceOperations);
        // end-replace


        // begin-update
        const updateOperations = [
            {
                updateOne: {
                    filter: { title: "Interstellar" },
                    update: { $set: { title: "Interstellar Updated", genre: "Sci-Fi Adventure" } },
                    upsert: true
                }
            },
            {
                updateMany: {
                    filter: { rated: "PG-13" },
                    update: { $set: { rated: "PG-13 Updated", genre: "Updated Genre" } }
                }
            }
        ];
        
        const update_result = await movies.bulkWrite(updateOperations);
        
        console.log(`Matched documents: ${result3.matchedCount}`);
        console.log(`Modified documents: ${result3.modifiedCount}`);
        // end-update


        // begin-delete
        const deleteOperations = [
            {
                deleteOne: {
                    filter: { title: "Dunkirk" }
                }
            },
            {
                deleteMany: {
                    filter: { rated: "R" }
                }
            }
        ];
        
        
        const delete_result = await movies.bulkWrite(deleteOperations);
        
        console.log(`Deleted documents: ${result4.deletedCount}`);
        // end-delete


        console.log("Operations completed successfully.");
    } finally {
        await client.close();
    }
})();