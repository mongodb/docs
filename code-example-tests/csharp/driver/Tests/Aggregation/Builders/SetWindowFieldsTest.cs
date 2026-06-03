using DotNetEnv;
using MongoDB.Driver;
using Utilities.Comparison;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class SetWindowFieldsTest
{
    private MongoClient _client = null!;
    private readonly Examples.Aggregation.Builders.SetWindowFieldsExample
        _example = new();

    [SetUp]
    public void Setup()
    {
        var connectionString = Env.GetString("CONNECTION_STRING",
            "Set your CONNECTION_STRING in the .env file");
        _client = new MongoClient(connectionString);
        _example.LoadSampleData();
    }

    [Test]
    [Description(
        "Tests that RunSetWindowFieldsPipeline computes correct window "
        + "aggregation values for each locality partition")]
    public void TestRunSetWindowFieldsPipeline()
    {
        var results = _example.RunSetWindowFieldsPipeline();
        Expect.That(results).ShouldMatch(FullPath("SetWindowFieldsOutput.txt"));
    }

    [TearDown]
    public void TearDown()
    {
        _client.DropDatabase("test_setwindowfields");
        _client.Dispose();
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
