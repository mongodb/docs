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

// Create your index models and add them to an array
var type = SearchIndexType.VectorSearch;

var definitionOne = new BsonDocument
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
var modelOne = new CreateSearchIndexModel("<indexName>", type, definitionOne);

var definitionTwo = new BsonDocument
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
var modelTwo = new CreateSearchIndexModel("<indexName>", type, definitionTwo);

var models = new CreateSearchIndexModel[] { modelOne, modelTwo };

// Create the search indexes
var searchIndexView = collection.SearchIndexes;
searchIndexView.CreateMany(models);

Console.WriteLine($"New search indexes are building. This may take up to a minute.");