using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;

class Program
{
    public static async Task<int> Main(string[] args)
    {
        try
        {
            // Connection string to your MongoDB deployment
            var connectionString = "<connection-string>";

            // Create a MongoDB client
            var client = new MongoClient(connectionString);

            // Get a handle on the database and collection
            var database = client.GetDatabase("sample_mflix");
            var collection = database.GetCollection<BsonDocument>("movies");

            // Create the first text search clause for boat
            var text1 = new BsonDocument
            {
                { "text", new BsonDocument
                    {
                        { "path", "title" },
                        { "query", "boat" },
                        { "synonyms", "transportSynonyms" }
                    }
                }
            };

            // Create the second text search clause for hat
            var text2 = new BsonDocument
            {
                { "text", new BsonDocument
                    {
                        { "path", "title" },
                        { "query", "hat" },
                        { "synonyms", "attireSynonyms" }
                    }
                }
            };

            // Create the search stage with compound operator using should array
            var shouldArray = new BsonArray { text1, text2 };

            // Create the search stage
            var searchStage = new BsonDocument
            {
                { "$search", new BsonDocument
                    {
                        { "index", "default" },
                        { "compound", new BsonDocument
                            {
                                { "should", shouldArray }
                            }
                        }
                    }
                }
            };

            // Create the limit stage
            var limitStage = new BsonDocument
            {
                { "$limit", 10 }
            };

            // Create the project stage
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
                // Process and display the results
                await cursor.ForEachAsync(doc =>
                {
                    Console.WriteLine(doc.ToJson());
                });
            }

            return 0;
        }
        catch (Exception e)
        {
            Console.Error.WriteLine($"Error: {e.Message}");
            return 1;
        }
    }
}