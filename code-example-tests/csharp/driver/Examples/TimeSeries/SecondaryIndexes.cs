using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Serializers;
using MongoDB.Driver;
using MongoDB.Driver.GeoJsonObjectModel;

namespace Examples.TimeSeries;

public class SecondaryIndexes
{
    private static readonly string uri = DotNetEnv.Env.GetString("CONNECTION_STRING",
        "Env variable not found. Verify you have a .env file with a valid connection string.");

    private static IMongoCollection<BsonDocument>? _collection;

    private static readonly string databaseName = "timeseries";
    private static readonly string collectionName = "sensorData";
    private static IMongoDatabase? _database;
    private static IMongoClient? _client;

    private static void LoadData()
    {
        _client = new MongoClient(uri);
        _database = _client.GetDatabase(databaseName);

        // :snippet-start: secondary-create-collection
        var createCollectionOptions = new CreateCollectionOptions
        {
            TimeSeriesOptions = new TimeSeriesOptions(
                timeField: "timestamp",
                metaField: "metadata"),
            ExpireAfter = TimeSpan.FromHours(24)
        };
        // :snippet-end:
        _database.CreateCollection(collectionName, createCollectionOptions);
        _collection = _database.GetCollection<BsonDocument>(collectionName);

        // :snippet-start: secondary-data
        var sampleDocuments = new List<BsonDocument>
        {
            new BsonDocument
            {

                { // :snippet-start: secondary-data-schema
                    "metadata", new BsonDocument
                    {
                        { "sensorId", 5578 },
                        { "type", "omni" },
                        { "location", new BsonDocument
                            {
                                { "type", "Point" },
                                { "coordinates", new BsonArray { -77.40711, 39.03335 } }
                            }
                        }
                    }
                    // :snippet-end:
                }

                ,
                { "timestamp", new DateTime(2022, 1, 15, 0, 0, 0, DateTimeKind.Utc) } ,
                { "currentConditions", new BsonDocument
                    {
                        { "windDirection", 127.0 },
                        { "tempF", 71.0 },
                        { "windSpeed", 2.0 },
                        { "cloudCover", BsonNull.Value },
                        { "precip", 0.1 },
                        { "humidity", 94.0 }
                    }
                }
            },
            new BsonDocument
            {
                { "metadata", new BsonDocument
                    {
                        { "sensorId", 5578 },
                        { "type", "omni" },
                        { "location", new BsonDocument
                            {
                                { "type", "Point" },
                                { "coordinates", new BsonArray { -77.40711, 39.03335 } }
                            }
                        }
                    }
                },
                { "timestamp", new DateTime(2022, 1, 15, 0, 1, 0, DateTimeKind.Utc) },
                { "currentConditions", new BsonDocument
                    {
                        { "windDirection", 128.0 },
                        { "tempF", 69.8 },
                        { "windSpeed", 2.2 },
                        { "cloudCover", BsonNull.Value },
                        { "precip", 0.1 },
                        { "humidity", 94.3 }
                    }
                }
            },
            new BsonDocument
            {
                { "metadata", new BsonDocument
                    {
                        { "sensorId", 5579 },
                        { "type", "omni" },
                        { "location", new BsonDocument
                            {
                                { "type", "Point" },
                                { "coordinates", new BsonArray { -80.19773, 25.77481 } }
                            }
                        }
                    }
                },
                { "timestamp", new DateTime(2022, 1, 15, 0, 1, 0, DateTimeKind.Utc) },
                { "currentConditions", new BsonDocument
                    {
                        { "windDirection", 115.0 },
                        { "tempF", 88.0 },
                        { "windSpeed", 1.0 },
                        { "cloudCover", BsonNull.Value },
                        { "precip", 0.0 },
                        { "humidity", 99.0 }
                    }
                }
            }
        };
        // :snippet-end:
        _collection.InsertMany(sampleDocuments);
    }

    public static async Task<(List<BsonDocument>? Result, BsonDocument? ExplainResult)> CreateAndUseSecondaryIndex()
    {
        LoadData();
        // :snippet-start: simple-in-example
        var filter = Builders<BsonDocument>.Filter
            .In("metadata.type", new[] { "temperature", "pressure" });
        // :snippet-end:
        // :snippet-start: create-secondary-index
        await _collection?.Indexes.CreateOneAsync(new CreateIndexModel<BsonDocument>(
            Builders<BsonDocument>.IndexKeys.Ascending("timestamp")))!;
        // :snippet-end:

        // :snippet-start: sort-with-secondary-index
        var matchStage = Builders<BsonDocument>.Filter.Gte("timestamp",
            new DateTime(2022, 1, 15, 0, 0, 0, DateTimeKind.Utc));

        var pipeline = new EmptyPipelineDefinition<BsonDocument>()
            .Match(matchStage)
            .Sort(new BsonDocument("timestamp", 1));

        var result = _collection?.Aggregate(pipeline).ToList();
        // :snippet-end:

        // :snippet-start: sort-with-secondary-index-explain
        var renderedPipeline = pipeline.Render(new RenderArgs<BsonDocument>(
            BsonDocumentSerializer.Instance, BsonSerializer.SerializerRegistry));

        var explainCommand = new BsonDocument
        {
            {
                "explain", new BsonDocument
                {
                    { "aggregate", collectionName },
                    { "pipeline", new BsonArray(renderedPipeline.Documents) },
                    { "cursor", new BsonDocument() }
                }
            },
            { "verbosity", "executionStats" }
        };

        var explainResult = _database?.RunCommand<BsonDocument>(explainCommand);
        // :snippet-end:
        return (result, explainResult);
    }

    public static (List<BsonDocument>? Result, BsonDocument? ExplainResult, List<BsonDocument>? HintResult) CreateAndUseCompoundIndexes()
    {
        // :snippet-start: last-point-indexes
        // Indexes on ``timeField`` descending are more performant because they 
        // enable ``DISTINCT_SCAN`` optimizations.
        var indexes = new List<CreateIndexModel<BsonDocument>>
        {
            new CreateIndexModel<BsonDocument>(
                Builders<BsonDocument>.IndexKeys
                    .Ascending("metadata.sensorId")
                    .Ascending("timestamp")),
            new CreateIndexModel<BsonDocument>(
                Builders<BsonDocument>.IndexKeys
                    .Ascending("metadata.sensorId")
                    .Descending("timestamp")),
            new CreateIndexModel<BsonDocument>(
                Builders<BsonDocument>.IndexKeys
                    .Descending("metadata.sensorId")
                    .Ascending("timestamp")),
            new CreateIndexModel<BsonDocument>(
                Builders<BsonDocument>.IndexKeys
                    .Descending("metadata.sensorId")
                    .Descending("timestamp"))
        };
        // :snippet-end:
        // :snippet-start: last-point-index-meta-up-time-down
        _collection?.Indexes.CreateOne(
            new CreateIndexModel<BsonDocument>(
                Builders<BsonDocument>.IndexKeys
                    .Ascending("metadata.type")
                    .Descending("timestamp")));
        // :snippet-end:

        // :snippet-start: sort-and-group
        var pipeline = new EmptyPipelineDefinition<BsonDocument>()
            .Sort(new BsonDocument
            {
                { "metadata.sensorId", 1 },
                { "timestamp", -1 }
            })
            .Group(new BsonDocument
            {
                { "_id", "$metadata.sensorId" },
                { "ts", new BsonDocument("$first", "$timestamp") },
                { "temperatureF", new BsonDocument("$first", "$currentConditions.tempF") }
            });

        var result = _collection?.Aggregate(pipeline).ToList();
        // :snippet-end:

        // :snippet-start: sort-and-group-explain
        var renderedPipeline = pipeline.Render(new RenderArgs<BsonDocument>(
            BsonDocumentSerializer.Instance, BsonSerializer.SerializerRegistry));

        var explainCommand = new BsonDocument
        {
            {
                "explain", new BsonDocument
                {
                    { "aggregate", collectionName },
                    { "pipeline", new BsonArray(renderedPipeline.Documents) },
                    { "cursor", new BsonDocument() }
                }
            },
            { "verbosity", "executionStats" }
        };

        var explainResult = _database?.RunCommand<BsonDocument>(explainCommand);
        // :snippet-end:
        // :snippet-start: hint
        var hintOptions = new AggregateOptions
        {
            Hint = new BsonDocument
            {
                { "metadata.sensorId", 1 },
                { "timestamp", -1 }
            }
        };
        var hintResult = _collection?.Aggregate(pipeline, hintOptions).ToList();
        // :snippet-end:
        return (result, explainResult, hintResult);
    }

    public static List<BsonDocument>? CreateAndUseGeospatialIndex()
    {
        // :snippet-start: create-geospatial-index-location
        _collection?.Indexes.CreateOne(new CreateIndexModel<BsonDocument>(
            Builders<BsonDocument>.IndexKeys.Geo2DSphere("metadata.location")));
        // :snippet-end:

        var filter = Builders<BsonDocument>.Filter.NearSphere(
            "metadata.location",
            new GeoJsonPoint<GeoJson2DCoordinates>(
                new GeoJson2DCoordinates(-77.03653, 38.897676)),
            maxDistance: 5000000);

        var result = _collection?.Find(filter).ToList();

        return result;
    }

    public static void Cleanup()
    {
        _database?.DropCollection(collectionName);
        _client?.Dispose();
    }
}