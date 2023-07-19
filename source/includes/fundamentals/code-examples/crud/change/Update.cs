using MongoDB.Bson;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

namespace Fundamentals
{
    public class Update
    {
        private static IMongoCollection<Restaurant> _restaurantsCollection;
        private const string MongoConnectionString = "<connection string>";

        private const string OldValue = "Manhattan";
        private const string NewValue = "Manhattan (north)";

        public static void Main(string[] args)
        {
            Setup();

            Console.WriteLine($"Found: {FindCountOfRestaurantsWithBorough(OldValue)}");

            // start-builders
            var filter = Builders<Restaurant>.Filter
                .Eq(restaurant => restaurant.Borough, "Manhattan");

            var update = Builders<Restaurant>.Update
                .Set(restaurant => restaurant.Borough, "Manhattan (north)");
            // end-builders

            var options = new UpdateOptions()
            {
                Comment = new BsonString("Borough updated for C# Driver Fundamentals")
            };

            Console.WriteLine("Updating documents...");
            var result = _restaurantsCollection.UpdateMany(filter, update, options);

            Console.WriteLine($"Updated documents: {result.ModifiedCount}");
            Console.WriteLine($"Result acknowledged? {result.IsAcknowledged}");

            ResetSampleData();
        }

        private static long FindCountOfRestaurantsWithBorough(string borough)
        {
            var filter = Builders<Restaurant>.Filter
                .Eq(restaurant => restaurant.Borough, borough);
            return _restaurantsCollection.Find(filter).CountDocuments();
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
                .Eq(restaurant => restaurant.Borough, NewValue);

            var update = Builders<Restaurant>.Update
                .Set(restaurant => restaurant.Borough, OldValue);

            _restaurantsCollection.UpdateMany(filter, update);
        }
    }
}