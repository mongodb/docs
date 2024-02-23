// Inserts sample documents describing restaurants by using the C# driver

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace CSharpExamples.UsageExamples.InsertMany;

public class InsertMany
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<connection string>";

    public static void Main(string[] args)
    {
        Setup();

        // Creates a filter for all documents that have a "name" value of "Mongo's Pizza"
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Name, "Mongo's Pizza");

        // Finds all documents that match the filter
        var foundRestaurants = _restaurantsCollection.Find(filter).ToList();

        Console.WriteLine($"Number of restaurants found before insert: {foundRestaurants.Count}");

        // Prints extra space for console readability
        Console.WriteLine();

        Console.WriteLine("Inserting documents...");

        // Inserts the documents by using a helper method
        InsertManyRestaurants();

        // Finds all documents that match the filter after the insert
        foundRestaurants = _restaurantsCollection.Find(filter).ToList();

        // Prints the number of documents found
        Console.WriteLine($"Number of restaurants inserted: {foundRestaurants.Count}");

        Cleanup();
    }

    private static void InsertManyRestaurants()
    {
        Cleanup();

        // start-insert-many
        // Generates 5 new restaurants by using a helper method
        var restaurants = GenerateDocuments();

        // Inserts the new documents into the restaurants collection
        _restaurantsCollection.InsertMany(restaurants);
        // end-insert-many
    }

    private static void InsertManyRestaurantsWithOptions()
    {
        Cleanup();

        // start-insert-many-with-options
        // Generates 5 new restaurants by using a helper method
        var restaurants = GenerateDocuments();

        // Creates an option object to bypass documentation validation on the documents
        var options = new InsertManyOptions() { BypassDocumentValidation = true };

        // Inserts the new documents into the restaurants collection with the specified options
        _restaurantsCollection.InsertMany(restaurants, options);
        // end-insert-many-with-options
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
