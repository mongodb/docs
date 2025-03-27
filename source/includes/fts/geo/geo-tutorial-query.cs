using MongoDB.Bson;
using MongoDB.Bson.IO;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.GeoJsonObjectModel;
using MongoDB.Driver.Search;
using System;

public class GeoQuery 
{
    private const string MongoConnectionString = "<connection-string>";
    
    public static void Main(string[] args) 
    {
        // allow automapping of the camelCase database fields to our AirbnbDocument
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // connect to your Atlas cluster
        var mongoClient = new MongoClient(MongoConnectionString);
        var airbnbDatabase = mongoClient.GetDatabase("sample_airbnb");
        var airbnbCollection = airbnbDatabase.GetCollection<AirbnbDocument>("listingsAndReviews");

        // declare data for the compound query
        string property_type = "Condominium";
        var coordinates = new GeoJson2DCoordinates[]
        {
          new(-161.323242, 22.512557),
          new(-152.446289, 22.065278),
          new(-156.09375, 17.811456),
          new(-161.323242, 22.512557)
        };
        var polygon = GeoJson.Polygon(coordinates);

        // define and run pipeline
        var results = airbnbCollection.Aggregate()
            .Search(Builders<AirbnbDocument>.Search.Compound()
                .Must(Builders<AirbnbDocument>.Search.GeoWithin(airbnb => airbnb.Address.Location, polygon))
                .Should((Builders<AirbnbDocument>.Search.Text(airbnb => airbnb.PropertyType, property_type))),
                indexName: "geo-json-tutorial")
            .Limit (10)
            .Project<AirbnbDocument>(Builders<AirbnbDocument>.Projection
                .Include(airbnb => airbnb.PropertyType)
                .Include(airbnb => airbnb.Address.Location)
                .Include(airbnb => airbnb.Name)
                .Exclude(airbnb => airbnb.Id)
                .MetaSearchScore(airbnb => airbnb.Score))
            .ToList();

        // print results
        foreach (var x in results) {
            Console.WriteLine(x.ToJson());
        }
    }
}
[BsonIgnoreExtraElements]
public class AirbnbDocument 
{
    [BsonIgnoreIfDefault]
    public ObjectId Id { get; set; }
    public String Name { get; set; }
    [BsonElement("property_type")] 
    public string PropertyType { get; set; }
    public Address Address { get; set; }
    public double Score { get; set; }
}
[BsonIgnoreExtraElements]
public class Address 
{
    public GeoJsonPoint<GeoJson2DCoordinates> Location { get; set; }
}
