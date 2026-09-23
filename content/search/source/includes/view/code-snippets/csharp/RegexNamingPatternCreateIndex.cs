using MongoDB.Bson;
using MongoDB.Driver;

// Connect to your Atlas deployment
var uri = "<connectionString>";
var client = new MongoClient(uri);
var database = client.GetDatabase("sample_airbnb");
var collection = database.GetCollection<BsonDocument>(
    "listings_SearchableTypes");

// Define your MongoDB Search index
var index = new CreateSearchIndexModel(
  "listingsSearchableTypes", new BsonDocument
  {
    { "analyzer", "lucene.standard" },
    { "searchAnalyzer", "lucene.standard" },
    { "mappings", new BsonDocument
      {
        { "dynamic", false },
        { "fields", new BsonDocument
          {
            { "searchable_types", new BsonArray
              {
                new BsonDocument
                {
                  { "type", "document" },
                  { "dynamic", new BsonDocument
                    {
                      { "typeSet", "tokenTypeSet" }
                    }
                  }
                }
              }
            }
          }
        }
      }
    },
    { "typeSets", new BsonArray
      {
        new BsonDocument
        {
          { "name", "tokenTypeSet" },
          { "types", new BsonArray
            {
              new BsonDocument { { "type", "token" } }
            }
          }
        }
      }
    }
  });

// Create the index
var result = collection.SearchIndexes.CreateOne(index);
Console.WriteLine($"New index name: {result}");
