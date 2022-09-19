using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using static System.Console;

namespace CSharpExamples.UsageExamples;

public class DeleteOne
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private static string _mongoConnectionString = "<Your MongoDB URI>";

    public static void Main(string[] args)
    {
        Setup();
        
        var doc = _restaurantsCollection.Find(Builders<Restaurant>.Filter
            .Eq("name", "Ready Penny Inn")).First();

        // Delete a document using builders
        WriteLine("Deleting a document with builders...");
        var result = DeleteARestaurantBuilder();

        WriteLine($"Deleted documents: {result.DeletedCount}");
        
        Restore(doc);
    }

    private static DeleteResult DeleteARestaurantBuilder()
    {
        // start-delete-one-builders
        var filter = Builders<Restaurant>.Filter
            .Eq("name", "Ready Penny Inn");

        var result = _restaurantsCollection.DeleteOne(filter);
        return result;
        // end-delete-one-builders
    }

    private static void Restore(Restaurant doc)
    {
        _restaurantsCollection.InsertOne(doc);
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

    public List<object> Grades { get; set; }
}
// end-model