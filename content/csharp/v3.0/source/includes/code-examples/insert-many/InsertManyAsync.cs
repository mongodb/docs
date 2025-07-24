// Asynchronously inserts sample documents describing restaurants by using the C# driver

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace CSharpExamples.UsageExamples.InsertMany;

public class InsertManyAsync
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<connection string>";

    public static async Task Main(string[] args)
    {
        try {
            Setup();

            // Creates a filter for all documents that have a "name" value of "Mongo's Pizza"
            var filter = Builders<Restaurant>.Filter
                .Eq(r => r.Name, "Mongo's Pizza");

            // Finds all documents that match the filter
            var foundRestaurants = _restaurantsCollection.Find(filter).ToList();

            // Prints the number of documents found
            Console.WriteLine($"Number of restaurants found before insert: {foundRestaurants.Count}");

            // Prints extra space for console readability
            Console.WriteLine();

            Console.WriteLine("Inserting documents...");

            // Asynchronously inserts the documents by using a helper method
            await InsertManyRestaurantsAsync();

            // Finds all documents that match the filter after the insert
            foundRestaurants = _restaurantsCollection.Find(filter).ToList();

            // Prints the number of documents found
            Console.WriteLine($"Number of restaurants inserted: {foundRestaurants.Count}");

            Cleanup();

        // Prints a message if any exceptions occur during the operation    
        } catch (MongoException me) {
            Console.WriteLine("Unable to insert due to an error: " + me);
        }
    }

    private static async Task InsertManyRestaurantsAsync()
    {
        Cleanup();

        // start-insert-many
        // Generates 5 new restaurants by using a helper method
        var restaurants = GenerateDocuments();

        // Asynchronously inserts the new documents into the restaurants collection
        await _restaurantsCollection.InsertManyAsync(restaurants);
        // end-insert-many
    }

    private static void Setup()
    {
        // Allows automapping of the camelCase database fields to models
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // Establishes the connection to MongoDB and accesses the restaurants database
        var mongoClient = new MongoClient(MongoConnectionString);
        var restaurantsDatabase = mongoClient.GetDatabase("sample_restaurants");
        _restaurantsCollection = restaurantsDatabase.GetCollection<Restaurant>("restaurants");
    }

    private static List<Restaurant> GenerateDocuments()
    {
        // Generates 5 new restaurant documents
        var restaurantsList = new List<Restaurant>();
        for (int i = 1; i <= 5; i++)
        {
            Restaurant newRestaurant = new()
            {
                Name = "Mongo's Pizza",
                RestaurantId = $"12345-{i}",
                Cuisine = "Pizza",
                Address = new()
                {
                    Street = "Pizza St",
                    ZipCode = "10003"
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

    public float? Score { get; set; }
}
