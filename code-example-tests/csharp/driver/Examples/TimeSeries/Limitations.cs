using Examples.TimeSeries.QuickStart;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Examples.TimeSeries;

public class Limitations
{
    private static readonly string uri = DotNetEnv.Env.GetString("CONNECTION_STRING",
        "Env variable not found. Verify you have a .env file with a valid connection string.");

    private static IMongoCollection<BsonDocument>? _collection;
    private static IMongoDatabase? _database;
    private static IMongoClient? _client;

    private static void LoadData()
    {
        _client = new MongoClient(uri);
        _database = _client.GetDatabase("timeseries");
        _database.CreateCollection("limitations");
        _collection = _database.GetCollection<BsonDocument>("limitations");

        var sampleDocuments = new List<BsonDocument>()
        {
            new BsonDocument
            {
                { "_id", ObjectId.GenerateNewId() },
                { "name", "example" },
                { "meta", new BsonDocument
                    {
                        { "project", 10 },
                        { "type", "a" }
                    }
                }
            },
            new BsonDocument
            {
                { "_id", ObjectId.GenerateNewId() },
                { "name", "example" },
                { "meta", new BsonDocument
                    {
                        { "project", 10 },
                        { "type", "b" }
                    }
                }
            },
            new BsonDocument
            {
                { "_id", ObjectId.GenerateNewId() },
                { "name", "example" },
                { "meta", new BsonDocument
                    {
                        { "project", 40 },
                        { "type", "c" }
                    }
                }
            }
        };

        _collection.InsertMany(sampleDocuments);
    }

    public static List<BsonDocument>? GetDistinctDocuments()
    {
        LoadData();

        // :snippet-start: agg-pipeline-for-distinct
        var indexModel = new CreateIndexModel<BsonDocument>(
            Builders<BsonDocument>.IndexKeys
                .Ascending("meta.project")
                .Ascending("meta.type"));

        _collection?.Indexes.CreateOne(indexModel);

        var matchStage = Builders<BsonDocument>.Filter.Eq("meta.project", 10);
        var pipeline = new EmptyPipelineDefinition<BsonDocument>()
            .Match(matchStage)
            .Group(new BsonDocument("_id", "$meta.type"));

        var result = _collection?.Aggregate(pipeline).ToList();
        // :snippet-end:    
        return result;
    }

    public static void Cleanup()
    {
        _database?.DropCollection("limitations");
        _client?.Dispose();
    }
}