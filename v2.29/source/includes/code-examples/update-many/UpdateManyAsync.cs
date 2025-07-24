// Asynchronously updates documents that match a query filter by using the C# driver

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace CSharpExamples.UsageExamples.UpdateMany;

public class UpdateManyAsync
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<connection string>";

    private const string OldCuisine = "Pizza";
    private const string NewCuisine = "Pasta and breadsticks";
    private const string CuisineField = "cuisine";

    public static async Task Main(string[] args)
    {
        try {
            Setup();

            // Prints extra space for console readability
            Console.WriteLine();

            // Finds the number of restaurants with a "cuisine" value of "Pizza"
            Console.WriteLine($"Restaurants with {CuisineField} \"{OldCuisine}\" found: {FindCountOfRestaurantsWithCuisine(OldCuisine)}");

            // Asynchronously updates many documents by using a helper method
            var asyncResult = await UpdateManyRestaurantsAsync();
            Console.WriteLine($"Restaurants modified by update: {asyncResult.ModifiedCount}");

            // Finds the number of restaurants with a "cuisine" value of "Pasta and breadsticks"
            Console.WriteLine($"Restaurants with {CuisineField} \"{NewCuisine}\" found after update: {FindCountOfRestaurantsWithCuisine(NewCuisine)}");

            // Resets the sample data
            Console.WriteLine("Resetting sample data...");
            ResetSampleData();
            Console.WriteLine("done.");
            
        // Prints a message if any exceptions occur during the operation    
        } catch (MongoException me) {
            Console.WriteLine("Unable to update due to an error: " + me);
        }        
    }

    private static async Task<UpdateResult> UpdateManyRestaurantsAsync()
    {
        // start-update-many-async
        const string oldValue = "Pizza";
        const string newValue = "Pasta and breadsticks";

        // Creates a filter for all documents with a "cuisine" value of "Pizza"
        var filter = Builders<Restaurant>.Filter
             .Eq(restaurant => restaurant.Cuisine, oldValue);

        // Creates instructions to update the "cuisine" field of documents that
        // match the filter
        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Cuisine, newValue);

        // Updates all documents that have a "cuisine" value of "Pizza"
        return await _restaurantsCollection.UpdateManyAsync(filter, update);
        // end-update-many-async
    }

    private static long FindCountOfRestaurantsWithCuisine(string cuisineValue)
    {
        var filter = Builders<Restaurant>.Filter
            .Eq(CuisineField, cuisineValue);

        return _restaurantsCollection.Find(filter).CountDocuments();
    }

    private static void Setup()
    {
        // Allows automapping of the camelCase database fields to models  
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // Establishes the connection to MongoDB and accesses the "sample_restaurants" collection
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

    public float? Score { get; set; }
}
