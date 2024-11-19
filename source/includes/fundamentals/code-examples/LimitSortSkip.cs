using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

public class LimitSortSkip
{
    // Replace with your connection string
    private const string MongoConnectionString = "<connection string URI>";

    public static void Main(string[] args)
    {   
        var mongoClient = new MongoClient(MongoConnectionString);
        var database = mongoClient.GetDatabase("sample_restaurants");
        var collection = database.GetCollection<Restaurant>("restaurants");
        
        {
            // start-limit
            var filter = Builders<Restaurant>.Filter.Eq("cuisine", "Italian");
            var results = collection.Find(filter).Limit(5).ToList();

            foreach (var result in results)
            {
                Console.WriteLine(result.Name);
            }
            // end-limit
        }

        {
            // start-sort
            var filter = Builders<Restaurant>.Filter.Eq("cuisine", "Italian");
            var sort = Builders<Restaurant>.Sort.Ascending("name");
            var results = collection.Find(filter).Sort(sort).ToList();

            foreach (var result in results)
            {
                Console.WriteLine(result.Name);
            }
            // end-sort
        }

        {
            // start-skip
            var filter = Builders<Restaurant>.Filter.Eq("cuisine", "Italian");
            var results = collection.Find(filter).Skip(10).ToList();

            foreach (var result in results)
            {
                Console.WriteLine(result.Name);
            }
            // end-skip
        }

        {
            // start-limit-sort-skip
            var filter = Builders<Restaurant>.Filter.Eq("cuisine", "Italian");
            var sort = Builders<Restaurant>.Sort.Ascending("name");

            var results = collection.Find(filter).Limit(10).Sort(sort).Skip(10).ToList();

            foreach (var result in results)
            {
                Console.WriteLine(result.Name);
            }
            // end-limit-sort-skip
        }
    }
}

// start-restaurant-class
[BsonIgnoreExtraElements]
public class Restaurant {
    public ObjectId Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("cuisine")]
    public string Cuisine { get; set; }
}
// end-restaurant-class