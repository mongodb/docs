using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace CSharpExamples.UsageExamples.UpdateOne;

public class UpdateOneAsync
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<Your MongoDB URI>";

    public static async Task Main(string[] args)
    {
        Setup();

        // Extra space for console readability 
        Console.WriteLine();

        //Update one document asynchronously
        var asyncResult = await UpdateOneRestaurantAsync();
        Console.WriteLine($"Updated documents: {asyncResult.ModifiedCount}");
        ResetSampleData();
    }

    private static async Task<UpdateResult> UpdateOneRestaurantAsync()
    {
        // start-update-one-async
        const string oldValue = "Bagels N Buns";
        const string newValue = "2 Bagels 2 Buns";

        var filter = Builders<Restaurant>.Filter
            .Eq(restaurant => restaurant.Name, oldValue);

        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Name, newValue);

        return await _restaurantsCollection.UpdateOneAsync(filter, update);
        // end-update-one-async
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
            .Eq(restaurant => restaurant.Name, "2 Bagels 2 Buns");

        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Name, "Bagels N Buns");

        _restaurantsCollection.UpdateOne(filter, update);
    }
}