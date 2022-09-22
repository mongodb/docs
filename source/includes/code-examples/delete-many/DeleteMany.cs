using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using static System.Console;

namespace CSharpExamples.UsageExamples;

public class DeleteMany
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private static string _mongoConnectionString = "<Your MongoDB URI>";
    
    public static void Main(string[] args)
    {
        Setup();
        
        var docs = _restaurantsCollection.Find(Builders<Restaurant>.Filter
            .Regex("name", "Green")).ToList();

        // Deleting documents using builders
        WriteLine("Deleting documents...");
        var result = DeleteMultipleRestaurantsBuilder();

        WriteLine($"Deleted documents: {result.DeletedCount}");
        
        Restore(docs);
    }

    private static DeleteResult DeleteMultipleRestaurantsBuilder()
    {
        // start-delete-many-builders
        var filter = Builders<Restaurant>.Filter
            .Regex("name", "Green");

        var result = _restaurantsCollection.DeleteMany(filter);
        return result;
        // end-delete-many-builders
    }

    private static void Restore(IEnumerable<Restaurant> docs)
    {
        _restaurantsCollection.InsertMany(docs);
        WriteLine("Resetting sample data...done.");
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