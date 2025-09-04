using MongoDB.Bson;
using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Threading;
using System.Threading.Tasks;

namespace SearchMaterializedView
{
    class Program
    {
        static async Task Main(string[] args)
        {
            // Connect to MongoDB
            var client = new MongoClient("<connection-string>");
            var database = client.GetDatabase("sample_supplies");
            var sales = database.GetCollection<BsonDocument>("sales");
            var purchaseOrders = database.GetCollection<BsonDocument>("purchaseOrders");
            
            // Update immediately on startup
            await UpdateMonthlyPhoneTransactions(client, sales);
            await UpdateMonthlyPhoneTransactions(client, purchaseOrders);
            Console.WriteLine("Initial update completed. Materialized view is ready.");
            
            // Example of a simple scheduler that updates monthly
            int dayOfMonth = 1; // Update on the 1st of each month
            
            while (true)
            {
                DateTime now = DateTime.Now;
                
                if (now.Day == dayOfMonth && now.Hour == 0 && now.Minute == 0)
                {
                    // It's midnight on the 1st of the month - update the view
                    await UpdateMonthlyPhoneTransactions(client, sales);
                    await UpdateMonthlyPhoneTransactions(client, purchaseOrders);
                    Console.WriteLine($"Scheduled update completed at {now}");
                    
                    // Sleep for an hour to avoid multiple updates
                    Thread.Sleep(TimeSpan.FromHours(1));
                }
                else
                {
                    // Check again in a minute
                    Thread.Sleep(TimeSpan.FromMinutes(1));
                }
            }
        }
        
        static async Task UpdateMonthlyPhoneTransactions(MongoClient client, IMongoCollection<BsonDocument> collection)
        {
            // Create the aggregation pipeline
            var pipeline = new BsonDocument[]
            {
                new BsonDocument("$match", new BsonDocument("purchaseMethod", "Phone")),
                new BsonDocument("$unwind", new BsonDocument("path", "$items")),
                new BsonDocument("$group", new BsonDocument
                {
                    { "_id", new BsonDocument("$dateToString", new BsonDocument
                        {
                            { "format", "%Y-%m" },
                            { "date", "$saleDate" }
                        })
                    },
                    { "sales_quantity", new BsonDocument("$sum", "$items.quantity") },
                    { "sales_price", new BsonDocument("$sum", "$items.price") }
                }),
                new BsonDocument("$set", new BsonDocument("sales_price", new BsonDocument("$toDouble", "$sales_price"))),
                new BsonDocument("$merge", new BsonDocument
                {
                    { "into", "monthlyPhoneTransactions" },
                    { "whenMatched", "replace" }
                })
            };

            // Run the aggregation
            await collection.AggregateAsync<BsonDocument>(pipeline);
        }
    }
}
