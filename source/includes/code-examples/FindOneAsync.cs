using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace CSharpExamples.UsageExamples;

public class FindOneAsync
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private static string _mongoConnectionString = "<Your MongoDB URI>";

    public static void Main(string[] args)
    {
        Setup();

        // Find one document using builders
        var buildersDocument = FindOneRestaurantBuilderAsync().Result.ToBsonDocument();
        Console.WriteLine("Finding a document with builders...");
        Console.WriteLine(buildersDocument);

        // Extra space for console readability
        Console.WriteLine();

        // Find one document using LINQ
        var linqDocument = FindOneRestaurantLINQAsync().Result.ToBsonDocument();
        Console.WriteLine("Finding a document with LINQ...");
        Console.WriteLine(linqDocument);
    }

    public static async Task<Restaurant> FindOneRestaurantBuilderAsync()
    {
        // start-find-builders
        var filter = Builders<Restaurant>.Filter
            .Eq("name", "Bagels N Buns");

        return await _restaurantsCollection.Find(filter).FirstAsync();
        // end-find-builders

    }

    public static async Task<Restaurant> FindOneRestaurantLINQAsync()
    {
        // start-find-linq
        return await _restaurantsCollection.AsQueryable()
            .Where(r => r.Name == "Bagels N Buns").FirstAsync();
        // end-find-linq

    }

    public static void Setup()
    {
        // This allows automapping of the camelCase database fields to our models. 
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // Establish the connection to MongoDB and get the restaurants database
        var uri = _mongoConnectionString;
        var mongoClient = new MongoClient(uri);
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
