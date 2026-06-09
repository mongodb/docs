using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("<databaseName>");
var collection = db.GetCollection<BsonDocument>("<collectionName>");

// define your MongoDB Search indexes
var indexes = new List<CreateSearchIndexModel>
{
    new CreateSearchIndexModel(
        "<firstIndexName>",
        new BsonDocument
        {
            <IndexDefinition>// search index definition fields
        }
    ),
    ...
    new CreateSearchIndexModel(
        "<lastIndexName>",
        new BsonDocument
        {
            <IndexDefinition> // search index definition fields
        }
    )
};

var result = collection.SearchIndexes.CreateMany(indexes);
