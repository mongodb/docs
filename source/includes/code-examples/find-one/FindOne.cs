// Retrieves a document that match a query filter by using the C# driver

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace CSharpExamples.UsageExamples.FindOne;

public class FindOne
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<connection string>";

    public static void Main(string[] args)
    {
        Setup();

        // Finds one document by using builders
        Console.WriteLine("Finding a document with builders...");
        FindOneRestaurantBuilder();

        // Prints extra space for console readability 
        Console.WriteLine();

        // Finds one document by using LINQ
        Console.WriteLine("Finding a document with LINQ...");
        FindOneRestaurantLinq();
    }

    private static void FindOneRestaurantBuilder()
    {
        // start-find-builders
        // Creates a filter for all documents that have a "name" value of "Bagels N Buns"
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Name, "Bagels N Buns");

        // Retrieves the first document that matches the filter
        var restaurant = _restaurantsCollection.Find(filter).FirstOrDefault();
        // end-find-builders

        Console.WriteLine(restaurant.ToBsonDocument());
    }

    private static void FindOneRestaurantLinq()
    {
        // start-find-linq
        var query = _restaurantsCollection.AsQueryable()
            .Where(r => r.Name == "Bagels N Buns").FirstOrDefault();
        // end-find-linq

        Console.WriteLine(query.ToBsonDocument());
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

    public float Score { get; set; }
}
