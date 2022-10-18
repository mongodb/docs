using MongoDB.Driver;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TestRun.Fundamentals;

public class Poco
{
    private static IMongoCollection<Clothing> _myColl;
    private static string _mongoConnectionString = "<Your MongoDB URI>";
    
    public static void Main(string[] args)
    {
        Setup();
        
        // start-insert
        var doc = new Clothing() 
        { 
            Name = "Denim Jacket",
            InStock = false,
            Price = 32.99m,
            ColorSelection = new List<string>() {"dark wash", "light wash"}
        };
        
        _myColl.InsertOne(doc);
        // end-insert
    }
    private static void Setup()
    {
        // start-conventionpack
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);
        // end-conventionpack
        
        // Establish the connection to MongoDB and get the restaurants database
        var mongoClient = new MongoClient(_mongoConnectionString);
        var myDatabase = mongoClient.GetDatabase("sample_db");
        _myColl = myDatabase.GetCollection<Clothing>("sample_coll");
    }
}

// start-model
public class Clothing
{
    public ObjectId Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; }

    [BsonElement("inStock")]
    public bool InStock { get; set; }
    
    [BsonElement("price")]
    [BsonRepresentation(BsonType.Double)]
    public decimal Price { get; set; }

    [BsonElement("colorSelection")]
    public List<string> ColorSelection { get; set; }
}
// end-model