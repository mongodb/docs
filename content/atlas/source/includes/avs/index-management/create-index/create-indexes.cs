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

// Create your index models and add them to an array
var modelOne = new CreateVectorSearchIndexModel<<documentType>> (
    <fieldToIndex>
    "<indexName>",
    <vectorSimilarity>,
    <numberOfDimensions>);

var modelTwo = new CreateVectorSearchIndexModel<<documentType>> (
    <fieldToIndex>
    "<indexName>",
    <vectorSimilarity>,
    <numberOfDimensions>);

var models = new CreateVectorSearchIndexModel[] { modelOne, modelTwo };

// Create the search indexes
var searchIndexView = collection.SearchIndexes;
searchIndexView.CreateMany(models);

Console.WriteLine($"New search indexes are building. This may take up to a minute.");