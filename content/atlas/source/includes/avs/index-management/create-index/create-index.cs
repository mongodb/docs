using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading;

// connect to your deployment
private const string MongoConnectionString = "<connectionString>";
var client = new MongoClient(MongoConnectionString);

// Access your database and collection
var database = client.GetDatabase("<databaseName>");
var collection = database.GetCollection<BsonDocument>("<collectionName>");

// Create your index model, then create the search index
var name = "<indexName>";
var model = new CreateVectorSearchIndexModel<<documentType>> (
    <fieldToIndex>
    name,
    <vectorSimilarity>,
    <numberOfDimensions>);

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
