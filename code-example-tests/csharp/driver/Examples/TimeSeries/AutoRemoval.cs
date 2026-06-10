// :replace-start: {
//	  "terms": {
//	    "CollectionName": "\u0022weather24h\u0022"
//	  }
//	}

using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.TimeSeries;

public abstract class AutoRemoval
{
    private static readonly string CollectionName = "weather24h";
    private static readonly string uri = DotNetEnv.Env.GetString("CONNECTION_STRING",
        "Env variable not found. Verify you have a .env file with a valid connection string.");

    public static async Task CreateTimeSeriesCollection()
    {
        var client = new MongoClient(uri);
        var database = client.GetDatabase("timeseries");

        // GetCollection() is a client-side factory and always returns a
        // non-null reference, so ask the server whether the collection
        // actually exists before issuing a drop.
        var existing = await database.ListCollectionNamesAsync(
            new ListCollectionNamesOptions
            {
                Filter = new BsonDocument("name", CollectionName)
            });
        if (await existing.AnyAsync())
        {
            await database.DropCollectionAsync(CollectionName);
        }

        // :snippet-start: create-timeseries-collection-for-removal
        var createCommand = new BsonDocument
        {
            { "create", CollectionName },
            { "timeseries", new BsonDocument
                {
                    { "timeField", "timestamp" },
                    { "metaField", "sensorId" },
                    { "granularity", "seconds" }
                }
            },
            { "expireAfterSeconds", 86400 }
        };

        // Execute the command to create the collection
        // :remove-start:
        // Retry on transient NamespaceExists (48), which can briefly
        // surface when a prior test's drop hasn't fully cleared on the
        // server. This is a test-environment concern, not example code.
        for (var attempt = 0; ; attempt++)
        {
            try
            {
                // :remove-end:
                await database.RunCommandAsync<BsonDocument>(createCommand);
                // :remove-start:
                break;
            }
            catch (MongoCommandException ex) when (attempt < 3 && ex.Code == 48)
            {
                await Task.Delay(TimeSpan.FromMilliseconds(100 * (attempt + 1)));
            }
        }
        // :remove-end:
        // :snippet-end:
    }

    public static async Task<BsonDocument> UpdateCollectionOptions()
    {
        await CreateTimeSeriesCollection();
        var client = new MongoClient(uri);
        var database = client.GetDatabase("timeseries");
        // :snippet-start: modify-timeseries-collection-for-removal
        var command = new BsonDocument
        {
            { "collMod", CollectionName },
            { "expireAfterSeconds", 7200 } // Set expiration to 2 hours (7200 seconds)
        };

        var result = await database.RunCommandAsync<BsonDocument>(command);
        // :snippet-end:
        return result;
    }

    public static async Task<BsonValue?> GetCollectionInfo()
    {
        await CreateTimeSeriesCollection();
        var client = new MongoClient(uri);
        var database = client.GetDatabase("timeseries");
        // :snippet-start: get-timeseries-collection-expiry
        var collectionInfoCursor = await
            database.ListCollectionsAsync(
                new ListCollectionsOptions { Filter = new BsonDocument("name", CollectionName) });
        var collectionInfo = await collectionInfoCursor.FirstOrDefaultAsync();
        if (collectionInfo != null)
        {
            return collectionInfo["options"]["expireAfterSeconds"];
        }
        // :snippet-end:
        return null;
    }

    public static async Task<bool> RemoveRemoval()
    {
        await CreateTimeSeriesCollection();
        var client = new MongoClient(uri);
        var database = client.GetDatabase("timeseries");
        // :snippet-start: remove-expireAfterSeconds
        var command = new BsonDocument
        {
            { "collMod", CollectionName },
            { "expireAfterSeconds", "off" }
        };

        await database.RunCommandAsync<BsonDocument>(command);
        // :snippet-end:

        // Make sure the property was actually removed
        var collectionInfoCursor = await
            database.ListCollectionsAsync(
                new ListCollectionsOptions { Filter = new BsonDocument("name", CollectionName) });
        var collectionInfo = await collectionInfoCursor.FirstOrDefaultAsync();
        if (collectionInfo != null)
        {
            if (collectionInfo.Contains("options") &&
                !collectionInfo["options"].AsBsonDocument.Contains("expireAfterSeconds"))
            {
                return true;
            }
        }

        return false;
    }

    public static void Cleanup()
    {
        var client = new MongoClient(uri);
        var database = client.GetDatabase("timeseries");
        database?.DropCollection(CollectionName);
        client?.Dispose();
    }
}

// :replace-end: