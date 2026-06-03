using Utilities.Comparison;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class MergeTest
{
    private Examples.Aggregation.Builders.MergeExample _example = null!;

    [SetUp]
    public void Setup()
    {
        _example = new Examples.Aggregation.Builders.MergeExample();
        _example.LoadSampleData();
    }

    [TearDown]
    public void TearDown()
    {
        _example.Dispose();
    }

    [Test]
    [Description("Tests that RunMergePipeline merges source documents into the target collection, replacing matched documents and inserting unmatched ones")]
    public void TestRunMergePipeline()
    {
        var results = _example.RunMergePipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("MergeOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
