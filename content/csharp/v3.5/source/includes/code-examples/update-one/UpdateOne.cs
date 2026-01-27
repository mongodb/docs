// Updates the first document that matches a query filter by using the C# driver

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace CSharpExamples.UsageExamples.UpdateOne;

public class UpdateOne
{
    private static IMongoCollection<Restaurant> _restaurantsCollection;
    private const string MongoConnectionString = "<connection string>";

    public static void Main(string[] args)
    {
        try
        {
            Setup();

            // Prints extra space for console readability 
            Console.WriteLine();

            // Updates one document by using a helper method
            var syncResult = UpdateOneRestaurant();
            Console.WriteLine($"Updated documents: {syncResult.ModifiedCount}");
            ResetSampleData();

            // Prints a message if any exceptions occur during the operation    
        }
        catch (MongoException me)
        {
            Console.WriteLine("Unable to update due to an error: " + me);
        }
    }

    private static UpdateResult UpdateOneRestaurant()
    {
        // start-update-one
        // Creates a filter for all documents with a "name" of "Bagels N Buns"
        var filter = Builders<Restaurant>.Filter
            .Eq(restaurant => restaurant.Name, "Bagels N Buns");

        // Creates instructions to update the "name" field of the first document
        // that matches the filter
        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Name, "2 Bagels 2 Buns");

        // Updates the first document that has a "name" value of "Bagels N Buns"
        return _restaurantsCollection.UpdateOne(filter, update);
        // end-update-one
    }

    public static UpdateResult UpdateOneRestaurantArray()
    {
        // start-update-one-array
        var filter = Builders<Restaurant>.Filter
            .Eq("name", "Downtown Deli");

        var update = Builders<Restaurant>.Update
            .Push(restaurant => restaurant.Grades, new GradeEntry()
            {
                Date = DateTime.Now,
                Grade = "A",
                Score = 96
            });

        var result = _restaurantsCollection.UpdateOne(filter, update);

        return result;
        // end-update-one-array
    }

    public static async Task<UpdateResult> UpdateOneRestaurantArrayAsync()
    {
        // start-update-one-array-async
        var filter = Builders<Restaurant>.Filter
            .Eq("name", "Downtown Deli");

        var update = Builders<Restaurant>.Update
            .Push(restaurant => restaurant.Grades, new GradeEntry()
            {
                Date = DateTime.Now,
                Grade = "A",
                Score = 96
            });

        var result = await _restaurantsCollection.UpdateOneAsync(filter, update);

        return result;
        // end-update-one-array-async
    }

    public static void CombineUpdates()
    {
        // start-combine-sync
        var filter = Builders<Restaurant>.Filter
            .Eq("name", "Downtown Deli");

        var combinedUpdate = Builders<Restaurant>.Update.Combine(
            Builders<Restaurant>.Update.Set("cuisine", "French"),
            Builders<Restaurant>.Update.Unset("borough")
        );

        _restaurantsCollection.UpdateOne(filter, combinedUpdate);
        // end-combine-sync
    }

    public static async Task CombineUpdatesAsync()
    {
        // start-combine-async
        var filter = Builders<Restaurant>.Filter
            .Eq("name", "Downtown Deli");

        var combinedUpdate = Builders<Restaurant>.Update.Combine(
            Builders<Restaurant>.Update.Set("cuisine", "French"),
            Builders<Restaurant>.Update.Unset("borough")
        );

        await _restaurantsCollection.UpdateOneAsync(filter, combinedUpdate);
        // end-combine-async
    }

    public static void PipelineUpdate()
    {
        // start-pipeline-sync
        var filter = Builders<Restaurant>.Filter
            .Eq("name", "Downtown Deli");

        var updatePipeline = Builders<Restaurant>.Update.Pipeline(
            PipelineDefinition<Restaurant, Restaurant>.Create(
                new BsonDocument("$set", new BsonDocument("cuisine", "French")),
                new BsonDocument("$unset", "borough")
            )
        );

        _restaurantsCollection.UpdateOne(filter, updatePipeline);
        // end-pipeline-sync
    }

    public static async Task PipelineUpdateAsync()
    {
        // start-pipeline-async
        var filter = Builders<Restaurant>.Filter
            .Eq("name", "Downtown Deli");

        var updatePipeline = Builders<Restaurant>.Update.Pipeline(
            PipelineDefinition<Restaurant, Restaurant>.Create(
                new BsonDocument("$set", new BsonDocument("cuisine", "French")),
                new BsonDocument("$unset", "borough")
            )
        );

        await _restaurantsCollection.UpdateOneAsync(filter, updatePipeline);
        // end-pipeline-async
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
            .Eq(restaurant => restaurant.Name, "2 Bagels 2 Buns");

        var update = Builders<Restaurant>.Update
            .Set(restaurant => restaurant.Name, "Bagels N Buns");

        _restaurantsCollection.UpdateOne(filter, update);
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
