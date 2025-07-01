using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;
   
public class DateNumberToStringQuery
{
    private const string MongoConnectionString = "<connection-string>";
    	
    public static void Main(string[] args)
    {
        // allow automapping of the camelCase database fields to our MovieDocument
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // connect to your Atlas cluster
        var mongoClient = new MongoClient(MongoConnectionString);
        var airbnbDatabase = mongoClient.GetDatabase("sample_airbnb");
        var matViewCollection = airbnbDatabase.GetCollection<matViewDocument>("airbnb_mat_view");

        // define and run pipeline
        var results = matViewCollection.Aggregate()
            .Search(Builders<matViewDocument>.Search.Compound()
                .Should(Builders<matViewDocument>.Search.Autocomplete(airbnb => airbnb.maximumNumberOfNights, "3"))
                .Should(Builders<matViewDocument>.Search.Autocomplete(airbnb => airbnb.accommodatesNumber, "2")),
                indexName: "date-number-fields-tutorial")
            .Limit(5)
            .Project<matViewDocument>(Builders<matViewDocument>.Projection
                .Exclude(airbnb => airbnb.Id))
            .ToList();

        // print results
        foreach (var airbnb in results) 
        {
            Console.WriteLine(airbnb.ToJson());
        }
    }
}

[BsonIgnoreExtraElements]
public class matViewDocument 
{
    [BsonIgnoreIfDefault]
    public string Id { get; set; }
    public string lastScrapedDate { get; set; }
    public string propertyName { get; set; }
    public string propertyType { get; set; }
    public string accommodatesNumber { get; set; }
    public string maximumNumberOfNights { get; set; }
}
