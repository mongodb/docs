using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace CSharpExamples.UsageExamples.FindMany;

public class FindManyAsync
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<connection string>";

    public static async Task Main(string[] args)
    {
        Setup();

        // Find multiple documents using builders
        Console.WriteLine("Finding documents with builders...:");
        var restaurantsBuilders = await FindMultipleRestaurantsBuilderAsync();
        Console.WriteLine($"Number of documents found: {restaurantsBuilders.Count}");

        // Extra space for console readability 
        Console.WriteLine();

        // Find multiple documents using LINQ
        Console.WriteLine("Finding documents with LINQ...:");
        var restaurantsLinq = await FindMultipleRestaurantsLinqAsync();
        Console.WriteLine($"Number of documents found: {restaurantsLinq.Count}");

        Console.WriteLine();

        // Find all documents
        Console.WriteLine("Finding all documents...:");
        var allRestaurants = await FindAllRestaurantsAsync();
        Console.WriteLine($"Number of documents found: {allRestaurants.Count}");
    }

    private static async Task<List<Restaurant>> FindMultipleRestaurantsBuilderAsync()
    {
        // start-find-builders-async
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Cuisine, "Pizza");

        return await _restaurantsCollection.Find(filter).ToListAsync();
        // end-find-builders-async
    }

    private static async Task<List<Restaurant>> FindMultipleRestaurantsLinqAsync()
    {
        // start-find-linq-async
        return await _restaurantsCollection.AsQueryable()
            .Where(r => r.Cuisine == "Pizza").ToListAsync();
        // end-find-linq-async
    }

    private static async Task<List<Restaurant>> FindAllRestaurantsAsync()
    {
        // start-find-all-async
        var filter = Builders<Restaurant>.Filter.Empty;

        return await _restaurantsCollection.Find(filter)
            .ToListAsync();
        // end-find-all-async
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
