using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

public class Distinct
{
    // Replace with your connection string
    private const string MongoConnectionString = "<connection string URI>>";

    public static void Main(string[] args)
    {   
        var mongoClient = new MongoClient(MongoConnectionString);
        var database = mongoClient.GetDatabase("sample_restaurants");
        var collection = database.GetCollection<Restaurant>("restaurants");
        
        {
            // start-distinct
            var results = collection.Distinct<string>(r => r.Borough, Builders<Restaurant>.Filters.Empty).ToList();
            foreach (var result in results)
            {
                Console.WriteLine(result);
            }
            // end-distinct
        }

        {
            // start-distinct-with-query
            var filter = Builders<Restaurant>.Filter.Eq(r => r.Cuisine, "Italian");
            var results = collection.Distinct<string>(r => r.Borough, filter).ToList();
            foreach (var result in results)
            {
                Console.WriteLine(result);
            }
            // end-distinct-with-query
        }

        {
            // start-distinct-with-comment
            var cuisineFilter = Builders<Restaurant>.Filter.Eq(r => r.Cuisine, "Pizza");
            var boroughFilter = Builders<Restaurant>.Filter.Eq(r => r.Borough, "Bronx");
            var filter = Builders<Restaurant>.Filter.And(cuisineFilter, boroughFilter);

            var options = new DistinctOptions {
                Comment = "Find all Italian restaurants in the Bronx"
            };

            var results = collection.Distinct<string>(r => r.Name, filter).ToList();
            foreach (var result in results)
            {
                Console.WriteLine(result);
            }
            // end-distinct-with-comment 
        }

    }

    private static async void DistinctAsync (IMongoCollection<Restaurant> collection)
    {
        // start-distinct-async
        var results = await collection.DistinctAsync<string>(r => r.Borough, Builders<Restaurant>.Filters.Empty);
        await results.ForEachAsync(result => Console.WriteLine(result));
        // end-distinct-async
    }

    private static async void DistinctWithQueryAsync (IMongoCollection<Restaurant> collection)
    {
        // start-distinct-with-query-async
        var filter = Builders<Restaurant>.Filter.Eq(r => r.Cuisine, "Italian");
        var results = await collection.DistinctAsync<string>(r => r.Borough, filter);
        await results.ForEachAsync(result => Console.WriteLine(result));
        // end-distinct-with-query-async
    }

    private static async void DistinctWithCommentAsync (IMongoCollection<Restaurant> collection)
    {
        // start-distinct-with-comment-async
        var cuisineFilter = Builders<Restaurant>.Filter.Eq(r => r.Cuisine, "Pizza");
        var boroughFilter = Builders<Restaurant>.Filter.Eq(r => r.Borough, "Bronx");
        var filter = Builders<Restaurant>.Filter.And(cuisineFilter, boroughFilter);

        var options = new DistinctOptions {
            Comment = "Find all Italian restaurants in the Bronx"
        };

        var results = await collection.DistinctAsync<string>(r => r.Name, filter, options);
        await results.ForEachAsync(result => Console.WriteLine(result));
        // end-distinct-with-comment-async
    }
}

// start-model
public class Restaurant {
    public ObjectId? Id { get; set; }

    [BsonElement("name")]
    public string? Name { get; set; }

    [BsonElement("cuisine")]
    public string? Cuisine { get; set; }

    [BsonElement("borough")]
    public string? Borough { get; set; }
}
// end-model