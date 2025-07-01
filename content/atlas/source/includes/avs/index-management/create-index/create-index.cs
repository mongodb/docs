using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading;

// Connect to your Atlas deployment
private const string MongoConnectionString = "<connectionString>";
var client = new MongoClient(MongoConnectionString);

// Access your database and collection
var database = client.GetDatabase("<databaseName>");
var collection = database.GetCollection<BsonDocument>("<collectionName>");

// Create your index model, then create the search index
var name = "<indexName>";
var type = SearchIndexType.VectorSearch;

var definition = new BsonDocument
{
    { "fields", new BsonArray
        {
            new BsonDocument
            {
                { "type", "vector" },
                { "path", "<fieldToIndex>" },
                { "numDimensions", <numberOfDimensions> },
                { "similarity", "euclidean | cosine | dotProduct" }
            }
        }
    }
};

var model = new CreateSearchIndexModel(name, type, definition);

var searchIndexView = collection.SearchIndexes;
searchIndexView.CreateOne(model);
Console.WriteLine($"New search index named {name} is building.");

// Wait for initial sync to complete
Console.WriteLine("Polling to check if the index is ready. This may take up to a minute.");
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
