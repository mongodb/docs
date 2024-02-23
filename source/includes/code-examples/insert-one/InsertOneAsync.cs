// Asynchronously inserts a sample document describing a restaurant by using the C# driver

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace CsharpExamples.UsageExamples.InsertOne;

public class InsertOneAsync
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<connection string>";

    public static async Task Main(string[] args)
    {
        Setup();

        Console.WriteLine("Inserting a document...");
        await InsertOneRestaurantAsync();

        // Creates a filter for all documents that have a "name" value of "Mongo's Pizza"
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Name, "Mongo's Pizza");

        // Finds the newly inserted document by using the filter
        var document = _restaurantsCollection.Find(filter).FirstOrDefault();

        // Prints the document
        Console.WriteLine($"Document Inserted: {document.ToBsonDocument()}");

        Cleanup();
    }

    private static async Task InsertOneRestaurantAsync()
    {
        Cleanup();

        // start-insert-one-async
        // Generates a new restaurant document
        Restaurant newRestaurant = new()
        {
            Name = "Mongo's Pizza",
            RestaurantId = "12345",
            Cuisine = "Pizza",
            Address = new()
            {
                Street = "Pizza St",
                ZipCode = "10003"
            },
            Borough = "Manhattan",
        };

        // Asynchronously inserts the new document into the restaurants collection
        await _restaurantsCollection.InsertOneAsync(newRestaurant);
        // end-insert-one-async
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

    private static void Cleanup()
    {
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Name, "Mongo's Pizza");

        _restaurantsCollection.DeleteOne(filter);
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
