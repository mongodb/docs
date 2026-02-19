using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

public class Aggregation
{
    // Replace with your connection string
    private const string MongoConnectionString = "<YOUR_CONNECTION_STRING>";

    public static void Main(string[] args)
    {   
        var mongoClient = new MongoClient(MongoConnectionString);
        
        var database = mongoClient.GetDatabase("sample_restaurants");
        var collection = database.GetCollection<BsonDocument>("restaurants");

        // begin-aggregation
        // Defines the $match and $group aggregation stages
        var matchStage = new BsonDocument
        {
            {
                "$match",
                new BsonDocument
                {
                    { "cuisine", "Bakery" }
                }
            }
        };

        var groupStage = new BsonDocument
        {
            {
                "$group",
                new BsonDocument
                {
                    { "_id", "$borough" },
                    { "count", new BsonDocument("$sum", 1) }
                }
            }
        };

        // Executes the aggregation pipeline
        var pipeline = new[] { matchStage, groupStage };
        var results = collection.Aggregate<BsonDocument>(pipeline).ToList();

        // Prints the aggregated results
        foreach (BsonDocument result in results)
        {
            Console.WriteLine(result);
        }
        // end-aggregation
    }
}