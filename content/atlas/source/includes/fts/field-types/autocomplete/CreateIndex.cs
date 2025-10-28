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
                { "type", "autocomplete" },
                { "analyzer", "<lucene.analyzer>" },
                { "tokenization", "edgeGram|rightEdgeGram|nGram" },
                { "minGrams", <2> },
                { "maxGrams", <15> },
                { "foldDiacritics", true|false },
                { "similarity", new BsonDocument { { "type", "bm25|boolean|stableTfl" } } }
              }
            }
          }
        }
      }
    }
  });

var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");