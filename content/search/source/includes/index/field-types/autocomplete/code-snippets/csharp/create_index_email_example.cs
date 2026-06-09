using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_mflix");
var collection = db.GetCollection<BsonDocument>("users");

// define your MongoDB Search index
var index =  new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", true },
        { "fields", new BsonDocument
          {
            { "email", new BsonDocument
              {
                { "type", "autocomplete" },
                { "analyzer", "lucene.keyword" },
                { "tokenization", "nGram" },
                { "minGrams", 3 },
                { "maxGrams", 15 },
                { "foldDiacritics", false }
              }
            }
          }
        }
      }
    }
  });

var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");