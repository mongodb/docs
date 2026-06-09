using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;

namespace MongoDBAtlasSearch
{
    class Program
    {
        static async Task Main(string[] args)
        {
            // Replace with your MongoDB connection string
            string connectionString = "mongodb+srv://<username>:<password>@<cluster-url>/sample_mflix";
            var client = new MongoClient(connectionString);
            var database = client.GetDatabase("<databaseName>");
            
            // Create a MongoDB Search index on the objectId field
            var indexDefinition = new BsonDocument
            {
                { "createSearchIndexes", "<collectionName>" },
                { "indexes", new BsonArray
                    {
                        new BsonDocument
                        {
                            { "name", "<indexName>" },
                            { "definition", new BsonDocument
                                {
                                    { "mappings", new BsonDocument
                                        {
                                            { "dynamic", true | false },
                                            { "fields", new BsonDocument
                                                {
                                                    { "<fieldName>", new BsonDocument
                                                        {
                                                            { "type", "objectId" }
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
            };
            
            var result = await database.RunCommandAsync<BsonDocument>(indexDefinition);
            Console.WriteLine($"Index creation result: {result.ToJson()}");
        }
    }
}
