using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using static System.Console;

namespace CSharpExamples.UsageExamples;

public class FindOne
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private static string _mongoConnectionString = "<Your MongoDB URI>";

    public static void Main(string[] args)
    {
        Setup();

        // Find one document using builders
        WriteLine("Finding a document with builders...");
        FindOneRestaurantBuilder();

        // Extra space for console readability 
        WriteLine();

        // Find one document using LINQ
        WriteLine("Finding a document with LINQ...");
        FindOneRestaurantLINQ();
    }

    private static void FindOneRestaurantBuilder()
    {
        // start-find-builders
        var filter = Builders<Restaurant>.Filter
            .Eq("name", "Bagels N Buns");

        var restaurant = _restaurantsCollection.Find(filter).FirstOrDefault();
        // end-find-builders

        WriteLine(restaurant.ToBsonDocument());

    }

    private static void FindOneRestaurantLINQ()
    {
        // start-find-linq
        var query = _restaurantsCollection.AsQueryable()
            .Where(r => r.Name == "Bagels N Buns");
        // end-find-linq

        WriteLine(query.ToBsonDocument());

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
