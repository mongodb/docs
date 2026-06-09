using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_mflix");
var collection = db.GetCollection<BsonDocument>("movies");

// define your MongoDB Search index
var index = new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", false },
        { "fields", new BsonDocument
          {
            { "title", new BsonDocument
              {
                { "type", "string" },
                { "multi", new BsonDocument
                  {
                    { "english", new BsonDocument
                      {
                        { "type", "string" },
                        { "analyzer", "lucene.english" }
                      }
                    },
                    { "french", new BsonDocument
                      {
                        { "type", "string" },
                        { "analyzer", "lucene.french" }
                      }
                    },
                    { "stableSimilarity", new BsonDocument
                      {
                        { "type", "string" },
                        { "similarity", new BsonDocument
                          {
                            { "type", "stableTfl" }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");