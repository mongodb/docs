using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Driver;
namespace TestRun.Fundamentals;
public class CountDocuments
{
    private static IMongoCollection<Student> _myColl;
    private const string MongoConnectionString = "<connection string>";
    public static void Main(string[] args)
    {
        Setup();
        InsertSampleData();
        
        // start-accurate-ct
        var filter = Builders<Student>.Filter.Lt(s => s.FinalGrade, 80.0);
        var count1 = _myColl.CountDocuments(filter);
        Console.WriteLine("Number of documents with a final grade less than 80: " + count1);
        // end-accurate-ct

        // start-est-count
        var count2 = _myColl.EstimatedDocumentCount();
        Console.WriteLine("Estimated number of documents in the students collection: " + count2);
        // end-est-count

        // start-agg-count
        var matchStage = Builders<Student>
            .Filter.Gt(s => s.FinalGrade, 80);
        var result = _myColl.Aggregate().Match(matchStage).Count();
        Console.WriteLine("Number of documents with a final grade more than 80: "+result.First().Count);
        // end-agg-count
        
        _myColl.DeleteMany(Builders<Student>.Filter.Empty);
    }
    private static void InsertSampleData()
    {
        var studentList = new List<Student>()
        {
            new() { Id = 1, Name = "Jonathon Howard", FinalGrade = 87.5 },
            new() { Id = 2, Name = "Keisha Freeman", FinalGrade = 12.3 },
            new() { Id = 3, Name = "Wei Zhang", FinalGrade = 99.0 },
            new() { Id = 4, Name = "Juan Gonzalez", FinalGrade = 85.5 },
            new() { Id = 5, Name = "Erik Trout", FinalGrade = 72.3 },
            new() { Id = 6, Name = "Demarcus Smith", FinalGrade = 88.8 }
        };
        var options = new InsertManyOptions() { BypassDocumentValidation = true };
        _myColl.InsertMany(studentList, options);
    }
    private static void Setup()
    {
        // This allows automapping of the camelCase database fields to our models. 
        var camelCaseConvention = new ConventionPack { new CamelCaseElementNameConvention() };
        ConventionRegistry.Register("CamelCase", camelCaseConvention, type => true);

        // Establish the connection to MongoDB and get the restaurants database
        var mongoClient = new MongoClient(MongoConnectionString);
        var testDB = mongoClient.GetDatabase("test");
        _myColl = testDB.GetCollection<Student>("students");
	}
}
//start-student-struct
public class Student {
    public int Id { get; set; }
    public string Name { get; set; }
    public double FinalGrade { get; set; }
}
// end-student-struct