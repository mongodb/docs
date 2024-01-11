using MongoDB.Driver;
using MongoDB.Bson.Serializaton.Conventions;

namespace DataFormats.Poco;

public class Poco
{
    private static IMongoCollection<Clothing> _myColl;
    private static string _mongoConnectionString = "<connection string>";

    public static void Main(string[] args)
    {
        Setup();

        // start-insert
        // Creates a new clothing document using the predefined Clothing class
        var doc = new Clothing
        {
            Name = "Denim Jacket",
            InStock = false,
            Price = 32.99m,
            ColorSelection = new List<string> { "dark wash", "light wash" }
        };

        // Inserts the new document into the clothing collection
        _myColl.InsertOne(doc);
        // end-insert
    }
    private static void Setup()
    {
        
        // Allows automapping of the camelCase database fields to models 
        // start-conventionpack
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);
        // end-conventionpack

        // Establishes the connection to MongoDB and get the sample_db database
        var mongoClient = new MongoClient(_mongoConnectionString);
        var myDatabase = mongoClient.GetDatabase("sample_db");
        _myColl = myDatabase.GetCollection<Clothing>("sample_coll");
    }
} 