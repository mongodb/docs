using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace CSharpExamples.UsageExamples.ReplaceOne;

public class ReplaceOneAsync
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<connection string>";

    public static async Task Main(string[] args)
    {
        Setup();

        // Create filter 
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Cuisine, "Pizza");

        // Find first pizza restaurant
        var oldPizzaRestaurant = _restaurantsCollection.Find(filter).First();
        Console.WriteLine($"First pizza restaurant before replacement: {oldPizzaRestaurant.Name}");

        // Replace one document asynchronously
        var asyncResult = await ReplaceOneRestaurant();
        Console.WriteLine($"Restaurants modified by replacement: {asyncResult.ModifiedCount}");

        var firstPizzaRestaurant = _restaurantsCollection.Find(filter).First();
        Console.WriteLine($"First pizza restaurant after replacement: {firstPizzaRestaurant.Name}");

        Console.WriteLine("Resetting sample data...");
        await _restaurantsCollection.ReplaceOneAsync(filter, oldPizzaRestaurant);
        Console.WriteLine("done.");
    }

    private static async Task<ReplaceOneResult> ReplaceOneRestaurant()
    {
        // start-replace-one-async
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Cuisine, "Pizza");

        // Find ID of first pizza restaurant
        var oldPizzaRestaurant = _restaurantsCollection.Find(filter).First();
        var oldId = oldPizzaRestaurant.Id;

        Restaurant newPizzaRestaurant = new()
        {
            Id = oldId,
            Name = "Mongo's Pizza",
            Cuisine = "Pizza",
            Address = new BsonDocument
            {
                {"street", "Pizza St"},
                {"zipcode", "10003"}
            },
            Borough = "Manhattan",
        };

        return await _restaurantsCollection.ReplaceOneAsync(filter, newPizzaRestaurant);
        // end-replace-one-async
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
