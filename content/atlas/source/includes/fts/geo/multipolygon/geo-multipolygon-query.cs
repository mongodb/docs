using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.GeoJsonObjectModel;
using MongoDB.Driver.Search;

public class GeoMultiPolygonQuery
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

        // define multi-polygon geometry
        var multiPolygon = new GeoJsonMultiPolygon<GeoJson2DCoordinates>(
            new GeoJsonMultiPolygonCoordinates<GeoJson2DCoordinates>(
                new GeoJsonPolygonCoordinates<GeoJson2DCoordinates>[]
                {
                    new GeoJsonPolygonCoordinates<GeoJson2DCoordinates>(
                        new GeoJsonLinearRingCoordinates<GeoJson2DCoordinates>(
                            new GeoJson2DCoordinates[]
                            {
                                new GeoJson2DCoordinates(-157.8412413882, 21.2882235819),
                                new GeoJson2DCoordinates(-157.8607925468, 21.2962046205),
                                new GeoJson2DCoordinates(-157.8646640634, 21.3077019651),
                                new GeoJson2DCoordinates(-157.862776699, 21.320776283),
                                new GeoJson2DCoordinates(-157.8341758705, 21.3133826738),
                                new GeoJson2DCoordinates(-157.8349985678, 21.3000822569),
                                new GeoJson2DCoordinates(-157.8412413882, 21.2882235819)
                            })),
                    new GeoJsonPolygonCoordinates<GeoJson2DCoordinates>(
                        new GeoJsonLinearRingCoordinates<GeoJson2DCoordinates>(
                            new GeoJson2DCoordinates[]
                            {
                                new GeoJson2DCoordinates(-157.852898124, 21.301208833),
                                new GeoJson2DCoordinates(-157.8580050499, 21.3050871833),
                                new GeoJson2DCoordinates(-157.8587346108, 21.3098050385),
                                new GeoJson2DCoordinates(-157.8508811028, 21.3119240258),
                                new GeoJson2DCoordinates(-157.8454308541, 21.30396767),
                                new GeoJson2DCoordinates(-157.852898124, 21.301208833)
                            }))
                }));

        // define and run pipeline
        var results = listingsCollection.Aggregate()
            .Search(Builders<PropertyDocument>.Search.GeoWithin(
                property => property.Address!.Location,
                multiPolygon
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
