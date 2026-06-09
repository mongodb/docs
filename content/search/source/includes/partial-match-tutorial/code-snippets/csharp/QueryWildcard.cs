using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;

namespace MongoSearchExamples
{
    class QueryWildcard
    {
        // Connection URI for your Atlas deployment
        private static readonly string connectionUri = "<connection-string>";

        static async Task Main(string[] args)
        {
            var client = new MongoClient(connectionUri);
            
            try
            {
                // Set namespace
                var database = client.GetDatabase("sample_mflix");
                var collection = database.GetCollection<BsonDocument>("movies");

                // Define pipeline
                var pipeline = new BsonDocument[]
                {
                    new BsonDocument("$search", new BsonDocument
                    {
                        { "index", "partial-match-tutorial" },
                        { 
                            "wildcard", new BsonDocument
                            {
                                { "path", "title" },
                                { "query", "how*" },
                                { "allowAnalyzedField", true }
                            }
                        }
                    }),
                    new BsonDocument("$project", new BsonDocument
                    {
                        { "_id", 0 },
                        { "title", 1 }
                    })
                };

                // Run pipeline
                var result = collection.Aggregate<BsonDocument>(pipeline);
                
                // Print results
                await result.ForEachAsync(doc => Console.WriteLine(doc.ToJson()));
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }
}
