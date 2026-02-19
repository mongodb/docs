// Deletes a document from a collection by using the C# driver

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace CSharpExamples.UsageExamples.DeleteOne;

public class DeleteOne
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<connection string>";

    public static void Main(string[] args)
    {
        try {
            Setup();

            var filter = Builders<Restaurant>.Filter
                .Eq(r => r.Name, "Ready Penny Inn");

            var doc = _restaurantsCollection.Find(filter).First();

            // Deletes a document by using builders
            Console.WriteLine("Deleting a document with builders...");
            var result = DeleteARestaurantBuilder();

            Console.WriteLine($"Deleted documents: {result.DeletedCount}");

            Restore(doc);

        // Prints a message if any exceptions occur during the operation    
        } catch (MongoException me) {
            Console.WriteLine("Unable to delete due to an error: " + me);
        }
    }

    private static DeleteResult DeleteARestaurantBuilder()
    {
        // start-delete-one-builders
        // Creates a filter for all documents that have a "name" value of "Ready Penny Inn"
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Name, "Ready Penny Inn");

        // Deletes the first document that matches the filter
        return _restaurantsCollection.DeleteOne(filter);
        // end-delete-one-builders
    }

    private static void Restore(Restaurant doc)
    {
        _restaurantsCollection.InsertOne(doc);
    }

    private static void Setup()
    {
        // Allows automapping of the camelCase database fields to models 
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // Establishes the connection to MongoDB and accesses the "restaurants" collection
        var mongoClient = new MongoClient(MongoConnectionString);
        var restaurantsDatabase = mongoClient.GetDatabase("sample_restaurants");
        _restaurantsCollection = restaurantsDatabase.GetCollection<Restaurant>("restaurants");
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
