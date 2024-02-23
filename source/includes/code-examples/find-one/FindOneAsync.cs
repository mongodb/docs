// Asynchronously retrieves a document that match a query filter by using the C# driver

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace CSharpExamples.UsageExamples.FindOne;

public class FindOneAsync
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<connection string>";

    public static async Task Main(string[] args)
    {
        Setup();

        // Finds one document by using builders
        var buildersDocument = await FindOneRestaurantBuilderAsync();
        Console.WriteLine("Finding a document with builders...");
        Console.WriteLine(buildersDocument.ToBsonDocument());

        // Prints extra space for console readability
        Console.WriteLine();

        // Finds one document by using LINQ
        var linqDocument = await FindOneRestaurantLinqAsync();
        Console.WriteLine("Finding a document with LINQ...");
        Console.WriteLine(linqDocument.ToBsonDocument());
    }

    private static async Task<Restaurant> FindOneRestaurantBuilderAsync()
    {
        // start-find-builders
        // Creates a filter for all documents that have a "name" value of "Bagels N Buns"
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Name, "Bagels N Buns");

        // Asynchronously retrieves the first document that matches the filter
        return await _restaurantsCollection.Find(filter).FirstOrDefaultAsync();
        // end-find-builders
    }

    private static async Task<Restaurant> FindOneRestaurantLinqAsync()
    {
        // start-find-linq
        return await _restaurantsCollection.AsQueryable()
            .Where(r => r.Name == "Bagels N Buns").FirstOrDefaultAsync();
        // end-find-linq
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
