using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("<database>");
var collection = db.GetCollection<BsonDocument>("<collection>");

// define your MongoDB Search index
var index =  new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", true|false },
        { "fields", new BsonDocument
          {
            { "<field-name>", new BsonDocument
              {
                { "type", "vector" },
                { "numDimensions", "<number-of-dimensions>" },
                { "similarity", "euclidean | cosine | dotProduct" },
                { "quantization", "none | scalar | binary" },
                { "hnswOptions", new BsonDocument
                  {
                    { "maxEdges", "<number-of-connected-neighbors>" },
                    { "numEdgeCandidates", "<number-of-nearest-neighbors>" }
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