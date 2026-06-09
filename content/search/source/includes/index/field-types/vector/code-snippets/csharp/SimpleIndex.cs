using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_mflix");
var collection = db.GetCollection<BsonDocument>("embedded_movies");

// define your MongoDB Search index
var index =  new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", true },
        { "fields", new BsonDocument
          {
            { "plot_embedding_voyage_3_large", new BsonDocument
              {
                { "numDimensions", 2048 },
                { "quantization", "scalar" },
                { "similarity", "dotProduct" },
                { "type", "vector" }
              }
            }
          }
        }
      }
    }
  });

var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");