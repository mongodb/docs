using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace CSharpExamples.UsageExamples.FindMany;

public class FindMany
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<Your MongoDB URI>";

    public static void Main(string[] args)
    {
        Setup();

        // Find multiple documents using builders
        Console.WriteLine("Finding documents with builders...:");
        var restaurants = FindMultipleRestaurantsBuilderSync();
        Console.WriteLine($"Number of documents found: {restaurants.Count}");

        // Extra space for console readability 
        Console.WriteLine();

        // Find multiple documents using LINQ
        Console.WriteLine("Finding documents with LINQ...:");
        restaurants = FindMultipleRestaurantsLinqSync();
        Console.WriteLine($"Number of documents found: {restaurants.Count}");

        Console.WriteLine();

        // Find all restaurants
        Console.WriteLine("Finding all documents...:");
        restaurants = FindAllRestaurantsSync();
        Console.WriteLine($"Number of documents found: {restaurants.Count}");
    }

    public static List<Restaurant> FindMultipleRestaurantsBuilderSync()
    {
        // start-find-builders-sync
        var filter = Builders<Restaurant>.Filter
            .Eq("cuisine", "Pizza");

        return _restaurantsCollection.Find(filter).ToList();
        // end-find-builders-sync
    }

    public static List<Restaurant> FindMultipleRestaurantsLinqSync()
    {
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
        // This allows automapping of the camelCase database fields to our models. 
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // Establish the connection to MongoDB and get the restaurants database
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

    public float Score { get; set; }
}
