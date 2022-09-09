using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using static System.Console;

namespace CSharpExamples.UsageExamples;

public class FindMany
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private static string _mongoConnectionString = "<Your MongoDB URI>";

    public static void Main(string[] args)
    {
        Setup();

        // Find multiple documents using builders
        WriteLine("Finding documents with builders...:");
        FindMultipleRestaurantsBuilderSync();

        // Extra space for console readability 
        WriteLine();

        // Find multiple documents using LINQ
        WriteLine("Finding documents with LINQ...:");
        FindMultipleRestaurantsLINQSync();

        WriteLine();

        // Find All restaurants
        WriteLine("Finding all documents...:");
        FindAllRestaurantsSync();
    }

    private static void FindMultipleRestaurantsBuilderSync()
    {
        // start-find-builders-sync
        var filter = Builders<Restaurant>.Filter
            .Eq("cuisine", "Pizza");

        var restaurants = _restaurantsCollection.Find(filter).ToList();
        // end-find-builders-sync

        WriteLine("Number of documents found: " + restaurants.Count);
    }

    private static void FindMultipleRestaurantsLINQSync()
    {
        // start-find-linq-sync
        var query = _restaurantsCollection.AsQueryable()
            .Where(r => r.Cuisine == "Pizza").ToList();
        // end-find-linq-sync

        WriteLine("Number of documents found: " + query.Count);
    }

    private static void FindAllRestaurantsSync()
    {
        // start-find-all-sync
        var restaurants = _restaurantsCollection.Find(new BsonDocument()).ToList();
        // end-find-all-sync
        WriteLine("Number of documents found: " + restaurants.Count);
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
