using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace TestRun.Fundamentals;

public class Insert
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private static string _mongoConnectionString = "<Your MongoDB URI>";

    public static void Main(string[] args)
    {
        Setup();

        // start-insert
        var restaurantsList = new List<Restaurant>()
        {
            new() { Name = "Été Bleu", Cuisine = "French" },
            new() { Name = "Lucky Bird", Cuisine = "Café/Coffee/Tea" },
            new() { Name = "Wildflower Café", Cuisine = "Vegetarian" },
            new() { Name = "Blue Moon Grill", Cuisine = "American" },
        };

        var options = new InsertManyOptions() { BypassDocumentValidation = true };

        Console.WriteLine("Inserting documents...");
        _restaurantsCollection.InsertMany(restaurantsList, options);
        // end-insert
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
    public string Cuisine { get; set; }
}
// end-model