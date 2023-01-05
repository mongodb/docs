using MongoDB.Driver;
using MongoDB.Bson.Serializaton.Conventions;

namespace DataFormats.Poco;

public class Poco
{
    private static IMongoCollection<Clothing> _myColl;
    private static string _mongoConnectionString = "<Your MongoDB URI>";

    public static void Main(string[] args)
    {
        Setup();

        // start-insert
        var doc = new Clothing
        {
            Name = "Denim Jacket",
            InStock = false,
            Price = 32.99m,
            ColorSelection = new List<string> { "dark wash", "light wash" }
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