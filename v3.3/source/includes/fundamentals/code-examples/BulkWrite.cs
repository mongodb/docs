using System;

class BulkWrite
{
    static void InsertOne()
    {
        // start-bulk-insert-one
        var restaurantToInsert = new BulkWriteInsertOneModel<BsonDocument>(
            "sample_restaurants.restaurants",
            new BsonDocument{
                { "name", "Mongo's Deli" },
                { "cuisine", "Sandwiches" },
                { "borough", "Manhattan" },
                { "restaurant_id", "1234" }
            }
        );

        var movieToInsert = new BulkWriteInsertOneModel<BsonDocument>(
            "sample_mflix.movies",
            new BsonDocument{
                { "title", "Silly Days" },
                { "year", 2022 }
            }
        );
        // end-bulk-insert-one
    }

    static void UpdateOne()
    {
        // start-bulk-update-one
        var restaurantUpdate = new BulkWriteUpdateOneModel<BsonDocument>(
            "sample_restaurants.restaurants",
            Builders<BsonDocument>.Filter.Eq("name", "Mongo's Deli"),
            Builders<BsonDocument>.Update.Set("cuisine", "Sandwiches and Salads")
        );

        var movieUpdate = new BulkWriteUpdateOneModel<BsonDocument>(
            "sample_mflix.movies",
            Builders<BsonDocument>.Filter.Eq("title", "Carrie"),
            Builders<BsonDocument>.Update.Set("seen", True)
        );
        // end-bulk-update-one
    }

    static void UpdateMany()
    {
        // start-bulk-update-many
        var updateManyModel = new BulkWriteUpdateManyModel<BsonDocument>(
            "sample_restaurants.restaurants",
            Builders<BsonDocument>.Filter.Eq("name", "Starbucks"),
            Builders<BsonDocument>.Update.Set("cuisine", "Coffee (Chain)")
        );
        // end-bulk-update-many
    }

    static void ReplaceOne()
    {
        // start-bulk-replace-one
        var restaurantReplacement = new BulkWriteReplaceOneModel<BsonDocument>(
            "sample_restaurants.restaurants",
            Builders<BsonDocument>.Filter.Eq("restaurant_id", "1234"),
            new BsonDocument{
                { "name", "Mongo's Pizza" },
                { "cuisine", "Pizza" },
                { "borough", "Brooklyn" },
                { "restaurant_id", "5678" }
            }
        );

        var movieReplacement = new BulkWriteReplaceOneModel<BsonDocument>(
            "sample_mflix.movies",
            Builders<BsonDocument>.Filter.Eq("title", "Insomnia"),
            new BsonDocument{
                { "name", "Loving Sylvie" },
                { "year", 1999 }
            }
        );
        // end-bulk-replace-one
    }

    static void DeleteOne()
    {
        // start-bulk-delete-one
        var restaurantToDelete = new BulkWriteDeleteOneModel<BsonDocument>(
            "sample_restaurants.restaurants",
            Builders<BsonDocument>.Filter.Eq("restaurant_id", "5678")
        );

        var movieToDelete = new BulkWriteDeleteOneModel<BsonDocument>(
            "sample_mflix.movies",
            Builders<BsonDocument>.Filter.Eq("title", "Mr. Nobody")
        );
        // end-bulk-delete-one
    }

    static void DeleteMany()
    {
        // start-bulk-delete-many
        var deleteManyModel = new BulkWriteDeleteManyModel<BsonDocument>(
            "sample_restaurants.restaurants",
            Builders<BsonDocument>.Filter.Eq("name", "Mongo's Deli")
        );
        // end-bulk-delete-many
    }

    static void BulkWriteSync()
    {
        // start-bulk-write-sync
        var client = new MongoClient("mongodb://localhost:27017");
        var restaurantNamespace = "sample_restaurants.restaurants";
        var movieNamespace = "sample_mflix.movies";

        var bulkWriteModels = new[]
        {
            new BulkWriteInsertOneModel<BsonDocument>(
                restaurantNamespace,
                new BsonDocument{
                    { "name", "Mongo's Deli" },
                    { "cuisine", "Sandwiches" },
                    { "borough", "Manhattan" },
                    { "restaurant_id", "1234" }
                }
            ),
            new BulkWriteInsertOneModel<BsonDocument>(
                movieNamespace,
                new BsonDocument{
                    { "name", "Sarah's Secret" },
                    { "year", 1988 }
                }
            ),
            new BulkWriteUpdateManyModel<BsonDocument>(
                restaurantNamespace,
                Builders<BsonDocument>.Filter.Eq("name", "Mongo's Deli"),
                Builders<BsonDocument>.Update.Set("cuisine", "Sandwiches and Salads")
            ),
            new BulkWriteDeleteOneModel<BsonDocument>(
                movieNamespace,
                Builders<BsonDocument>.Filter.Eq("title", "House")
            )
        };

        var result = client.BulkWrite(bulkWriteModels);
        Console.WriteLine(result);
        // end-bulk-write-sync
    }
    static async Task BulkWriteAsync()
    {
        // start-bulk-write-async
        var client = new MongoClient("mongodb://localhost:27017");
        var restaurantNamespace = "sample_restaurants.restaurants";
        var movieNamespace = "sample_mflix.movies";

        var bulkWriteModels = new[]
        {
            new BulkWriteInsertOneModel<BsonDocument>(
                restaurantNamespace,
                new BsonDocument{
                    { "name", "Mongo's Deli" },
                    { "cuisine", "Sandwiches" },
                    { "borough", "Manhattan" },
                    { "restaurant_id", "1234" }
                }
            ),
            new BulkWriteInsertOneModel<BsonDocument>(
                movieNamespace,
                new BsonDocument{
                    { "name", "Sarah's Secret" },
                    { "year", 1988 }
                }
            ),
            new BulkWriteUpdateManyModel<BsonDocument>(
                restaurantNamespace,
                Builders<BsonDocument>.Filter.Eq("name", "Mongo's Deli"),
                Builders<BsonDocument>.Update.Set("cuisine", "Sandwiches and Salads")
            ),
            new BulkWriteDeleteOneModel<BsonDocument>(
                movieNamespace,
                Builders<BsonDocument>.Filter.Eq("title", "House")
            )
        };

        var result = await client.BulkWriteAsync(bulkWriteModels);
        Console.WriteLine(result);
        // end-bulk-write-async
    }

    static void BulkWriteOptionsSync()
    {
        // start-bulk-write-options-sync
        var client = new MongoClient("mongodb://localhost:27017");

        var deleteOneModel = new BulkWriteDeleteOneModel<BsonDocument>(
            "sample_restaurants.restaurants",
            Builders<BsonDocument>.Filter.Eq("restaurant_id", "5678")
        );

        var clientBulkWriteOptions = new ClientBulkWriteOptions
        {
            IsOrdered = false,
            WriteConcern = WriteConcern.Unacknowledged,
            VerboseResult = true
        };

        var result = client.BulkWrite(deleteOneModel, clientBulkWriteOptions);
        // end-bulk-write-options-sync
    }
    static async Task BulkWriteOptionsAsync()
    {
        // start-bulk-write-options-async
        var client = new MongoClient("mongodb://localhost:27017");

        var deleteOneModel = new BulkWriteDeleteOneModel<BsonDocument>(
            "sample_restaurants.restaurants",
            Builders<BsonDocument>.Filter.Eq("restaurant_id", "5678")
        );

        var clientBulkWriteOptions = new ClientBulkWriteOptions
        {
            IsOrdered = false,
            WriteConcern = WriteConcern.Unacknowledged,
            VerboseResult = true
        };

        var result = await client.BulkWriteAsync(deleteOneModel, clientBulkWriteOptions);
        // end-bulk-write-options-async
    }
}
