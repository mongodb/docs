// Updates documents that match a query filter by using the C# driver

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace CSharpExamples.UsageExamples.UpdateMany;

public class UpdateMany
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<connection string>";

    private const string OldCuisine = "Pizza";
    private const string NewCuisine = "Pasta and breadsticks";
    private const string CuisineField = "cuisine";

    public static void Main(string[] args)
    {
        try
        {
            Setup();

            // Prints extra space for console readability  
            Console.WriteLine();

            // Finds the number of restaurants with a "cuisine" value of "Pizza"
            Console.WriteLine($"Restaurants with {CuisineField} \"{OldCuisine}\" found: {FindCountOfRestaurantsWithCuisine(OldCuisine)}");

            // Updates many documents by using a helper method
            var syncResult = UpdateManyRestaurants();
            Console.WriteLine($"Restaurants modified by update: {syncResult.ModifiedCount}");

            // Finds the number of restaurants with a "cuisine" value of "Pasta and breadsticks"
            Console.WriteLine($"Restaurants with {CuisineField} \"{NewCuisine}\" found after update: {FindCountOfRestaurantsWithCuisine(NewCuisine)}");

            // Resets the sample data
            Console.WriteLine("Resetting sample data...");
            ResetSampleData();
            Console.WriteLine("done.");

            // Prints a message if any exceptions occur during the operation    
        }
        catch (MongoException me)
        {
            Console.WriteLine("Unable to update due to an error: " + me);
        }
    }

    private static UpdateResult UpdateManyRestaurants()
    {
        // start-update-many
        const string oldValue = "Pizza";
        const string newValue = "Pasta and breadsticks";

        // Creates a filter for all documents with a "cuisine" value of "Pizza"
        var filter = Builders<Restaurant>.Filter
             .Eq(restaurant => restaurant.Cuisine, oldValue);

        // Creates instructions to update the "cuisine" field of documents that
        // match the filter
        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Cuisine, newValue);

        // Updates all documents that have a "cuisine" value of "Pizza"
        return _restaurantsCollection.UpdateMany(filter, update);
        // end-update-many
    }

    private static long FindCountOfRestaurantsWithCuisine(string cuisineValue)
    {
        var filter = Builders<Restaurant>.Filter
            .Eq(CuisineField, cuisineValue);

        return _restaurantsCollection.Find(filter).CountDocuments();
    }

    private static void Setup()
    {
        // Allows automapping of the camelCase database fields to models 
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // Establishes the connection to MongoDB and accesses the "sample_restaurants" collection
        var mongoClient = new MongoClient(MongoConnectionString);
        var restaurantsDatabase = mongoClient.GetDatabase("sample_restaurants");
        _restaurantsCollection = restaurantsDatabase.GetCollection<Restaurant>("restaurants");
    }

    private static void ResetSampleData()
    {
        var filter = Builders<Restaurant>.Filter
            .Eq(CuisineField, NewCuisine);

        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Cuisine, OldCuisine);

        _restaurantsCollection.UpdateMany(filter, update);
    }
    public static void CombineUpdates()
    {
        // start-combine-sync
        var filter = Builders<Restaurant>.Filter
            .Eq("cuisine", "Pizza");

        var combinedUpdate = Builders<Restaurant>.Update.Combine(
            Builders<Restaurant>.Update.Set("cuisine", "French"),
            Builders<Restaurant>.Update.Unset("borough")
        );

        _restaurantsCollection.UpdateMany(filter, combinedUpdate);
        // end-combine-sync
    }

    public static async Task CombineUpdatesAsync()
    {
        // start-combine-async
        var filter = Builders<Restaurant>.Filter
            .Eq("cuisine", "Pizza");

        var combinedUpdate = Builders<Restaurant>.Update.Combine(
            Builders<Restaurant>.Update.Set("cuisine", "French"),
            Builders<Restaurant>.Update.Unset("borough")
        );

        await _restaurantsCollection.UpdateManyAsync(filter, combinedUpdate);
        // end-combine-async
    }
    public static void PipelineUpdate()
    {
        // start-pipeline-sync
        var filter = Builders<Restaurant>.Filter
            .Eq("cuisine", "Pizza");

        var updatePipeline = Builders<Restaurant>.Update.Pipeline(
            PipelineDefinition<Restaurant, Restaurant>.Create(
                new BsonDocument("$set", new BsonDocument("cuisine", "French")),
                new BsonDocument("$unset", "borough")
            )
        );

        _restaurantsCollection.UpdateMany(filter, updatePipeline);
        // end-pipeline-sync
    }

    public static async Task PipelineUpdateAsync()
    {
        // start-pipeline-async
        var filter = Builders<Restaurant>.Filter
            .Eq("cuisine", "Pizza");

        var updatePipeline = Builders<Restaurant>.Update.Pipeline(
            PipelineDefinition<Restaurant, Restaurant>.Create(
                new BsonDocument("$set", new BsonDocument("cuisine", "French")),
                new BsonDocument("$unset", "borough")
            )
        );

        await _restaurantsCollection.UpdateManyAsync(filter, updatePipeline);
        // end-pipeline-async
    }

}

