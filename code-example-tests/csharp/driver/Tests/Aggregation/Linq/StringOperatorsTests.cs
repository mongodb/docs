using Utilities.Comparison;
using Utilities.SampleData;
using Utilities.ServerVersion;

namespace Tests.Aggregation.Linq;

[TestFixture]
public class StringOperatorsTests
{
    private Examples.Aggregation.Linq.StringOperators _example = null!;

    [SetUp]
    [Description("Initializes the StringOperators example instance before each test")]
    public void Setup()
    {
        _example = new Examples.Aggregation.Linq.StringOperators();
    }

    [TearDown]
    [Description("Disposes the MongoDB client after each test")]
    public void TearDown()
    {
        _example.Dispose();
    }

    [Test]
    [Description("Verifies string.Replace() translates to $replaceAll.")]
    [RequiresSampleData("sample_restaurants", new[] { "restaurants" })]
    public void TestStringReplace()
    {
        var results = _example.StringReplace();
        Expect.That(results.Count).ShouldMatch(1);
        var doc = results[0];
        Expect.That(doc["name"].AsString.Contains("Cafe")).ShouldMatch(true);
        Expect.That(doc["updated"].AsString.Contains("Coffee Shop")).ShouldMatch(true);
    }

    [Test]
    [Description("Verifies static Regex.Replace() translates to $replaceAll.")]
    [RequiresSampleData("sample_restaurants", new[] { "restaurants" })]
    [RequiresMinimumServerVersion("8.3.0")]
    public void TestRegexReplaceStatic()
    {
        var results = _example.RegexReplaceStatic();
        Expect.That(results.Count).ShouldMatch(1);
        var doc = results[0];
        Expect.That(doc["name"].AsString.ToLower().Contains("cafe")).ShouldMatch(true);
        Expect.That(doc["updated"].AsString.Contains("Coffee Shop")).ShouldMatch(true);
    }

    [Test]
    [Description("Verifies instance Regex.Replace() translates to $replaceAll.")]
    [RequiresSampleData("sample_restaurants", new[] { "restaurants" })]
    [RequiresMinimumServerVersion("8.3.0")]
    public void TestRegexReplaceInstance()
    {
        var results = _example.RegexReplaceInstance();
        Expect.That(results.Count).ShouldMatch(1);
        var doc = results[0];
        Expect.That(doc["name"].AsString.ToLower().Contains("cafe")).ShouldMatch(true);
        Expect.That(doc["updated"].AsString.Contains("Coffee Shop")).ShouldMatch(true);
    }

    [Test]
    [Description("Verifies string.Split() translates to $split.")]
    [RequiresSampleData("sample_restaurants", new[] { "restaurants" })]
    public void TestStringSplit()
    {
        var results = _example.StringSplit();
        Expect.That(results.Count).ShouldMatch(1);
        var parts = results[0]["parts"].AsBsonArray;
        Expect.That(parts.Count > 1).ShouldMatch(true);
        Expect.That(string.Join(",", parts.Select(p => p.AsString)))
            .ShouldMatch(results[0]["cuisine"].AsString);
    }

    [Test]
    [Description("Verifies string.Split() with RemoveEmptyEntries translates to $split.")]
    [RequiresSampleData("sample_restaurants", new[] { "restaurants" })]
    public void TestStringSplitRemoveEmpty()
    {
        var results = _example.StringSplitRemoveEmpty();
        Expect.That(results.Count).ShouldMatch(1);
        var parts = results[0]["parts"].AsBsonArray;
        Expect.That(parts.Count > 1).ShouldMatch(true);
        Expect.That(parts.Select(p => p.AsString).All(s => !string.IsNullOrEmpty(s))).ShouldMatch(true);
    }

    [Test]
    [Description("Verifies static Regex.Split() translates to $split.")]
    [RequiresSampleData("sample_restaurants", new[] { "restaurants" })]
    [RequiresMinimumServerVersion("8.3.0")]
    public void TestRegexSplit()
    {
        var results = _example.RegexSplit();
        Expect.That(results.Count).ShouldMatch(1);
        var parts = results[0]["parts"].AsBsonArray;
        Expect.That(parts.Count > 1).ShouldMatch(true);
        Expect.That(parts.Select(p => p.AsString).All(s => !s.Contains(","))).ShouldMatch(true);
    }
}
