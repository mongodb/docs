const {
    MongoClient,
    ObjectId
} = require('mongodb');

const uri = '<connection string>'; // Add your MongoDB connection string here

(async () => {
    const client = new MongoClient(uri);

    try {
        await client.connect();

        const database = client.db('sample_mflix');
        const movies = database.collection('movies');

        // begin-insert-coll
        const insertModels = [{
            insertOne: {
                document: {
                    title: "The Favourite",
                    year: 2018,
                    rated: "R",
                    released: "2018-12-21"
                }
            }
        }, {
            insertOne: {
                document: {
                    title: "I, Tonya",
                    year: 2017,
                    rated: "R",
                    released: "2017-12-08"
                }
            }
        }];

        const insertResult = await movies.bulkWrite(insertModels);
        console.log(`Inserted documents: ${insertResult.insertedCount}`);
        // end-insert-coll

        // begin-insert-client
        const clientInserts = [{
            namespace: "sample_mflix.movies",
            name: "insertOne",
            document: {
                title: "The Favourite",
                year: 2018,
                rated: "R",
                released: "2018-12-21"
            }
        }, {
            namespace: "sample_mflix.movies",
            name: "insertOne",
            document: {
                title: "I, Tonya",
                year: 2017,
                rated: "R",
                released: "2017-12-08"
            }
        }, {
            namespace: "sample_mflix.users",
            name: "insertOne",
            document: {
                name: "Brian Schwartz",
                email: "bschwartz@example.com"
            }
        }];

        const clientInsertRes = await client.bulkWrite(clientInserts);
        console.log(`Inserted documents: ${clientInsertRes.insertedCount}`);
        // end-insert-client

        await movies.insertMany(docs);

        // begin-replace-coll
        const replaceOperations = [{
            replaceOne: {
                filter: {
                    title: "The Dark Knight"
                },
                replacement: {
                    title: "The Dark Knight Rises",
                    year: 2012,
                    rating: "PG-13"
                },
                upsert: false
            }
        }, {
            replaceOne: {
                filter: {
                    title: "Inception"
                },
                replacement: {
                    title: "Inception Reloaded",
                    year: 2010,
                    rating: "PG-13"
                },
                upsert: false
            }
        }];

        const replaceResult = await movies.bulkWrite(replaceOperations);
        console.log(`Modified documents: ${replaceResult.modifiedCount}`);
        // end-replace-coll

        // begin-replace-client
        const clientReplacements = [{
            namespace: "sample_mflix.movies",
            name: "replaceOne",
            filter: {
                title: "The Dark Knight"
            },
            replacement: {
                title: "The Dark Knight Rises",
                year: 2012,
                rating: "PG-13"
            }
        }, {
            namespace: "sample_mflix.movies",
            name: "replaceOne",
            filter: {
                title: "Inception"
            },
            replacement: {
                title: "Inception Reloaded",
                year: 2010,
                rating: "PG-13"
            }
        }, {
            namespace: "sample_mflix.users",
            name: "replaceOne",
            filter: {
                name: "April Cole"
            },
            replacement: {
                name: "April Franklin",
                email: "aprilfrank@example.com"
            }
        }];

        const clientReplaceRes = await client.bulkWrite(clientReplacements);
        console.log(`Modified documents: ${clientReplaceRes.modifiedCount}`);
        // end-replace-client        

        // begin-update-coll
        const updateOperations = [{
            updateOne: {
                filter: {
                    title: "Interstellar"
                },
                update: {
                    $set: {
                        title: "Interstellar Updated",
                        genre: "Sci-Fi Adventure"
                    }
                },
                upsert: true
            }
        }, {
            updateMany: {
                filter: {
                    rated: "PG-13"
                },
                update: {
                    $set: {
                        rated: "PG-13 Updated",
                        genre: "Updated Genre"
                    }
                }
            }
        }];

        const updateResult = await movies.bulkWrite(updateOperations);
        console.log(`Modified documents: ${updateResult.modifiedCount}`);
        // end-update-coll

        // begin-update-client
        const clientUpdates = [{
            namespace: "sample_mflix.movies",
            name: "updateMany",
            filter: {
                rated: "PG-13"
            },
            update: {
                $set: {
                    rated: "PG-13 Updated",
                    genre: "Updated Genre"
                }
            },
            upsert: false
        }, {
            namespace: "sample_mflix.users",
            name: "updateOne",
            filter: {
                name: "Jon Snow"
            },
            update: {
                $set: {
                    name: "Aegon Targaryen",
                    email: "targaryen@example.com"
                }
            },
            upsert: false
        }];
        const clientUpdateRes = await client.bulkWrite(clientUpdates);
        console.log(`Modified documents: ${clientUpdateRes.modifiedCount}`);
        // end-update-client     

        // begin-delete-coll
        const deleteOperations = [{
            deleteOne: {
                filter: {
                    title: "Dunkirk"
                }
            }
        }, {
            deleteMany: {
                filter: {
                    rated: "R"
                }
            }
        }];

        const deleteResult = await movies.bulkWrite(deleteOperations);
        console.log(`Deleted documents: ${deleteResult.deletedCount}`);
        // end-delete-coll

        // begin-delete-client
        const clientDeletes = [{
            namespace: "sample_mflix.movies",
            name: "deleteMany",
            filter: {
                rated: "R"
            }
        }, {
            namespace: "sample_mflix.users",
            name: "deleteOne",
            filter: {
                email: "emilia_clarke@gameofthron.es"
            }
        }];

        const clientDeleteRes = await client.bulkWrite(clientDeletes);
        console.log(`Deleted documents: ${clientDeleteRes.deletedCount}`);
        // end-delete-client

        console.log("Operations completed successfully.");
    } finally {
        await client.close();
    }
})();