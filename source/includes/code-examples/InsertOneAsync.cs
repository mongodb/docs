using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using static System.Console;

namespace CsharpExamples.UsageExamples;

public class InsertOneAsync
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private static string _mongoConnectionString = "<Your MongoDB URI>";

    public static void Main(string[] args)
    {
        Setup();

        WriteLine("Inserting a document...");
        InsertOneRestaurant();

        // find and print newly inserted document
        var document = _restaurantsCollection.Find(Builders<Restaurant>.Filter
            .Eq("name", "Mongo's Pizza")).FirstOrDefault();

        WriteLine("Document Inserted: " + document.ToBsonDocument());

        Cleanup();

    }

    private static async void InsertOneRestaurant()
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
                {"zipcode", "10003"},
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
        var mongoClient = new MongoClient(_mongoConnectionString);
        var restaurantsDatabase = mongoClient.GetDatabase("sample_restaurants");
        _restaurantsCollection = restaurantsDatabase.GetCollection<Restaurant>("restaurants");
    }

    private static void Cleanup()
    {
        _restaurantsCollection.DeleteOne(Builders<Restaurant>.Filter
            .Eq("name", "Mongo's Pizza"));
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
}
// end-model
