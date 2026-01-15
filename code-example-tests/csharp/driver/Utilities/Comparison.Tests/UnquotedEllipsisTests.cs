using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
///     Tests to verify C# handles unquoted ellipsis patterns similar to mongosh commit 67d16af07bc.
///     This commit added support for:
///     1. Unquoted ellipsis as property values: { _id: ... , count: ... }
///     2. Mixing property-level and document-level ellipsis
/// </summary>
[TestFixture]
public class UnquotedEllipsisTests
{
    [Test]
    [Description("Tests that unquoted ellipsis as property values are parsed correctly")]
    public void ParseContent_UnquotedEllipsisAsPropertyValue_ParsesCorrectly()
    {
        // This is the exact pattern from mongosh commit 67d16af07bc
        var content = @"[
  { _id: ... , count: ... },
  { _id: ... , count: ... }
]";

        var result = FileContentsParser.ParseContent(content);

        Assert.That(result.IsSuccess, Is.True, $"Parse failed: {result.Error}");
        Assert.That(result.Data, Is.Not.Null);
        Assert.That(result.Data.Count, Is.EqualTo(2));

        var firstDoc = result.Data[0] as Dictionary<string, object>;
        Assert.That(firstDoc, Is.Not.Null);
        Assert.That(firstDoc["_id"], Is.EqualTo("..."));
        Assert.That(firstDoc["count"], Is.EqualTo("..."));
    }

    [Test]
    [Description("Tests mixing property-level ellipsis with array-level ellipsis")]
    public void ParseContent_MixedPropertyAndArrayEllipsis_ParsesCorrectly()
    {
        // This pattern mixes property-level ellipsis ({ _id: ... }) with array-level ellipsis (standalone ...)
        var content = @"[
  { _id: ... , count: ... },
  { _id: ... , count: ... },
  ...
]";

        var result = FileContentsParser.ParseContent(content);

        Assert.That(result.IsSuccess, Is.True, $"Parse failed: {result.Error}");
        Assert.That(result.Data, Is.Not.Null);

        // Should have 3 elements: two objects and the ellipsis string
        Assert.That(result.Data.Count, Is.EqualTo(3));

        var firstDoc = result.Data[0] as Dictionary<string, object>;
        Assert.That(firstDoc, Is.Not.Null);
        Assert.That(firstDoc["_id"], Is.EqualTo("..."));
        Assert.That(firstDoc["count"], Is.EqualTo("..."));

        var secondDoc = result.Data[1] as Dictionary<string, object>;
        Assert.That(secondDoc, Is.Not.Null);
        Assert.That(secondDoc["_id"], Is.EqualTo("..."));
        Assert.That(secondDoc["count"], Is.EqualTo("..."));

        // Third element should be the ellipsis marker
        Assert.That(result.Data[2], Is.EqualTo("..."));
    }

    [Test]
    [Description("Tests that both quoted and unquoted ellipsis work equivalently")]
    public void ParseContent_QuotedAndUnquotedEllipsis_AreEquivalent()
    {
        var unquotedContent = @"{ _id: ... , count: ... }";
        var quotedContent = @"{ _id: '...' , count: '...' }";

        var unquotedResult = FileContentsParser.ParseContent(unquotedContent);
        var quotedResult = FileContentsParser.ParseContent(quotedContent);

        Assert.That(unquotedResult.IsSuccess, Is.True);
        Assert.That(quotedResult.IsSuccess, Is.True);

        var unquotedDoc = unquotedResult.Data![0] as Dictionary<string, object>;
        var quotedDoc = quotedResult.Data![0] as Dictionary<string, object>;

        Assert.That(unquotedDoc!["_id"], Is.EqualTo(quotedDoc!["_id"]));
        Assert.That(unquotedDoc["count"], Is.EqualTo(quotedDoc["count"]));
    }

    [Test]
    [Description("Tests mixing property-level ellipsis with document-level ellipsis (global ellipsis)")]
    public void ParseContent_PropertyEllipsisWithGlobalEllipsis_ParsesCorrectly()
    {
        // This tests the pattern where you have both property-level ellipsis AND document-level ellipsis
        var content = @"
{ _id: ... , name: 'Carl' }
...
{ status: 'active' }
";

        var result = FileContentsParser.ParseContent(content);

        Assert.That(result.IsSuccess, Is.True, $"Parse failed: {result.Error}");
        Assert.That(result.Data, Is.Not.Null);
        Assert.That(result.Data.Count, Is.EqualTo(2)); // Two documents (standalone ... is just a marker)

        var firstDoc = result.Data[0] as Dictionary<string, object>;
        Assert.That(firstDoc, Is.Not.Null);
        Assert.That(firstDoc["_id"], Is.EqualTo("..."));
        Assert.That(firstDoc["name"], Is.EqualTo("Carl"));
        // Should have global ellipsis marker added
        Assert.That(firstDoc.ContainsKey("..."), Is.True);
        Assert.That(firstDoc["..."], Is.EqualTo("..."));

        var secondDoc = result.Data[1] as Dictionary<string, object>;
        Assert.That(secondDoc, Is.Not.Null);
        Assert.That(secondDoc["status"], Is.EqualTo("active"));
        // Should also have global ellipsis marker
        Assert.That(secondDoc.ContainsKey("..."), Is.True);
        Assert.That(secondDoc["..."], Is.EqualTo("..."));
    }

    [Test]
    [Description("Tests end-to-end comparison with unquoted ellipsis patterns")]
    public void Expect_UnquotedEllipsisPattern_MatchesCorrectly()
    {
        // Simulate actual output from MongoDB
        var actualOutput = new[]
        {
            new Dictionary<string, object>
            {
                { "_id", "507f1f77bcf86cd799439011" },
                { "count", 42 }
            },
            new Dictionary<string, object>
            {
                { "_id", "507f1f77bcf86cd799439012" },
                { "count", 17 }
            }
        };

        // Expected output with unquoted ellipsis
        var expectedContent = @"[
  { _id: ... , count: 42 },
  { _id: ... , count: 17 }
]";

        Expect.That(actualOutput).ShouldMatch(expectedContent);
    }
}

