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
        var queryableCollection = collection.AsQueryable();

        // begin-aggregation
        // Defines the $match aggregation stage  
        var matchFilter = Builders<Restaurant>.Filter.Eq(r => r.Cuisine, "Bakery");

        // Defines the aggregation pipeline with the $match and $group aggregation stages
        var pipeline = new EmptyPipelineDefinition<Restaurant>()
            .Match(matchFilter)
            .Group(r => r.Borough,
                g => new
                    {
                        _id = g.Key,
                        Count = g.Count()
                    }
            );

        // Executes the aggregation pipeline
        var results = collection.Aggregate(pipeline).ToList();

        // Prints the aggregated results
        foreach (var result in results)
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

