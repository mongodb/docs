using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;

public class EmbeddedDocumentsFacetExample
{
    private const string MongoConnectionString = "<connection-string>";

    public static void Main(string[] args)
    {
        // allow automapping of the camelCase database fields to our MovieDocument
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // connect to your Atlas cluster
        var mongoClient = new MongoClient(MongoConnectionString);
        var districtDatabase = mongoClient.GetDatabase("local_school_district");
        var schoolCollection = districtDatabase.GetCollection<SchoolDocument>("schools");

        // define and run pipeline
        var results = schoolCollection.Aggregate()
            .SearchMeta(Builders<SchoolDocument>.Search.Facet(
                    Builders<SchoolDocument>.Search.Text(school => school.Name, "High"),
                    Builders<SchoolDocument>.SearchFacet.String("gradeFacet", "teachers.classes.grade")),
                    indexName: "embedded-documents-tutorial")
            .Single();

        // print results
        Console.WriteLine(results.ToJson());
    }
}

[BsonIgnoreExtraElements]
public class SchoolDocument
{
    public int Id { get; set; }
    public string Name { get; set; }
    public TeacherDocument[] Teachers { get; set; }
}
[BsonIgnoreExtraElements]
public class TeacherDocument
{
    public ClassDocument[] Classes { get; set; }
}
[BsonIgnoreExtraElements]
public class ClassDocument
{
    public string Grade { get; set; }
}