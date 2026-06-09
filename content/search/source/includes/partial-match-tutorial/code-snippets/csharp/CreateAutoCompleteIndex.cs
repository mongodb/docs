using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Threading.Tasks;

namespace MongoSearchExamples
{
    class CreateAutoCompleteIndex
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

                // Define your MongoDB Search index
                var indexDefinition = new BsonDocument
                {
                    { "name", "partial-match-tutorial-autocomplete" },
                    { 
                        "definition", new BsonDocument
                        {
                            {
                                "mappings", new BsonDocument
                                {
                                    { "dynamic", false },
                                    {
                                        "fields", new BsonDocument
                                        {
                                            {
                                                "title", new BsonDocument
                                                {
                                                    { "type", "autocomplete" },
                                                    { "analyzer", "lucene.standard" },
                                                    { "tokenization", "edgeGram" },
                                                    { "minGrams", 3 },
                                                    { "maxGrams", 5 },
                                                    { "foldDiacritics", false }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                };

                // Create the search index
                var result = await collection.SearchIndexes.CreateOneAsync(indexDefinition);
                Console.WriteLine($"New index name: {result}");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
            }
        }
    }
}
