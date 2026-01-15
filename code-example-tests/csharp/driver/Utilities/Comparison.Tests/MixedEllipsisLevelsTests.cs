using NUnit.Framework;

namespace Utilities.Comparison.Tests;

/// <summary>
///     Tests to verify C# handles mixing property-level and document-level ellipsis.
///     This feature was added to mongosh in commit 67d16af07bc.
///     Using QUOTED ellipsis to isolate this feature from unquoted ellipsis support.
/// </summary>
[TestFixture]
public class MixedEllipsisLevelsTests
{
    [Test]
    [Description("Tests mixing property-level ellipsis ('...' as value) with document-level ellipsis (standalone '...')")]
    public void ParseContent_PropertyEllipsisWithDocumentEllipsis_ParsesCorrectly()
    {
        // This pattern has:
        // 1. Property-level ellipsis: { _id: '...' } - matches any value for _id
        // 2. Document-level ellipsis: standalone '...' - allows extra fields in all objects
        var content = @"
{ _id: '...' , name: 'Carl' }
...
{ status: 'active' }
";

        var result = FileContentsParser.ParseContent(content);

        Assert.That(result.IsSuccess, Is.True, $"Parse failed: {result.Error}");
        Assert.That(result.Data, Is.Not.Null);
        Assert.That(result.Data.Count, Is.EqualTo(2), "Should have 2 documents (standalone ... is just a marker)");

        var firstDoc = result.Data[0] as Dictionary<string, object>;
        Assert.That(firstDoc, Is.Not.Null);
        Assert.That(firstDoc["_id"], Is.EqualTo("..."), "Property-level ellipsis should be preserved");
        Assert.That(firstDoc["name"], Is.EqualTo("Carl"));

        // The key question: Does standalone '...' add a global ellipsis marker?
        Assert.That(firstDoc.ContainsKey("..."), Is.True, "Should have global ellipsis marker from standalone '...'");
        Assert.That(firstDoc["..."], Is.EqualTo("..."));

        var secondDoc = result.Data[1] as Dictionary<string, object>;
        Assert.That(secondDoc, Is.Not.Null);
        Assert.That(secondDoc["status"], Is.EqualTo("active"));

        // Second document should also get the global ellipsis marker
        Assert.That(secondDoc.ContainsKey("..."), Is.True, "Should also have global ellipsis marker");
        Assert.That(secondDoc["..."], Is.EqualTo("..."));
    }

    [Test]
    [Description("Tests that property-level ellipsis works without document-level ellipsis")]
    public void ParseContent_PropertyEllipsisOnly_ParsesCorrectly()
    {
        var content = @"{ _id: '...' , name: 'Carl' }";

        var result = FileContentsParser.ParseContent(content);

        Assert.That(result.IsSuccess, Is.True);
        Assert.That(result.Data, Is.Not.Null);
        Assert.That(result.Data.Count, Is.EqualTo(1));

        var doc = result.Data[0] as Dictionary<string, object>;
        Assert.That(doc, Is.Not.Null);
        Assert.That(doc["_id"], Is.EqualTo("..."));
        Assert.That(doc["name"], Is.EqualTo("Carl"));

        // Without standalone '...', should NOT have global ellipsis marker
        Assert.That(doc.ContainsKey("..."), Is.False, "Should NOT have global ellipsis marker without standalone '...'");
    }

    [Test]
    [Description("Tests that document-level ellipsis works without property-level ellipsis")]
    public void ParseContent_DocumentEllipsisOnly_ParsesCorrectly()
    {
        var content = @"
{ name: 'Carl' }
...
{ status: 'active' }
";

        var result = FileContentsParser.ParseContent(content);

        Assert.That(result.IsSuccess, Is.True);
        Assert.That(result.Data, Is.Not.Null);
        Assert.That(result.Data.Count, Is.EqualTo(2));

        var firstDoc = result.Data[0] as Dictionary<string, object>;
        Assert.That(firstDoc, Is.Not.Null);
        Assert.That(firstDoc["name"], Is.EqualTo("Carl"));
        Assert.That(firstDoc.ContainsKey("..."), Is.True, "Should have global ellipsis marker");

        var secondDoc = result.Data[1] as Dictionary<string, object>;
        Assert.That(secondDoc, Is.Not.Null);
        Assert.That(secondDoc["status"], Is.EqualTo("active"));
        Assert.That(secondDoc.ContainsKey("..."), Is.True, "Should have global ellipsis marker");
    }

    [Test]
    [Description("Tests end-to-end comparison with mixed ellipsis levels")]
    public void Expect_MixedEllipsisLevels_MatchesCorrectly()
    {
        // Actual output with extra fields
        var actualOutput = new[]
        {
            new Dictionary<string, object>
            {
                { "_id", "507f1f77bcf86cd799439011" },
                { "name", "Carl" },
                { "email", "carl@example.com" },  // Extra field
                { "age", 30 }                      // Extra field
            },
            new Dictionary<string, object>
            {
                { "status", "active" },
                { "lastLogin", "2024-01-01" }      // Extra field
            }
        };

        // Expected with property-level ellipsis (_id: '...') AND document-level ellipsis (standalone '...')
        var expectedContent = @"
{ _id: '...' , name: 'Carl' }
...
{ status: 'active' }
";

        // This should match because:
        // 1. _id: '...' matches any value for _id
        // 2. Standalone '...' allows extra fields (email, age, lastLogin)
        Expect.That(actualOutput).ShouldMatch(expectedContent);
    }

    [Test]
    [Description("Tests that mixing works in arrays too")]
    public void ParseContent_MixedEllipsisInArray_ParsesCorrectly()
    {
        var content = @"[
  { _id: '...' , count: '...' },
  { _id: '...' , count: '...' },
  '...'
]";

        var result = FileContentsParser.ParseContent(content);

        Assert.That(result.IsSuccess, Is.True);
        Assert.That(result.Data, Is.Not.Null);
        Assert.That(result.Data.Count, Is.EqualTo(3), "Should have 2 objects + 1 ellipsis string");

        var firstDoc = result.Data[0] as Dictionary<string, object>;
        Assert.That(firstDoc, Is.Not.Null);
        Assert.That(firstDoc["_id"], Is.EqualTo("..."));
        Assert.That(firstDoc["count"], Is.EqualTo("..."));

        var secondDoc = result.Data[1] as Dictionary<string, object>;
        Assert.That(secondDoc, Is.Not.Null);
        Assert.That(secondDoc["_id"], Is.EqualTo("..."));
        Assert.That(secondDoc["count"], Is.EqualTo("..."));

        // Third element should be the ellipsis string (for array matching)
        Assert.That(result.Data[2], Is.EqualTo("..."));
    }
}

