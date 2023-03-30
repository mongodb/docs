using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace CSharpExamples.UsageExamples.InsertMany;

public class InsertMany
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<Your MongoDB URI>";

    public static void Main(string[] args)
    {
        Setup();

        // Attempt to find document before insert
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Name, "Mongo's Pizza");

        var foundRestaurants = _restaurantsCollection.Find(filter).ToList();

        Console.WriteLine($"Number of restaurants found before insert: {foundRestaurants.Count}");

        // Extra space for console readability
        Console.WriteLine();

        Console.WriteLine("Inserting documents...");
        InsertManyRestaurants();

        // Find and print newly inserted document
        foundRestaurants = _restaurantsCollection.Find(filter).ToList();

        Console.WriteLine($"Number of restaurants inserted: {foundRestaurants.Count}");

        Cleanup();
    }

    private static void InsertManyRestaurants()
    {
        // Delete sample document if already exists
        Cleanup();

        // start-insert-many
        // Helper method to generate 5 new restaurants
        var restaurants = GenerateDocuments();

        _restaurantsCollection.InsertMany(restaurants);
        // end-insert-many
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

    private static List<Restaurant> GenerateDocuments()
    {
        // Generate 5 new restaurant documents
        var restaurantsList = new List<Restaurant>();
        for (int i = 1; i <= 5; i++)
        {
            Restaurant newRestaurant = new()
            {
                Name = "Mongo's Pizza",
                RestaurantId = $"12345-{i}",
                Cuisine = "Pizza",
                Address = new BsonDocument
                {
                    {"street", "Pizza St"},
                    {"zipcode", "10003"}
                },
                Borough = "Manhattan",
            };

            restaurantsList.Add(newRestaurant);
        }

        return restaurantsList;
    }

    private static void Cleanup()
    {
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Name, "Mongo's Pizza");

        _restaurantsCollection.DeleteMany(filter);
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
