using System;
using MongoDB.Driver;
using MongoDB.Bson;

namespace csharptest
{
    class Program
    {
        static void Main(string[] args)
        {
            var client = new MongoClient("mongodb://localhost:27017/test");
            var database = client.GetDatabase("test");
            var collection = database.GetCollection<BsonDocument>("inventory");

            // Insert some documents so there are documents to update and delete
            var documents = new[]
            {
                new BsonDocument
                {
                    { "item", "journal" },
                    { "qty", 25 },
                    { "size", new BsonDocument { { "h", 14 }, { "w", 21 }, { "uom", "cm" } } },
                    { "status", "A" }
                },
                new BsonDocument
                {
                    { "item", "notebook" },
                    { "qty", 50 },
                    { "size", new BsonDocument { { "h", 8.5 }, { "w", 11 }, { "uom", "in" } } },
                    { "status", "A" }
                },
                new BsonDocument
                {
                    { "item", "paper" },
                    { "qty", 100 },
                    { "size", new BsonDocument { { "h", 8.5 }, { "w", 11 }, { "uom", "in" } } },
                    { "status", "D" }
                },
                new BsonDocument
                {
                    { "item", "planner" },
                    { "qty", 75 },
                    { "size", new BsonDocument { { "h", 22.85 }, { "w", 30 }, { "uom", "cm" } } },
                    { "status", "D" }
                },
                new BsonDocument
                {
                    { "item", "postcard" },
                    { "qty", 45 },
                    { "size", new BsonDocument { { "h", 10 }, { "w", 15.25 }, { "uom", "cm" } } },
                    { "status", "A" } },
            };
            collection.InsertMany(documents);

            // Start UpdateOne example
            var filter = Builders<BsonDocument>.Filter.Eq("item", "paper");
            var update = Builders<BsonDocument>.Update.Set("size.uom", "cm").Set("status", "P").CurrentDate("lastModified");
            var updateResult = collection.UpdateOne(filter, update);
            Console.WriteLine("Number of documents modified: " + updateResult.ModifiedCount.ToString());
            // End UpdateOne example

            // Start UpdateMany example
            filter = Builders<BsonDocument>.Filter.Lt("qty", 50);
            update = Builders<BsonDocument>.Update.Set("size.uom", "in").Set("status", "P").CurrentDate("lastModified");
            updateResult = collection.UpdateMany(filter, update);
            Console.WriteLine("Number of documents modified: " + updateResult.ModifiedCount.ToString());
            // End UpdateMany example

            // Start DeleteOne example
            filter = Builders<BsonDocument>.Filter.Eq("status", "D");
            var deleteResult = collection.DeleteOne(filter);
            Console.WriteLine("Number of documents deleted: " + deleteResult.DeletedCount.ToString());
            // End DeleteOne example

            // Start DeleteMany example
            filter = Builders<BsonDocument>.Filter.Eq("status", "A");
            deleteResult = collection.DeleteMany(filter);
            Console.WriteLine("Number of documents deleted: " + deleteResult.DeletedCount.ToString());
            // End DeleteMany example
        }
    }
}