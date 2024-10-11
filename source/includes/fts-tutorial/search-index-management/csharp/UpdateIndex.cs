using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("<databaseName>");
var collection = db.GetCollection<BsonDocument>("<collectionName>");

// define your Atlas Search index
var index = new BsonDocument
{
  // updated search index definition
  { "mappings", new BsonDocument
    {
      { "dynamic", false },
      { "fields", new BsonDocument
        {
          { "<field-name>", new BsonDocument
            {
              { "type", "<field-type>" }
            }
          }
        }
      }
    }
  }
};

collection.SearchIndexes.Update("<index-name>", index);
