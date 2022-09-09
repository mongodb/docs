using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Linq;
using static System.Console;

namespace CSharpExamples.UsageExamples;

public class FindManyAsync
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private static string _mongoConnectionString = "<Your MongoDB URI>";

    public static void Main(string[] args)
    {
        Setup();

        // Find multiple documents using builders
        WriteLine("Finding documents with builders...:");
        var restaurantsBuilders = FindMultipleRestaurantsBuilderAsync();
        WriteLine("Number of documents found: " + restaurantsBuilders.Result.Count);

        // Extra space for console readability 
        WriteLine();

        // Find multiple documents using LINQ
        WriteLine("Finding documents with LINQ...:");
        var restaurantsLINQ = FindMultipleRestaurantsLINQAsync();
        WriteLine("Number of documents found: " + restaurantsLINQ.Result.Count);

        WriteLine();

        // Find all documents
        WriteLine("Finding all documents...:");
        var allRestaurants = FindAllRestaurantsAsync();
        WriteLine("Number of documents found: " + allRestaurants.Result.Count);
    }

    private static async Task<List<Restaurant>> FindMultipleRestaurantsBuilderAsync()
    {
        // start-find-builders-async
        var filter = Builders<Restaurant>.Filter
            .Eq("cuisine", "Pizza");

        return await _restaurantsCollection.Find(filter).ToListAsync();
        // end-find-builders-async
    }

    private static async Task<List<Restaurant>> FindMultipleRestaurantsLINQAsync()
    {
        // start-find-linq-async
        return await _restaurantsCollection.AsQueryable()
            .Where(r => r.Cuisine == "Pizza").ToListAsync();
        // end-find-linq-async

    }

    private static async Task<List<Restaurant>> FindAllRestaurantsAsync()
    {
        // start-find-all-async
        return await _restaurantsCollection.Find(new BsonDocument()).ToListAsync();
        // end-find-all-async
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
