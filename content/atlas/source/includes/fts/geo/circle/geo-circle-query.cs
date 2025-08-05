using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.GeoJsonObjectModel;
using MongoDB.Driver.Search;

public class GeoCircleQuery
{
    private const string MongoConnectionString = "<connection-string>";

    public static void Main(string[] args)
    {
        // allow automapping of the camelCase database fields to our PropertyDocument
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // connect to your Atlas cluster
        var mongoClient = new MongoClient(MongoConnectionString);
        var airbnbDatabase = mongoClient.GetDatabase("sample_airbnb");
        var listingsCollection = airbnbDatabase.GetCollection<PropertyDocument>("listingsAndReviews");

        // define and run pipeline
        var results = listingsCollection.Aggregate()
            .Search(Builders<PropertyDocument>.Search.GeoWithin(
                property => property.Address!.Location,
                new GeoWithinCircle<GeoJson2DCoordinates>(
                    new GeoJsonPoint<GeoJson2DCoordinates>(new GeoJson2DCoordinates(-73.54, 45.54)),
                    1600
                )
            ))
            .Limit(3)
            .Project<PropertyDocument>(Builders<PropertyDocument>.Projection
                .Include(property => property.Name)
                .Include(property => property.Address)
                .Exclude(property => property.Id))
            .ToList();

        // print results
        foreach (var property in results)
        {
            Console.WriteLine(property.ToJson());
        }
    }
}

[BsonIgnoreExtraElements]
public class PropertyDocument
{
    [BsonIgnoreIfDefault]
    public ObjectId Id { get; set; }
    public string? Name { get; set; }
    public AddressDocument? Address { get; set; }
}

[BsonIgnoreExtraElements]
public class AddressDocument
{
    public GeoJsonPoint<GeoJson2DCoordinates>? Location { get; set; }
    public string? Street { get; set; }
    public string? Country { get; set; }
}
