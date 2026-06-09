using MongoDB.Bson;
using MongoDB.Driver;
using System;

public class CreateMaterializedView
{
    // Replace the placeholder with your Atlas connection string
    private const string uri = "<connectionString>";
    public static void Main(string[] args)
    {
        try
        {
            // Connect to your cluster
            var client = new MongoClient(uri);
            var database = client.GetDatabase("sample_airbnb");
            var collection = database.GetCollection<BsonDocument>("listingsAndReviews");

            // Defines the aggregation pipeline
            var pipeline = new BsonDocument[] 
            {
              new BsonDocument("$project", new BsonDocument
              {
                { "lastScrapedDate", new BsonDocument("$dateToString", new BsonDocument
                  {
                    { "format", "%Y-%m-%d" },
                    { "date", "$last_scraped" }
                  })
                },
                { "accommodatesNumber", new BsonDocument("$toString", "$accommodates") },
                { "maximumNumberOfNights", new BsonDocument("$toString", "$maximum_nights") },
                { "propertyName", "$name" },
                { "propertyType", "$property_type" }
              }),
              new BsonDocument("$merge", new BsonDocument
              { 
                { "into", "airbnb_mat_view" }, 
                { "whenMatched", "replace" } 
              })
            };

            // Executes the aggregation pipeline
            collection.Aggregate<BsonDocument>(pipeline);
            Console.WriteLine("Materialized view created!");
        }
        catch (Exception e)
        {
            Console.WriteLine($"Exception: {e.Message}");
        }
    }
}
