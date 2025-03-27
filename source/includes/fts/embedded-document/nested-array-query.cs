using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
using MongoDB.Driver.Search;

public class NestedArrayExample
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
        var compoundQuery = Builders<TeacherDocument>.Search.Compound()
            .Must(Builders<TeacherDocument>.Search.Text(teacher => teacher.First, "John"))
            .Should(Builders<TeacherDocument>.Search.Text(teacher => teacher.Last, "Smith"));
        var opts = new SearchHighlightOptions<SchoolDocument>(school => school.Teachers.Select(teacher => teacher.Last));;

        // define and run pipeline
        var results = schoolsCollection.Aggregate()
            .Search(Builders<SchoolDocument>.Search.EmbeddedDocument(
                school => school.Teachers, compoundQuery), opts,
                indexName: "embedded-documents-tutorial"
            )
            .Project<SchoolDocument>(Builders<SchoolDocument>.Projection
                .Include(school => school.Name)
                .Include(school => school.Mascot)
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
    public string Name { get; set; }
    public string Mascot { get; set; }
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