using MongoDB.Driver;
using MongoDB.Bson;

namespace TestRun.Fundamentals;

public class Builders
{
    private static IMongoCollection<Flower> _flowerCollection;
    private static string _mongoConnectionString = "<connection string>";

    public static void Main(string[] args)
    {
        Setup();

        // Creates a filter for all documents with a "season" value of "Spring"
        var filter = Builders<Flower>.Filter.AnyEq(flower => flower.Season, "spring");

        // Creates a projection to include the "name" and "price" fields, while
        // excluding the "id" field
        var projection = Builders<Flower>.Projection.Include("Name").Include("Price").Exclude("Id");

        // Creates instructions to sort results by ascending price and to sort 
        // results with the same price in descending category order
        var sort = Builders<Flower>.Sort.Ascending("Price").Descending("Category");

        Console.WriteLine("Finding documents...");

        // Finds all documents that match the filter and applies the specified 
        // projection and sort to the results
        var result = _flowerCollection.Find(filter).Sort(sort).Project(projection).toList();

        Console.WriteLine(result.ToJson());

        // Creates an update object for that will multiply the price value by
        // 0.9
        var update = Builders<Flower>.Update.Mul("Price", 0.9);

        // Applies the update object instructions to the first document that
        // matches the filter
        var result2 = _flowerCollection.UpdateOne(filter, update);
    }

    private static void Setup()
    {
        // Establishes the connection to MongoDB and gets the "plants" database
        var mongoClient = new MongoClient(_mongoConnectionString);
        var myDatabase = mongoClient.GetDatabase("plants");

        // Creates a reference to the "flowers" collection
        _flowerCollection = myDatabase.GetCollection<Flower>("flowers");
    }
}

// start-model
public class Flower
{
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    public string Category { get; set; }
    public double Price { get; set; }
    public List<string> Season { get; set; }
    public double Stock { get; set; }
    public string Description { get; set; }
}
// end-model