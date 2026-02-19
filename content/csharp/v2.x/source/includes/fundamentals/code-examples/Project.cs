using MongoDB.Bson;
using MongoDB.Driver;

public class Project
{
    // Replace with your connection string
    private const string MongoConnectionString = "<connection string URI>";

    public static void Main(string[] args)
    {   
        var mongoClient = new MongoClient(MongoConnectionString);
        var database = mongoClient.GetDatabase("sample_restaurants");
        var collection = database.GetCollection<BsonDocument>("restaurants");
        
        {
            // start-project-include
            var filter = Builders<BsonDocument>.Filter.Eq("name", "Emerald Pub");
            var projection = Builders<BsonDocument>.Projection
                .Include("name")
                .Include("cuisine");

            var results = collection.Find(filter).Project(projection).ToList();
            foreach (var result in results)
            {
                Console.WriteLine(result.ToJson());
            }
            // end-project-include
        }

        {
            // start-project-include-without-id
            var filter = Builders<BsonDocument>.Filter.Eq("name", "Emerald Pub");
            var projection = Builders<BsonDocument>.Projection
                .Include("name")
                .Include("cuisine")
                .Exclude("_id");

            var results = collection.Find(filter).Project(projection).ToList();
            foreach (var result in results)
            {
                Console.WriteLine(result.ToJson());
            }
            // end-project-include-without-id
        }

        {
            // start-project-exclude
            var filter = Builders<BsonDocument>.Filter.Eq("name", "Emerald Pub");
            var projection = Builders<BsonDocument>.Projection
                .Exclude("cuisine");

            var results = collection.Find(filter).Project(projection).ToList();
            foreach (var result in results)
            {
                Console.WriteLine(result.ToJson());
            }
            // end-project-exclude
        }

    }
}