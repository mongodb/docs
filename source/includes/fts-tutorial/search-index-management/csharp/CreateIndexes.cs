using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("<databaseName>");
var collection = db.GetCollection<BsonDocument>("<collectionName>");

// define your Atlas Search indexes
var indexes = new List<CreateSearchIndexModel>
{
    new CreateSearchIndexModel(
        "<first-index-name>",
        new BsonDocument
        {
            // search index definition fields
        }
    ),
    ...
    new CreateSearchIndexModel(
        "<last-index-name>",
        new BsonDocument
        {
            // search index definition fields
        }
    )
};

var result = collection.SearchIndexes.CreateMany(indexes);
