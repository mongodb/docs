using MongoDB.Bson;
using MongoDB.Driver;

// connect to your Atlas deployment
var uri = "<connection-string>";

var client = new MongoClient(uri);

var db = client.GetDatabase("sample_mflix");
var collection = db.GetCollection<BsonDocument>("movies");

// define your Atlas Search index
var index =  new CreateSearchIndexModel(
  "embedded-documents-tutorial", new BsonDocument
  {
    { "mappings", new BsonDocument
      {
        { "dynamic", true },
        { "fields", new BsonDocument
          {
            { "clubs", new BsonDocument
              {
                { "dynamic", true },
                { "fields", new BsonDocument
                  {
                    { "sports", new BsonDocument
                      {
                        { "dynamic", true },
                        { "type", "embeddedDocuments" }
                      }
                    }
                  }
                },
                { "type", "document" }
              }
            },
            { "teachers", new BsonArray
              {
                new BsonDocument
                {
                  { "dynamic", true },
                  { "fields", new BsonDocument
                    {
                      { "classes", new BsonDocument
                        {
                          { "dynamic", true },
                          { "type", "embeddedDocuments" }
                        }
                      }
                    }
                  },
                  { "type", "embeddedDocuments" }
                },
                new BsonDocument
                {
                  { "dynamic", true },
                  { "fields", new BsonDocument
                    {
                      { "classes", new BsonDocument
                        {
                          { "dynamic", true },
                          { "fields", new BsonDocument
                            {
                              { "grade", new BsonDocument
                                {
                                  { "type", "token" }
                                }
                              }
                            }
                          },
                          { "type", "document" }
                        }
                      }
                    }
                  },
                  { "type", "document" }
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