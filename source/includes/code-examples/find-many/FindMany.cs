// Retrieves documents that match a query filter by using the C# driver

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace CSharpExamples.UsageExamples.FindMany;

public class FindMany
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<connection string>";

    public static void Main(string[] args)
    {
        Setup();

        // Finds multiple documents by using builders
        Console.WriteLine("Finding documents with builders...:");
        var restaurants = FindMultipleRestaurantsBuilderSync();
        Console.WriteLine($"Number of documents found: {restaurants.Count}");

        // Prints extra space for console readability 
        Console.WriteLine();

        // Retrieves multiple documents by using LINQ
        Console.WriteLine("Finding documents with LINQ...:");
        restaurants = FindMultipleRestaurantsLinqSync();
        Console.WriteLine($"Number of documents found: {restaurants.Count}");

        Console.WriteLine();

        // Retrieves all documents in the "restaurants" collection
        Console.WriteLine("Finding all documents...:");
        restaurants = FindAllRestaurantsSync();
        Console.WriteLine($"Number of documents found: {restaurants.Count}");
    }

    public static List<Restaurant> FindMultipleRestaurantsBuilderSync()
    {
        // start-find-builders-sync
        // Creates a filter for all documents that have a "cuisine" value of "Pizza"
        var filter = Builders<Restaurant>.Filter
            .Eq("cuisine", "Pizza");

        // Retrieves all documents that match the filter
        return _restaurantsCollection.Find(filter).ToList();
        // end-find-builders-sync
    }

    public static List<Restaurant> FindMultipleRestaurantsLinqSync()
    {
        // Retrieves all documents with a "cuisine" value of "Pizza" by using a LINQ query
        // start-find-linq-sync
        return _restaurantsCollection.AsQueryable()
            .Where(r => r.Cuisine == "Pizza").ToList();
        // end-find-linq-sync
    }

    private static List<Restaurant> FindAllRestaurantsSync()
    {
        // start-find-all-sync
        var filter = Builders<Restaurant>.Filter.Empty;

        return _restaurantsCollection.Find(filter)
            .ToList();
        // end-find-all-sync
    }

    private static void Setup()
    {
        // Allows automapping of the camelCase database fields to models 
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // Establishes the connection to MongoDB and accesses the "restaurants" collection
        var mongoClient = new MongoClient(MongoConnectionString);
        var restaurantsDatabase = mongoClient.GetDatabase("sample_restaurants");
        _restaurantsCollection = restaurantsDatabase.GetCollection<Restaurant>("restaurants");
    }
}

public class Restaurant
{
    public ObjectId Id { get; set; }

    public string Name { get; set; }

    [BsonElement("restaurant_id")]
    public string RestaurantId { get; set; }

    public string Cuisine { get; set; }

    public Address Address { get; set; }

    public string Borough { get; set; }

    public List<GradeEntry> Grades { get; set; }
}

public class Address
{
    public string Building { get; set; }

    [BsonElement("coord")]
    public double[] Coordinates { get; set; }

    public string Street { get; set; }

    [BsonElement("zipcode")]
    public string ZipCode { get; set; }
}

public class GradeEntry
{
    public DateTime Date { get; set; }

    public string Grade { get; set; }

    public float? Score { get; set; }
}
