using System;
using MongoDB.Bson;
using MongoDB.Driver;

namespace csharptest
{
    class Program
    {
        static void Main(string[] args)
        {
            var client = new MongoClient("mongodb://testuser:<PASSWORD>@localhost:27017/test?authSource=admin");
            var database = client.GetDatabase("test");
            var collection = database.GetCollection<BsonDocument>("inventory");
            var document = new BsonDocument
                  {
                   { "item", "canvas" },
                   { "qty", 100 },
                   { "tags", new BsonArray { "cotton" } },
                   { "size", new BsonDocument { { "h", 28 }, { "w", 35.5 }, { "uom", "cm" } } }
            };
            collection.InsertOne(document);

            var filter = Builders<BsonDocument>.Filter.Empty;
            var result = collection.Find(filter).ToList();
            foreach (var doc in result)
            {
                Console.WriteLine(doc.ToJson());
            }

            filter = Builders<BsonDocument>.Filter.Empty;
            result = collection.Find(filter).ToList();
            foreach (var doc in result)
            {
                Console.WriteLine(doc.ToJson());
            }

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

            filter = Builders<BsonDocument>.Filter.Eq("status", "D");
            result = collection.Find(filter).ToList();

            foreach (var doc in result)
            {
                Console.WriteLine(doc.ToJson());
            }
            filter = Builders<BsonDocument>.Filter.Eq("size", new BsonDocument { { "h", 14 }, { "w", 21 }, { "uom", "cm" } });
            result = collection.Find(filter).ToList();

            foreach (var doc in result)
            {
                Console.WriteLine(doc.ToJson());
            }

            filter = Builders<BsonDocument>.Filter.Eq("size.uom", "in");
            result = collection.Find(filter).ToList();
            foreach (var doc in result)
            {
                Console.WriteLine(doc.ToJson());
            }
            filter = Builders<BsonDocument>.Filter.Lt("size.h", 15);
            result = collection.Find(filter).ToList();
            foreach (var doc in result)
            {
                Console.WriteLine(doc.ToJson());
            }

            var builder = Builders<BsonDocument>.Filter;
            filter = builder.Or(builder.Eq("status", "A"), builder.Lt("qty", 30));
            result = collection.Find(filter).ToList();

            foreach (var doc in result) {
                Console.WriteLine(doc.ToJson());
            }

            builder = Builders<BsonDocument>.Filter;
            filter = builder.And(builder.Eq("status", "A"), builder.Lt("qty", 30));
            result = collection.Find(filter).ToList();
            foreach (var doc in result)
            {
                Console.WriteLine(doc.ToJson());
            }
            builder = Builders<BsonDocument>.Filter;
            filter = builder.And(
                 builder.Eq("status", "A"),
                 builder.Or(builder.Lt("qty", 30), builder.Regex("item", new BsonRegularExpression("^p"))));

            result = collection.Find(filter).ToList();

            foreach (var doc in result)
            {
                Console.WriteLine(doc.ToJson());
            }
        }
    }
}
