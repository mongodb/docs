using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.Aggregation.Builders;

[TestFixture]
public class ProjectTest
{
    private Examples.Aggregation.Builders.ProjectExample _example = null!;

    [SetUp]
    public void Setup()
    {
        _example = new Examples.Aggregation.Builders.ProjectExample();
    }

    [TearDown]
    public void TearDown()
    {
        _example.Dispose();
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunIncludePipeline produces the expected output")]
    public void TestRunIncludePipeline()
    {
        var results = _example.RunIncludePipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("IncludeOutput.txt"));
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunExcludeFieldsPipeline produces the expected output")]
    public void TestRunExcludeFieldsPipeline()
    {
        var results = _example.RunExcludeFieldsPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("ExcludeFieldsOutput.txt"));
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunExcludeIdPipeline produces the expected output")]
    public void TestRunExcludeIdPipeline()
    {
        var results = _example.RunExcludeIdPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("ExcludeIdOutput.txt"));
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunExcludeFieldsEmbeddedPipeline produces the expected output")]
    public void TestRunExcludeFieldsEmbeddedPipeline()
    {
        var results = _example.RunExcludeFieldsEmbeddedPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("ExcludeFieldsEmbeddedOutput.txt"));
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunExcludeFieldsConditionalPipeline produces the expected output")]
    public void TestRunExcludeFieldsConditionalPipeline()
    {
        var results = _example.RunExcludeFieldsConditionalPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("ExcludeFieldsConditionalOutput.txt"));
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunIncludeFieldsComputedPipeline produces the expected output")]
    public void TestRunIncludeFieldsComputedPipeline()
    {
        var results = _example.RunIncludeFieldsComputedPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("IncludeFieldsComputedOutput.txt"));
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunNewArrayFieldsPipeline produces the expected output")]
    public void TestRunNewArrayFieldsPipeline()
    {
        var results = _example.RunNewArrayFieldsPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("NewArrayFieldsOutput.txt"));
    }

    [Test]
    [RequiresSampleData("sample_mflix", new[] { "movies" })]
    [Description("Tests that RunNonExistentNewArrayFieldsPipeline produces the expected output")]
    public void TestRunNonExistentNewArrayFieldsPipeline()
    {
        var results = _example.RunNonExistentNewArrayFieldsPipeline();
        Expect.That(results)
            .WithOrderedSort()
            .ShouldMatch(FullPath("NonExistentNewArrayFieldsOutput.txt"));
    }

    private static string FullPath(string fileName)
    {
        var solutionRoot = $"{Directory.GetCurrentDirectory()}/../../../../";
        var outputLocation = $"Examples/Aggregation/Builders/OutputFiles/{fileName}";
        return Path.Combine(solutionRoot, outputLocation);
    }
}
