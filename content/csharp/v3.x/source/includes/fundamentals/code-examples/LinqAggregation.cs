using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

public class Aggregation
{
    // Replace with your connection string
    private const string MongoConnectionString = "<YOUR_CONNECTION_STRING>";

    public static void Main(string[] args)
    {   
        var mongoClient = new MongoClient(MongoConnectionString);

        var database = mongoClient.GetDatabase("sample_restaurants");
        var collection = database.GetCollection<Restaurant>("restaurants");

        // begin-aggregation
        // Defines a queryable collection object as a prerequisite to using LINQ
        var queryableCollection = collection.AsQueryable();

        // Defines the query with $match and $group stages
        var query = queryableCollection
            .Where(r => r.Cuisine == "Bakery")
            .GroupBy(r => r.Borough)
            .Select(g => new { _id = g.Key, Count = g.Count() });

        // Executes the query and prints the aggregated results
        foreach (var result in query.ToList())
        {
            Console.WriteLine(result);
        }
        // end-aggregation
    }

    public class Restaurant
    {
        [BsonElement("borough")]
        public string Borough { get; set; }

        [BsonElement("cuisine")]
        public string Cuisine { get; set; }
    }
}