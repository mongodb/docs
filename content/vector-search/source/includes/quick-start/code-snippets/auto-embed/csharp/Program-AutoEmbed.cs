using MongoDB.Bson;
using MongoDB.Driver;

var connectionString = "<connection string>";
var client = new MongoClient(connectionString);
var database = client.GetDatabase("sample_mflix");
var collection = database.GetCollection<BsonDocument>("movies");

var searchIndexView = collection.SearchIndexes;
var name = "autembed_index";

var definition = new BsonDocument
{
    { "fields", new BsonArray
        {
            new BsonDocument
            {
                { "type", "autoEmbed" },
                { "modality", "text" },
                { "path", "fullplot" },
                { "model", "voyage-4" }
            }
        }
    }
};

var model = new CreateSearchIndexModel(name, SearchIndexType.VectorSearch, definition);
searchIndexView.CreateOne(model);
Console.WriteLine($"New search index named {name} is building.");

Console.WriteLine("Polling to check if the index is ready.");
bool queryable = false;
while (!queryable)
{
    var indexes = searchIndexView.List();
    foreach (var index in indexes.ToEnumerable())
    {
        if (index["name"] == name)
        {
            queryable = index["queryable"].AsBoolean;
        }
    }
    if (!queryable)
    {
        Thread.Sleep(5000);
    }
}
Console.WriteLine($"{name} is ready for querying.");
