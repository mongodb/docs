using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

// :snippet-start: large-document-class
[BsonIgnoreExtraElements]
public class LargeDocument
{
    [BsonId]
    public int Id { get; set; }
    public string LargeField { get; set; } = null!;
}
// :snippet-end:

public class ChangeStreamSplitLargeEventExample
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");
    public const string DbName = "change_stream_test";
    private const string CollectionName = "largeEventCollection";
    private MongoClient _client = null!;

    public List<BsonDocument> RunChangeStreamSplitLargeEvent()
    {
        // :snippet-start: change-stream-split-large-event
        // :uncomment-start:
        //var client = new MongoClient("<connection-string>");
        // :uncomment-end:
        var client = new MongoClient(_uri); // :remove:
        _client = client; // :remove:

        var db = client.GetDatabase("change_stream_test");
        db.DropCollection("largeEventCollection"); // :remove:
        var collection = db.GetCollection<LargeDocument>("largeEventCollection");

        collection.InsertOne(new LargeDocument
        {
            Id = 0,
            LargeField = new string('a', 16 * 1024 * 1024 - 1024)
        });

        db.RunCommand<BsonDocument>(new BsonDocument
        {
            { "collMod", "largeEventCollection" },
            { "changeStreamPreAndPostImages", new BsonDocument("enabled", true) }
        });

        var pipeline = new EmptyPipelineDefinition<ChangeStreamDocument<LargeDocument>>()
            .ChangeStreamSplitLargeEvent();

        var watchOptions = new ChangeStreamOptions
        {
            FullDocument = ChangeStreamFullDocumentOption.Required,
            FullDocumentBeforeChange = ChangeStreamFullDocumentBeforeChangeOption.Required
        };

        using var cursor = collection.Watch(pipeline, watchOptions);

        collection.UpdateOne(
            Builders<LargeDocument>.Filter.Eq(d => d.Id, 0),
            Builders<LargeDocument>.Update.Set(d => d.LargeField, new string('b', 16 * 1024 * 1024 - 1024))
        );

        var splitEvents = new List<BsonDocument>(); // :remove:
        var fragmentCount = 0; // :remove:
        while (cursor.MoveNext())
        {
            foreach (var fragment in cursor.Current)
            {
                Console.WriteLine(fragment.BackingDocument["splitEvent"].ToJson());
                splitEvents.Add(fragment.BackingDocument["splitEvent"].AsBsonDocument); // :remove:
                fragmentCount++; // :remove:
            }
            if (fragmentCount >= 3) break; // :remove:
        }
        // :snippet-end:
        return splitEvents; // :remove:
    }

    public void Cleanup()
    {
        _client?.DropDatabase(DbName);
        _client?.Dispose();
    }
}
