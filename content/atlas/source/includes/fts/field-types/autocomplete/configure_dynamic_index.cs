using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_mflix");
var collection = db.GetCollection<BsonDocument>("movies");

// define your Atlas Search index
var index =  new CreateSearchIndexModel(
  "default", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", new BsonDocument { { "typeSet", "moviesStringIndex" } } },
        { "fields", new BsonDocument
          {
            { "poster", new BsonArray() },
            { "languages", new BsonArray() },
            { "rated", new BsonArray() },
            { "lastupdated", new BsonArray() },
            { "fullplot", new BsonArray() },
            { "awards", new BsonArray() }
          }
        }
      }
    },
    { "typeSets", new BsonArray
      {
        new BsonDocument
        {
          { "name", "moviesStringIndex" },
          { "types", new BsonArray
            {
              new BsonDocument { { "type", "autocomplete" } }
            }
          }
        }
      }
    }
  });

var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");