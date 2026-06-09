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

            // Create the first text search clause for automobile
            var text1 = new BsonDocument
            {
                { "text", new BsonDocument
                    {
                        { "path", "title" },
                        { "query", "automobile" },
                        { "synonyms", "transportSynonyms" }
                    }
                }
            };

            // Create the second text search clause for attire
            var text2 = new BsonDocument
            {
                { "text", new BsonDocument
                    {
                        { "path", "title" },
                        { "query", "attire" },
                        { "synonyms", "attireSynonyms" }
                    }
                }
            };

            // Create the should array for compound search
            var shouldArray = new BsonArray
            {
                text1,
                text2
            };

            // Create the search stage with compound operator
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

            // Create the limit and project stages
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
                // Process and display the results
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