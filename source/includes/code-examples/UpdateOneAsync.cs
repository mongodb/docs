using System.Threading.Tasks.Sources;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using static System.Console;

namespace CSharpExamples.UsageExamples;

public class UpdateOneAsync
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private static string _mongoConnectionString = "<Your MongoDB URI>";

    public static void Main(string[] args)
    {
        Setup();

        // Extra space for console readability 
        WriteLine();

        //Update one document asynchronously
        var asyncResult = UpdateOneRestaurantAsync();
        WriteLine($"Updated documents: {asyncResult.Result.ModifiedCount}");
        ResetSampleData();
    }

    private static async Task<UpdateResult> UpdateOneRestaurantAsync()
    {
        // start-update-one-async
        const string oldValue = "Bagels N Buns";
        const string newValue = "2 Bagels 2 Buns";

        var filter = Builders<Restaurant>.Filter
            .Eq("name", oldValue);

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
        var mongoClient = new MongoClient(_mongoConnectionString);
        var restaurantsDatabase = mongoClient.GetDatabase("sample_restaurants");
        _restaurantsCollection = restaurantsDatabase.GetCollection<Restaurant>("restaurants");
    }

    private static void ResetSampleData()
    {
        var filter = Builders<Restaurant>.Filter
            .Eq("name", "2 Bagels 2 Buns");

        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Name, "Bagels N Buns");

        _restaurantsCollection.UpdateOne(filter, update);
    }
}

// start-model
public class Restaurant
{
    public ObjectId Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("restaurant_id")]
    public string RestaurantId { get; set; }

    public string Cuisine { get; set; }

    public object Address { get; set; }

    public string Borough { get; set; }

    public List<object> Grades { get; set; }
}
// end-model
