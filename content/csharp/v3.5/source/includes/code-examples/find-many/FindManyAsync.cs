// Asynchronously retrieves documents that match a query filter by using the C# driver

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace CSharpExamples.UsageExamples.FindMany;

public class FindManyAsync
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<connection string>";

    public static async Task Main(string[] args)
    {
        try {
            Setup();

            // Finds multiple documents by using builders
            Console.WriteLine("Finding documents with builders...:");
            var restaurantsBuilders = await FindMultipleRestaurantsBuilderAsync();
            Console.WriteLine($"Number of documents found: {restaurantsBuilders.Count}");

            // Prints extra space for console readability 
            Console.WriteLine();

            // Retrieves multiple documents by using LINQ
            Console.WriteLine("Finding documents with LINQ...:");
            var restaurantsLinq = await FindMultipleRestaurantsLinqAsync();
            Console.WriteLine($"Number of documents found: {restaurantsLinq.Count}");

            Console.WriteLine();

            // Retrieves all documents in the "restaurants" collection
            Console.WriteLine("Finding all documents...:");
            var allRestaurants = await FindAllRestaurantsAsync();
            Console.WriteLine($"Number of documents found: {allRestaurants.Count}");

        // Prints a message if any exceptions occur during the operation    
        } catch (MongoException me) {
            Console.WriteLine("Unable to find due to an error: " + me);
        }
    }

    private static async Task<List<Restaurant>> FindMultipleRestaurantsBuilderAsync()
    {
        // start-find-builders-async
        // Creates a filter for all documents that have a "cuisine" value of "Pizza"
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Cuisine, "Pizza");

        // Asynchronously retrieves all documents that match the filter
        return await _restaurantsCollection.Find(filter).ToListAsync();
        // end-find-builders-async
    }

    private static async Task<List<Restaurant>> FindMultipleRestaurantsLinqAsync()
    {
        // Asynchronously retrieves all documents with a "cuisine" value of "Pizza" by using a LINQ query
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
