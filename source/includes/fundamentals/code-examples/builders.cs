using MongoDB.Driver;
using static System.Console;
using MongoDB.Bson;

namespace TestRun.Fundamentals;

public class Builders
{
    private static IMongoCollection<Flower> _flowerCollection;
    private static string _mongoConnectionString = "<Your MongoDB URI>";
    
    public static void Main(string[] args)
    {
        Setup();
        
        // Sample builders definitions
        var filter = Builders<Flower>.Filter.AnyEq(flower => flower.Season, "spring");
        var projection = Builders<Flower>.Projection.Include("Name").Include("Price").Exclude("Id");
        var sort = Builders<Flower>.Sort.Ascending("Price").Descending("Category");

        WriteLine("Finding documents...");
        var result = _flowerCollection.Find(filter).Sort(sort).Project(projection).toList();

        WriteLine(result.ToJson());

        var update = Builders<Flower>.Update.Mul("Price", 0.9);
        var result2 = _flowerCollection.UpdateOne(filter, update);
    }
    private static void Setup()
    {
        // Establish the connection to MongoDB and get the restaurants database
        var mongoClient = new MongoClient(_mongoConnectionString);
        var myDatabase = mongoClient.GetDatabase("plants");
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
}
// end-model