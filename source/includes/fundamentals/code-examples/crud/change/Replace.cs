using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace CSharpExamples.Fundamentals.ReplaceOne;

public class ReplaceOne
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<Your MongoDB URI>";

    public static void Main(string[] args)
    {
        Setup();

        // Create filter 
        var filter = Builders<Restaurant>.Filter.Eq(restaurant => restaurant.Name, "Pizza Town");

        // Find restaurant named "Pizza Town"
        var oldRestaurant = _restaurantsCollection.Find(filter).First();
        Console.WriteLine($"Restaurant with ID {oldRestaurant.Id} before replacement: {oldRestaurant.Name}");

        // Replace one document synchronously
        var syncResult = ReplaceOneRestaurant();
        Console.WriteLine($"Restaurants modified by replacement: {syncResult.ModifiedCount}");

        var firstPizzaRestaurant = _restaurantsCollection.Find(filter).First();
        Console.WriteLine($"Restaurant with id {oldRestaurant.Id} after replacement: {firstPizzaRestaurant.Name}");

        Console.WriteLine("Resetting sample data...");
        _restaurantsCollection.ReplaceOneAsync(filter, oldRestaurant);
        Console.WriteLine("Done");
    }

    private static ReplaceOneResult ReplaceOneRestaurant()
    {
        // start-parameters
        var filter = Builders<Restaurant>.Filter.Eq(restaurant => restaurant.Name, "Pizza Town");

        Restaurant newRestaurant = new()
        {
            Name = "Food World",
            Cuisine = "American",
            Address = new BsonDocument
            {
                {"street", "Food St"},
                {"zipcode", "10003"},
            },
            Borough = "Manhattan",
        };
        // end-parameters

        var options = new ReplaceOptions()
        {
            Comment = new BsonString("Restaurant replaced for {+driver-short+} Fundamentals"),
            IsUpsert = true
        };

        Console.WriteLine("Replacing document...");
        var result = _restaurantsCollection.ReplaceOne(filter, newRestaurant, options);

        Console.WriteLine($"Replaced documents: {result.ModifiedCount}");
        Console.WriteLine($"Result acknowledged? {result.IsAcknowledged}");

        return _restaurantsCollection.ReplaceOne(filter, newRestaurant);
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