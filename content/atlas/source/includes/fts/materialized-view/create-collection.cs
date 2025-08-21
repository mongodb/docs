using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using System;
using System.Collections.Generic;

public class CreateCollection {
    static void Main(string[] args) {
        // Connect to your MongoDB deployment
        var mongoClient = new MongoClient("<connection-string>");
        
        // Define namespace
        var suppliesDatabase = mongoClient.GetDatabase("sample_supplies");
        var purchaseOrdersCollection = suppliesDatabase.GetCollection<BsonDocument>("purchaseOrders");
        
        // Create first document
        var purchaseOrder1 = new BsonDocument
        {
            { "saleDate", new BsonDateTime(new DateTime(2018, 1, 23, 21, 6, 49, 506)) },
            { "items", new BsonArray
                {
                    new BsonDocument
                    {
                        { "name", "printer paper" },
                        { "tags", new BsonArray { "office", "stationary" } },
                        { "price", 40.01 },
                        { "quantity", 2 }
                    },
                    new BsonDocument
                    {
                        { "name", "notepad" },
                        { "tags", new BsonArray { "office", "writing", "school" } },
                        { "price", 35.29 },
                        { "quantity", 2 }
                    },
                    new BsonDocument
                    {
                        { "name", "pens" },
                        { "tags", new BsonArray { "writing", "office", "school", "stationary" } },
                        { "price", 56.12 },
                        { "quantity", 5 }
                    },
                    new BsonDocument
                    {
                        { "name", "backpack" },
                        { "tags", new BsonArray { "school", "travel", "kids" } },
                        { "price", 77.71 },
                        { "quantity", 2 }
                    },
                    new BsonDocument
                    {
                        { "name", "notepad" },
                        { "tags", new BsonArray { "office", "writing", "school" } },
                        { "price", 18.47 },
                        { "quantity", 2 }
                    },
                    new BsonDocument
                    {
                        { "name", "envelopes" },
                        { "tags", new BsonArray { "stationary", "office", "general" } },
                        { "price", 19.95 },
                        { "quantity", 8 }
                    },
                    new BsonDocument
                    {
                        { "name", "envelopes" },
                        { "tags", new BsonArray { "stationary", "office", "general" } },
                        { "price", 8.08 },
                        { "quantity", 3 }
                    },
                    new BsonDocument
                    {
                        { "name", "binder" },
                        { "tags", new BsonArray { "school", "general", "organization" } },
                        { "price", 14.16 },
                        { "quantity", 3 }
                    }
                }
            },
            { "storeLocation", "Denver" },
            { "customer", new BsonDocument
                {
                    { "gender", "M" },
                    { "age", 42 },
                    { "email", "cauho@witwuta.sv" },
                    { "satisfaction", 4 }
                }
            },
            { "couponUsed", true },
            { "purchaseMethod", "Phone" }
        };
        
        // Create second document
        var purchaseOrder2 = new BsonDocument
        {
            { "saleDate", new BsonDateTime(new DateTime(2018, 1, 25, 10, 1, 2, 918)) },
            { "items", new BsonArray
                {
                    new BsonDocument
                    {
                        { "name", "envelopes" },
                        { "tags", new BsonArray { "stationary", "office", "general" } },
                        { "price", 8.05 },
                        { "quantity", 10 }
                    },
                    new BsonDocument
                    {
                        { "name", "binder" },
                        { "tags", new BsonArray { "school", "general", "organization" } },
                        { "price", 28.31 },
                        { "quantity", 9 }
                    },
                    new BsonDocument
                    {
                        { "name", "notepad" },
                        { "tags", new BsonArray { "office", "writing", "school" } },
                        { "price", 20.95 },
                        { "quantity", 3 }
                    },
                    new BsonDocument
                    {
                        { "name", "laptop" },
                        { "tags", new BsonArray { "electronics", "school", "office" } },
                        { "price", 866.5 },
                        { "quantity", 4 }
                    },
                    new BsonDocument
                    {
                        { "name", "notepad" },
                        { "tags", new BsonArray { "office", "writing", "school" } },
                        { "price", 33.09 },
                        { "quantity", 4 }
                    },
                    new BsonDocument
                    {
                        { "name", "printer paper" },
                        { "tags", new BsonArray { "office", "stationary" } },
                        { "price", 37.55 },
                        { "quantity", 1 }
                    },
                    new BsonDocument
                    {
                        { "name", "backpack" },
                        { "tags", new BsonArray { "school", "travel", "kids" } },
                        { "price", 83.28 },
                        { "quantity", 2 }
                    },
                    new BsonDocument
                    {
                        { "name", "pens" },
                        { "tags", new BsonArray { "writing", "office", "school", "stationary" } },
                        { "price", 42.9 },
                        { "quantity", 4 }
                    },
                    new BsonDocument
                    {
                        { "name", "envelopes" },
                        { "tags", new BsonArray { "stationary", "office", "general" } },
                        { "price", 16.68 },
                        { "quantity", 2 }
                    }
                }
            },
            { "storeLocation", "Seattle" },
            { "customer", new BsonDocument
                {
                    { "gender", "M" },
                    { "age", 50 },
                    { "email", "keecade@hem.uy" },
                    { "satisfaction", 5 }
                }
            },
            { "couponUsed", false },
            { "purchaseMethod", "Phone" }
        };
        
        // Insert the documents
        purchaseOrdersCollection.InsertOne(purchaseOrder1);
        purchaseOrdersCollection.InsertOne(purchaseOrder2);
        
        Console.WriteLine("Successfully inserted purchase order documents.");
        
        // Query the new collection
        var sort = Builders<BsonDocument>.Sort.Descending("saleDate");
        var findOptions = new FindOptions<BsonDocument> { Sort = sort };
        
        var results = purchaseOrdersCollection.Find(new BsonDocument()).Sort(sort).ToList();
        
        Console.WriteLine("\nQuery results:");
        foreach (var doc in results)
        {
            Console.WriteLine(doc.ToJson());
        }
    }
}
