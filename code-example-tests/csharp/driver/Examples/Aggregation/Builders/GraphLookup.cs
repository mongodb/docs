using DotNetEnv;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Examples.Aggregation.Builders;

// :snippet-start: employee-class
[BsonIgnoreExtraElements]
public class Employee
{
    [BsonId]
    public int Id { get; set; }

    [BsonElement("name")]
    public string Name { get; set; } = null!;

    [BsonElement("reportsTo")]
    public string? ReportsTo { get; set; }

    [BsonElement("hobbies")]
    public List<string> Hobbies { get; set; } = new();

    [BsonElement("reportingHierarchy")]
    public List<Employee> ReportingHierarchy { get; set; } = new();
}
// :snippet-end:

public class GraphLookupExample
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Set your CONNECTION_STRING in the .env file");
    private MongoClient _client = null!;
    private IMongoCollection<Employee> _collection = null!;
    public const string DbName = "graph_lookup_test";

    public void Initialize()
    {
        _client = new MongoClient(_uri);
        var db = _client.GetDatabase(DbName);
        db.DropCollection("employees");
        _collection = db.GetCollection<Employee>("employees");
        _collection.InsertMany(new[]
        {
            new Employee { Id = 1, Name = "Dev", Hobbies = new List<string> { "golf" } },
            new Employee { Id = 2, Name = "Eliot", ReportsTo = "Dev", Hobbies = new List<string> { "golf", "hiking" } },
            new Employee { Id = 3, Name = "Ron", ReportsTo = "Eliot" },
            new Employee { Id = 4, Name = "Andrew", ReportsTo = "Eliot", Hobbies = new List<string> { "golf" } },
            new Employee { Id = 5, Name = "Asya", ReportsTo = "Ron" },
            new Employee { Id = 6, Name = "Dan", ReportsTo = "Andrew" }
        });
    }

    public List<Employee> RunGraphLookupBasicPipeline()
    {
        // :snippet-start: graph-lookup-basic
        var pipeline = new EmptyPipelineDefinition<Employee>()
            .GraphLookup<Employee, Employee, Employee, string, string, string, List<Employee>, Employee>(
                from: _collection,
                connectFromField: e => e.ReportsTo!,
                connectToField: e => e.Name,
                startWith: e => e.ReportsTo!,
                @as: e => e.ReportingHierarchy);
        // :snippet-end:
        return _collection.Aggregate(pipeline).ToList();
    }

    public List<Employee> RunGraphLookupDepthPipeline()
    {
        // :snippet-start: graph-lookup-depth
        var pipeline = new EmptyPipelineDefinition<Employee>()
            .GraphLookup<Employee, Employee, Employee, string, string, string, List<Employee>, Employee>(
                from: _collection,
                connectFromField: e => e.ReportsTo!,
                connectToField: e => e.Name,
                startWith: e => e.ReportsTo!,
                @as: e => e.ReportingHierarchy,
                new AggregateGraphLookupOptions<Employee, Employee, Employee>
                {
                    MaxDepth = 1
                });
        // :snippet-end:
        return _collection.Aggregate(pipeline).ToList();
    }

    public List<Employee> RunGraphLookupMatchPipeline()
    {
        // :snippet-start: graph-lookup-match
        var pipeline = new EmptyPipelineDefinition<Employee>()
            .GraphLookup<Employee, Employee, Employee, string, string, string, List<Employee>, Employee>(
                from: _collection,
                connectFromField: e => e.ReportsTo!,
                connectToField: e => e.Name,
                startWith: e => e.ReportsTo!,
                @as: e => e.ReportingHierarchy,
                new AggregateGraphLookupOptions<Employee, Employee, Employee>
                {
                    MaxDepth = 1,
                    RestrictSearchWithMatch = Builders<Employee>.Filter.AnyEq(
                        e => e.Hobbies, "golf")
                });
        // :snippet-end:
        return _collection.Aggregate(pipeline).ToList();
    }

    public void Cleanup()
    {
        _client?.DropDatabase(DbName);
        _client?.Dispose();
    }
}
