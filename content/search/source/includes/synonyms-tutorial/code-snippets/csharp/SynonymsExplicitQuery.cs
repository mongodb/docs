using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        try
        {
            // Initialize the MongoDB C# driver
            var connectionString = "<connection-string>";
            var client = new MongoClient(connectionString);
            
            // Get a handle on the collection
            var database = client.GetDatabase("sample_mflix");
            var collection = database.GetCollection<BsonDocument>("movies");
            
            // Create pipeline stages
            var searchStage = new BsonDocument
            {
                { "$search", new BsonDocument
                    {
                        { "index", "default" },
                        { "text", new BsonDocument
                            {
                                { "path", "title" },
                                { "query", "boat" },
                                { "synonyms", "transportSynonyms" }
                            }
                        }
                    }
                }
            };
            
            var limitStage = new BsonDocument
            {
                { "$limit", 10 }
            };
            
            var projectStage = new BsonDocument
            {
                { "$project", new BsonDocument
                    {
                        { "title", 1 },
                        { "_id", 0 },
                        { "score", new BsonDocument
                            {
                                { "$meta", "searchScore" }
                            }
                        }
                    }
                }
            };
            
            // Create the aggregation pipeline
            var pipeline = new[] { searchStage, limitStage, projectStage };
            
            // Set options (max time 5 seconds = 5000 ms)
            var options = new AggregateOptions
            {
                MaxTime = TimeSpan.FromMilliseconds(5000)
            };
            
            // Execute the aggregation
            using (var cursor = await collection.AggregateAsync<BsonDocument>(pipeline, options))
            {
                // Display the results
                await cursor.ForEachAsync(doc => 
                {
                    Console.WriteLine(doc.ToJson());
                });
            }
        }
        catch (Exception e)
        {
            Console.Error.WriteLine($"Error: {e.Message}");
            Environment.Exit(1);
        }
    }
}
