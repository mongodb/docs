using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using static System.Console;

namespace TestRun.Fundamentals;

public class Delete
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private static string _mongoConnectionString = "<Your MongoDB URI>";
    
    public static void Main(string[] args)
    {
        Setup();
        
        var filter = Builders<Restaurant>.Filter
            .Regex("address.street", "Pearl Street");

        DeleteOptions opts = new DeleteOptions { Hint = "borough_1" };

        WriteLine("Deleting documents...");
        var result = _restaurantsCollection.DeleteMany(filter, opts);

        WriteLine($"Deleted documents: {result.DeletedCount}");
        WriteLine($"Result acknowledged? {result.IsAcknowledged}");
    }
    private static void Setup()
    {
        // This allows automapping of the camelCase database fields to our models. 
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // Establish the connection to MongoDB and get the restaurants database
        var mongoClient = new MongoClient(_mongoConnectionString);
        var restaurantsDatabase = mongoClient.GetDatabase("sample_restaurants");
        _restaurantsCollection = restaurantsDatabase.GetCollection<Restaurant>("restaurants");
    }
}

// start-model
public class Restaurant
{
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    
    [BsonElement("restaurant_id")]
    public string RestaurantId { get; set; }    
    public string Cuisine { get; set; }
    public object Address { get; set; }
    public string Borough { get; set; }
    public List<object> Grades { get; set; }
}
// end-model