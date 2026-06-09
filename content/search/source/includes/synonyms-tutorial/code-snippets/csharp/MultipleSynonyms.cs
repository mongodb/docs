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
                
                var transportCollection = database.GetCollection<BsonDocument>("transport_synonyms");
                
                // Create and insert the first transport document - equivalent mapping
                var doc1 = new BsonDocument
                {
                    { "mappingType", "equivalent" },
                    { "synonyms", new BsonArray { "car", "vehicle", "automobile" } }
                };
                
                transportCollection.InsertOne(doc1);
                
                // Create and insert the second transport document - explicit mapping
                var doc2 = new BsonDocument
                {
                    { "mappingType", "explicit" },
                    { "input", new BsonArray { "boat" } },
                    { "synonyms", new BsonArray { "boat", "vessel", "sail" } }
                };
                
                transportCollection.InsertOne(doc2);
                
                // Create the attire_synonyms collection
                try
                {
                    database.CreateCollection("attire_synonyms");
                }
                catch (MongoCommandException ex)
                {
                    // Collection may already exist, which is fine
                    Console.WriteLine($"Note: {ex.Message}");
                }
                
                var attireCollection = database.GetCollection<BsonDocument>("attire_synonyms");
                
                // Create and insert the first attire document - equivalent mapping
                var doc3 = new BsonDocument
                {
                    { "mappingType", "equivalent" },
                    { "synonyms", new BsonArray { "dress", "apparel", "attire" } }
                };
                
                attireCollection.InsertOne(doc3);
                
                // Create and insert the second attire document - explicit mapping
                var doc4 = new BsonDocument
                {
                    { "mappingType", "explicit" },
                    { "input", new BsonArray { "hat" } },
                    { "synonyms", new BsonArray { "hat", "fedora", "headgear" } }
                };
                
                attireCollection.InsertOne(doc4);
                
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
