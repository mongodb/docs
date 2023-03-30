using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace CSharpExamples.UsageExamples.UpdateMany;

public class UpdateMany
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<Your MongoDB URI>";

    private const string OldCuisine = "Pizza";
    private const string NewCuisine = "Pasta and breadsticks";
    private const string CuisineField = "cuisine";

    public static void Main(string[] args)
    {
        Setup();

        // Extra space for console readability 
        Console.WriteLine();

        // Number of restaurants with old cuisine
        Console.WriteLine($"Restaurants with {CuisineField} \"{OldCuisine}\" found: {FindCountOfRestaurantsWithCuisine(OldCuisine)}");

        // Update many documents synchronously
        var syncResult = UpdateManyRestaurants();
        Console.WriteLine($"Restaurants modified by update: {syncResult.ModifiedCount}");

        // Number of restaurants with new cuisine
        Console.WriteLine($"Restaurants with {CuisineField} \"{NewCuisine}\" found after update: {FindCountOfRestaurantsWithCuisine(NewCuisine)}");

        // Reset sample data
        Console.WriteLine("Resetting sample data...");
        ResetSampleData();
        Console.WriteLine("done.");
    }

    private static UpdateResult UpdateManyRestaurants()
    {
        // start-update-many
        const string oldValue = "Pizza";
        const string newValue = "Pasta and breadsticks";

        var filter = Builders<Restaurant>.Filter
            .Eq(restaurant => restaurant.Cuisine, oldValue);

        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Cuisine, newValue);

        return _restaurantsCollection.UpdateMany(filter, update);
        // end-update-many
    }

    private static long FindCountOfRestaurantsWithCuisine(string cuisineValue)
    {
        var filter = Builders<Restaurant>.Filter
            .Eq(CuisineField, cuisineValue);

        return _restaurantsCollection.Find(filter).CountDocuments();
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

    private static void ResetSampleData()
    {
        var filter = Builders<Restaurant>.Filter
            .Eq(CuisineField, NewCuisine);

        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Cuisine, OldCuisine);

        _restaurantsCollection.UpdateMany(filter, update);
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
