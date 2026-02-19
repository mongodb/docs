using MongoDB.Driver;
using MongoDB.Bson;

var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
if (connectionString == null)
{
    Console.WriteLine("You must set your 'MONGODB_URI' environment variable. To learn how to set it, see https://www.mongodb.com/docs/drivers/csharp/current/quick-start/#set-your-connection-string");
    Environment.Exit(0);
}

var client = new MongoClient(connectionString);
var collection = client.GetDatabase("db").GetCollection<BsonDocument>("rest");

// start-insert-one
var insertOneModel = new InsertOneModel<BsonDocument>(
    new BsonDocument{
        { "name", "Mongo's Deli" },
        { "cuisine", "Sandwiches" },
        { "borough", "Manhattan" },
        { "restaurant_id", "1234" }
    }
);
// end-insert-one

// start-update-one
var updateOneModel = new UpdateOneModel<BsonDocument>(
    Builders<BsonDocument>.Filter.Eq("name", "Mongo's Deli"),
    Builders<BsonDocument>.Update.Set("cuisine", "Sandwiches and Salads")
);
// end-update-one

// start-update-many
var updateManyModel = new UpdateManyModel<BsonDocument>(
    Builders<BsonDocument>.Filter.Eq("name", "Mongo's Deli"),
    Builders<BsonDocument>.Update.Set("cuisine", "Sandwiches and Salads")
);
// end-update-many

// start-replace-one
var replaceOneModel = new ReplaceOneModel<BsonDocument>(
    Builders<BsonDocument>.Filter.Eq("restaurant_id", "1234"),
    new BsonDocument{
        { "name", "Mongo's Pizza" },
        { "cuisine", "Pizza" },
        { "borough", "Brooklyn" },
        { "restaurant_id", "5678" }
    }
);
// end-replace-one

// start-delete-one
var deleteOneModel = new DeleteOneModel<BsonDocument>(
    Builders<BsonDocument>.Filter.Eq("restaurant_id", "5678")
);
// end-delete-one

// start-delete-many
var deleteManyModel = new DeleteManyModel<BsonDocument>(
    Builders<BsonDocument>.Filter.Eq("name", "Mongo's Deli")
);
// end-delete-many

// start-bulk-write-sync
var models = new List<WriteModel<BsonDocument>>
{
    new InsertOneModel<BsonDocument>(
        new BsonDocument{
            { "name", "Mongo's Deli" },
            { "cuisine", "Sandwiches" },
            { "borough", "Manhattan" },
            { "restaurant_id", "1234" }
        }
    ),
    new InsertOneModel<BsonDocument>(
        new BsonDocument{
            { "name", "Mongo's Deli" },
            { "cuisine", "Sandwiches" },
            { "borough", "Brooklyn" },
            { "restaurant_id", "5678" }
        }
    ),
    new UpdateManyModel<BsonDocument>(
        Builders<BsonDocument>.Filter.Eq("name", "Mongo's Deli"),
        Builders<BsonDocument>.Update.Set("cuisine", "Sandwiches and Salads")
    ),
    new DeleteOneModel<BsonDocument>(
        Builders<BsonDocument>.Filter.Eq("restaurant_id", "1234")
    )
};

var results = collection.BulkWrite(models);
Console.WriteLine(results);
// end-bulk-write-sync

// start-bulk-write-async
var models = new List<WriteModel<BsonDocument>>
{
    new InsertOneModel<BsonDocument>(
        new BsonDocument{
            { "name", "Mongo's Deli" },
            { "cuisine", "Sandwiches" },
            { "borough", "Manhattan" },
            { "restaurant_id", "1234" }
        }
    ),
    new InsertOneModel<BsonDocument>(
        new BsonDocument{
            { "name", "Mongo's Deli" },
            { "cuisine", "Sandwiches" },
            { "borough", "Brooklyn" },
            { "restaurant_id", "5678" }
        }
    ),
    new UpdateManyModel<BsonDocument>(
        Builders<BsonDocument>.Filter.Eq("name", "Mongo's Deli"),
        Builders<BsonDocument>.Update.Set("cuisine", "Sandwiches and Salads")
    ),
    new DeleteOneModel<BsonDocument>(
        Builders<BsonDocument>.Filter.Eq("restaurant_id", "1234")
    )
};

var results = await collection.BulkWriteAsync(models);
Console.WriteLine(results);
// end-bulk-write-async

// start-bulk-write-options-sync
var models = new List<WriteModel<BsonDocument>>
{
new DeleteOneModel<BsonDocument>(
    Builders<BsonDocument>.Filter.Eq("restaurant_id", "5678")
)
};

var options = new BulkWriteOptions
{
    IsOrdered = false,
};

collection.BulkWrite(models, options);
// end-bulk-write-options-sync

// start-bulk-write-options-async
var models = new List<WriteModel<BsonDocument>>
{
new DeleteOneModel<BsonDocument>(
    Builders<BsonDocument>.Filter.Eq("restaurant_id", "5678")
)
};

var options = new BulkWriteOptions
{
    IsOrdered = false,
};

await collection.BulkWriteAsync(models, options);
// end-bulk-write-options-async
