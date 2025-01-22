// Replaces the first document that matches a filter by using the C# driver

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace CSharpExamples.UsageExamples.ReplaceOne;

public class ReplaceOne
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<connection string>";

    public static void Main(string[] args)
    {
        try
        {
            Setup();

            // Creates a filter for all restaurant documents that have a "cuisine" value of "Pizza"
            var filter = Builders<Restaurant>.Filter
                .Eq(r => r.Cuisine, "Pizza");

            // Finds the first restaurant document that matches the filter
            var oldPizzaRestaurant = _restaurantsCollection.Find(filter).First();
            Console.WriteLine($"First pizza restaurant before replacement: {oldPizzaRestaurant.Name}");

            // Replaces the document by using a helper method
            var syncResult = ReplaceOneRestaurant();
            Console.WriteLine($"Restaurants modified by replacement: {syncResult.ModifiedCount}");

            var firstPizzaRestaurant = _restaurantsCollection.Find(filter).First();
            Console.WriteLine($"First pizza restaurant after replacement: {firstPizzaRestaurant.Name}");

            Console.WriteLine("Resetting sample data...");
            _restaurantsCollection.ReplaceOneAsync(filter, oldPizzaRestaurant);
            Console.WriteLine("done.");

            // Prints a message if any exceptions occur during the operation    
        }
        catch (MongoException me)
        {
            Console.WriteLine("Unable to replace due to an error: " + me);
        }
    }

    private static ReplaceOneResult ReplaceOneRestaurant()
    {
        // start-replace-one
        // Creates a filter for all restaurant documents that have a "cuisine" value of "Pizza"
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Cuisine, "Pizza");

        // Finds the ID of the first restaurant document that matches the filter
        var oldPizzaRestaurant = _restaurantsCollection.Find(filter).First();
        var oldId = oldPizzaRestaurant.Id;

        // Generates a new restaurant document
        Restaurant newPizzaRestaurant = new()
        {
            Id = oldId
            Name = "Mongo's Pizza",
            Cuisine = "Pizza",
            Address = new Address()
            {
                Street = "Pizza St",
                ZipCode = "10003"
            },
            Borough = "Manhattan",
        };

        // Replaces the existing restaurant document with the new document
        return _restaurantsCollection.ReplaceOne(filter, newPizzaRestaurant);
        // end-replace-one
    }

    private static ReplaceOneResult ReplaceOneRestaurantWithOptions()
    {
        // start-replace-one-sync-with-options
        // Creates a filter for all restaurant documents that have a "cuisine" value of "Pizza"
        var filter = Builders<Restaurant>.Filter
            .Eq(r => r.Cuisine, "Pizza");

        // Finds the ID of the first restaurant document that matches the filter
        var oldPizzaRestaurant = _restaurantsCollection.Find(filter).First();
        var oldId = oldPizzaRestaurant.Id;

        // Generates a new restaurant document
        Restaurant newPizzaRestaurant = new()
        {
            Id = oldId
            Name = "Mongo's Pizza",
            Cuisine = "Pizza",
            Address = new Address()
            {
                Street = "Pizza St",
                ZipCode = "10003"
            },
            Borough = "Manhattan",
        };

        var options = new ReplaceOptions
        {
            BypassDocumentValidation = true
        };

        // Replaces the existing restaurant document with the new document
        return _restaurantsCollection.ReplaceOne(filter, newPizzaRestaurant, options);
        // end-replace-one-sync-with-options
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
