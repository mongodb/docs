using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_mflix");
var collection = db.GetCollection<BsonDocument>("movies");

// define your Atlas Search index
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
                { "analyzer", "lucene.english" },
                { "type", "string" }
              }
            }
          }
        }
      }
    },
    { "synonyms", new BsonArray
      {
        new BsonDocument
        {
          { "analyzer", "lucene.english" },
          { "name", "transportSynonyms" },
          { "source", new BsonDocument
            {
              { "collection", "transport_synonyms" }
            }
          }
        },
        new BsonDocument
        {
          { "analyzer", "lucene.english" },
          { "name", "attireSynonyms" },
          { "source", new BsonDocument
            {
              { "collection", "attire_synonyms" }
            }
          }
        }
      }
    }
  });

var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");