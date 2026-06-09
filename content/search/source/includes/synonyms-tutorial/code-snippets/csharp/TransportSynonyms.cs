using System;
using MongoDB.Bson;
using MongoDB.Driver;

namespace SynonymsTutorial
{
    class Program
    {
        static void Main(string[] args)
        {
            try
            {
                // Connection string to your MongoDB cluster
                string connectionString = "<connection-string>";
                
                // Create a MongoDB client
                var client = new MongoClient(connectionString);
                
                // Get the sample_mflix database
                var database = client.GetDatabase("sample_mflix");
                
                // Create the transport_synonyms collection
                try
                {
                    database.CreateCollection("transport_synonyms");
                }
                catch (MongoCommandException ex)
                {
                    // Collection may already exist, which is fine
                    Console.WriteLine($"Note: {ex.Message}");
                }
                
                var collection = database.GetCollection<BsonDocument>("transport_synonyms");
                
                // Create and insert the first document - equivalent mapping
                var doc1 = new BsonDocument
                {
                    { "mappingType", "equivalent" },
                    { "synonyms", new BsonArray { "car", "vehicle", "automobile" } }
                };
                
                collection.InsertOne(doc1);
                
                // Create and insert the second document - explicit mapping
                var doc2 = new BsonDocument
                {
                    { "mappingType", "explicit" },
                    { "input", new BsonArray { "boat" } },
                    { "synonyms", new BsonArray { "boat", "vessel", "sail" } }
                };
                
                collection.InsertOne(doc2);
                
                Console.WriteLine("Synonyms collections successfully created and populated.");
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error: {ex.Message}");
                Environment.Exit(1);
            }
        }
    }
}
