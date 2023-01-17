using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace CsharpExamples.UsageExamples.InsertOne;

public class InsertOneAsync
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<Your MongoDB URI>";

    public static async Task Main(string[] args)
    {
        Setup();

        Console.WriteLine("Inserting a document...");
        await InsertOneRestaurantAsync();

        // find and print newly inserted document
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Name, "Mongo's Pizza");

        var document = _restaurantsCollection.Find(filter).FirstOrDefault();

        Console.WriteLine($"Document Inserted: {document.ToBsonDocument()}");

        Cleanup();
    }

    private static async Task InsertOneRestaurantAsync()
    {
        // delete sample document if already exists
        Cleanup();

        // start-insert-one-async
        Restaurant newRestaurant = new()
        {
            Name = "Mongo's Pizza",
            RestaurantId = "12345",
            Cuisine = "Pizza",
            Address = new BsonDocument
            {
                {"street", "Pizza St"},
                {"zipcode", "10003"}
            },
            Borough = "Manhattan",
        };

        await _restaurantsCollection.InsertOneAsync(newRestaurant);
        // end-insert-one-async
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

    private static void Cleanup()
    {
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Name, "Mongo's Pizza");

        _restaurantsCollection.DeleteOne(filter);
    }
}