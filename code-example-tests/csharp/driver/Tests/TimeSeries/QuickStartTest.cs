using Examples.TimeSeries.QuickStart;
using MongoDB.Driver;

namespace Tests.TimeSeries;

public class QuickStartTest
{
    private IMongoClient _client;
    [SetUp]
    public void Setup()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(connectionString);
    }

    [Test]
    public void TestMetaFieldQueryOutputMatchesDocs()
    {
        var example = new Tutorial();
        example.LoadSampleData();
        var results = example.RunMetaFieldQuery();
        var serializedActualResults = TestUtils.SerializeResultsToStrings(results);

        var solutionRoot = DotNetEnv.Env.GetString("SOLUTION_ROOT", "Env variable not found. Verify you have a .env file with a valid connection string.");
        var outputLocation = "Examples/TimeSeries/QuickStart/MetaFieldQueryOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);
        var expectedLines = TestUtils.ReadLinesAsStrings(fullPath);
        TestUtils.ValidateUnorderedResults(expectedLines, serializedActualResults);
    }

    [Test]
    public void TestTimeFieldQueryOutputMatchesDocs()
    {
        var example = new Tutorial();
        example.LoadSampleData();
        var results = example.RunTimeFieldQuery();
        var serializedActualResults = TestUtils.SerializeResultsToStrings(results);

        var solutionRoot = DotNetEnv.Env.GetString("SOLUTION_ROOT", "Env variable not found. Verify you have a .env file with a valid connection string.");
        var outputLocation = "Examples/TimeSeries/QuickStart/TimeFieldQueryOutput.txt";
        var fullPath = Path.Combine(solutionRoot, outputLocation);
        var expectedLines = TestUtils.ReadLinesAsStrings(fullPath);
        TestUtils.ValidateUnorderedResults(expectedLines, serializedActualResults);
    }

    [TearDown]
    public void TearDown()
    {
        // Drop the database after the test completes  
        _client.DropDatabase("timeseries_db");
        _client.Dispose();
    }
}