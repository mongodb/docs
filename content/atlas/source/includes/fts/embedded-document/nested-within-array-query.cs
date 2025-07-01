using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class NestedArrayWithinArrayExample
{
    private const string MongoConnectionString = "<connection-string>";

    public static void Main(string[] args)
    {
        // allow automapping of the camelCase database fields to our SchoolDocument
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // connect to your Atlas cluster
        var mongoClient = new MongoClient(MongoConnectionString);
        var districtSchoolsDatabase = mongoClient.GetDatabase("local_school_district");
        var schoolsCollection = districtSchoolsDatabase.GetCollection<SchoolDocument>("schools");

        // define variables for query 
        var mustQuery = Builders<ClassDocument>.Search.Compound()
            .Must(Builders<ClassDocument>.Search.Text(classes => classes.Grade, "12th"), Builders<ClassDocument>.Search.Text(classes => classes.Subject, "science"));
        var compoundQuery = Builders<TeacherDocument>.Search.Compound()
            .Must(Builders<TeacherDocument>.Search.EmbeddedDocument(teacher => teacher.Classes, mustQuery))
            .Should(Builders<TeacherDocument>.Search.Text(teacher => teacher.Last, "smith"));
        var opts = new SearchHighlightOptions<SchoolDocument>("teachers.classes.subject");

        // define and run pipeline
        var results = schoolsCollection.Aggregate()
            .Search(Builders<SchoolDocument>.Search.EmbeddedDocument(
                school => school.Teachers, compoundQuery), opts,
                indexName: "embedded-documents-tutorial"
            )
            .Project<SchoolDocument>(Builders<SchoolDocument>.Projection
                .Include(school => school.Teachers)
                .MetaSearchScore(school => school.Score)
                .MetaSearchHighlights("highlights"))
            .ToList();

        // print results
        foreach (var school in results)
        {
            Console.WriteLine(school.ToJson());
        }
    }
}

[BsonIgnoreExtraElements]
public class SchoolDocument
{
    public int Id { get; set; }
    public TeacherDocument[] Teachers { get; set; }
    [BsonElement("highlights")]
    public List<SearchHighlight> Highlights { get; set; }
    public double Score { get; set; }
}

[BsonIgnoreExtraElements]
public class TeacherDocument
{
    public string First { get; set; }
    public string Last { get; set; }
    public ClassDocument[] Classes { get; set; }
}

[BsonIgnoreExtraElements]
public class ClassDocument
{
    public string Subject { get; set; }
    public string Grade { get; set; }
}