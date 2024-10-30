using System;

class BulkWrite
{
    static void InsertOne()
    {
        // start-bulk-insert-one
        var insertOneModel = new BulkWriteInsertOneModel<BsonDocument>(
            "sample_restaurants.restaurants",
            new BsonDocument{
                { "name", "Mongo's Deli" },
                { "cuisine", "Sandwiches" },
                { "borough", "Manhattan" },
                { "restaurant_id", "1234" }
            }
        );
        // end-bulk-insert-one
    }

    static void UpdateOne()
    {
        // start-bulk-update-one
        var updateOneModel = new BulkWriteUpdateOneModel<BsonDocument>(
            "sample_restaurants.restaurants",
            Builders<BsonDocument>.Filter.Eq("name", "Mongo's Deli"),
            Builders<BsonDocument>.Update.Set("cuisine", "Sandwiches and Salads")
        );
        // end-bulk-update-one
    }

    static void UpdateMany()
    {
        // start-bulk-update-many
        var updateManyModel = new BulkWriteUpdateManyModel<BsonDocument>(
            "sample_restaurants.restaurants",
            Builders<BsonDocument>.Filter.Eq("name", "Mongo's Deli"),
            Builders<BsonDocument>.Update.Set("cuisine", "Sandwiches and Salads")
        );
        // end-bulk-update-many
    }

    static void ReplaceOne()
    {
        // start-bulk-replace-one
        var replaceOneModel = new BulkWriteReplaceOneModel<BsonDocument>(
            "sample_restaurants.restaurants",
            Builders<BsonDocument>.Filter.Eq("restaurant_id", "1234"),
            new BsonDocument{
                { "name", "Mongo's Pizza" },
                { "cuisine", "Pizza" },
                { "borough", "Brooklyn" },
                { "restaurant_id", "5678" }
            }
        );
        // end-bulk-replace-one
    }

    static void DeleteOne()
    {
        // start-bulk-delete-one
        var deleteOneModel = new BulkWriteDeleteOneModel<BsonDocument>(
            "sample_restaurants.restaurants",
            Builders<BsonDocument>.Filter.Eq("restaurant_id", "5678")
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
        var collection = "sample_restaurants.restaurants";

        var bulkWriteModels = new[]
        {
            new BulkWriteInsertOneModel<BsonDocument>(
                collection,
                new BsonDocument{
                    { "name", "Mongo's Deli" },
                    { "cuisine", "Sandwiches" },
                    { "borough", "Manhattan" },
                    { "restaurant_id", "1234" }
                }
            ),
            new BulkWriteInsertOneModel<BsonDocument>(
                collection,
                new BsonDocument{
                    { "name", "Mongo's Deli" },
                    { "cuisine", "Sandwiches" },
                    { "borough", "Brooklyn" },
                    { "restaurant_id", "5678" }
                }
            ),
            new BulkWriteUpdateManyModel<BsonDocument>(
                collection,
                Builders<BsonDocument>.Filter.Eq("name", "Mongo's Deli"),
                Builders<BsonDocument>.Update.Set("cuisine", "Sandwiches and Salads")
            ),
            new BulkWriteDeleteOneModel<BsonDocument>(
                collection,
                Builders<BsonDocument>.Filter.Eq("restaurant_id", "1234")
            )
        };

        var results = client.BulkWrite(bulkWriteModels);
        Console.WriteLine("Bulk write results: " + results);
        // end-bulk-write-sync
    }
    static async Task BulkWriteAsync()
    {
        // start-bulk-write-async
        var client = new MongoClient("mongodb://localhost:27017");
        var collection = "sample_restaurants.restaurants";

        var bulkWriteModels = new[]
        {
            new BulkWriteInsertOneModel<BsonDocument>(
                collection,
                new BsonDocument{
                    { "name", "Mongo's Deli" },
                    { "cuisine", "Sandwiches" },
                    { "borough", "Manhattan" },
                    { "restaurant_id", "1234" }
                }
            ),
            new BulkWriteInsertOneModel<BsonDocument>(
                collection,
                new BsonDocument{
                    { "name", "Mongo's Deli" },
                    { "cuisine", "Sandwiches" },
                    { "borough", "Brooklyn" },
                    { "restaurant_id", "5678" }
                }
            ),
            new BulkWriteUpdateManyModel<BsonDocument>(
                collection,
                Builders<BsonDocument>.Filter.Eq("name", "Mongo's Deli"),
                Builders<BsonDocument>.Update.Set("cuisine", "Sandwiches and Salads")
            ),
            new BulkWriteDeleteOneModel<BsonDocument>(
                collection,
                Builders<BsonDocument>.Filter.Eq("restaurant_id", "1234")
            )
        };

        var results = await client.BulkWriteAsync(bulkWriteModels);
        Console.WriteLine("Bulk write results: " + results);
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

        var results = client.BulkWrite(deleteOneModel, clientBulkWriteOptions);
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

        var results = await client.BulkWriteAsync(deleteOneModel, clientBulkWriteOptions);
        // end-bulk-write-options-async
    }
}