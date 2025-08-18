using System.Text.RegularExpressions;
using MongoDB.Bson;

public static class TestUtils
{
    public static BsonDocument[] ReadBsonDocumentsFromFile(string filePath)
    {
        var bsonDocuments = new List<BsonDocument>();

        foreach (var line in File.ReadLines(filePath))
        {
            if (!string.IsNullOrWhiteSpace(line))
            {
                var bsonDoc = BsonDocument.Parse(line);
                bsonDocuments.Add(bsonDoc);
            }
        }

        return bsonDocuments.ToArray();
    }

    public static List<string> ReadLinesAsStrings(string filePath)
    {
        // Read file content as a list of strings
        return File.ReadAllLines(filePath).ToList();
    }

    private static string NormalizeWhitespace(string input)
    {
        // Replace multiple spaces with a single space
        return Regex.Replace(input.Trim(), @"\s+", " ");
    }

    private static string NormalizeCase(string input)
    {
        // Normalize string to lowercase for case-insensitive comparison
        return input.ToLowerInvariant();
    }

    private static HashSet<string> NormalizeLinesToSet(List<string> lines)
    {
        return new HashSet<string>(lines.Select(line => NormalizeWhitespace(NormalizeCase(SortFieldsInSerializedObject(line)))));
    }

    private static string SortFieldsInSerializedObject(string serializedObject)
    {
        try
        {
            // Try to parse the string into a BSON document
            var bsonDoc = BsonDocument.Parse(serializedObject);

            // Create a new BSON document with sorted fields
            var sortedDoc = new BsonDocument(bsonDoc.OrderBy(kvp => kvp.Name));

            // Convert the sorted BSON document back into a normalized JSON string
            return sortedDoc.ToJson();
        }
        catch (FormatException)
        {
            // Fallback: If parsing fails, treat the original serializedObject as a plain string
            // In such cases, it can't be normalized for ordering reliably
            return serializedObject;
        }
    }

    public static List<string> SerializeResultsToStrings<T>(List<T> results)
    {
        return results.Select(r => r?.ToString() ?? string.Empty).ToList();
    }

    public static void ValidateUnorderedResults(
        List<string> expectedLines,
        List<string> actualLines
    )
    {
        // Normalize expected lines (including sorting fields)
        var expectedSet = NormalizeLinesToSet(expectedLines);
        // Normalize actual lines (including sorting fields)
        var actualSet = NormalizeLinesToSet(actualLines);

        // Find differences
        // Lines in expected but not in actual
        var missingLines = expectedSet.Except(actualSet).ToList();
        // Lines in actual but not in expected
        var extraLines = actualSet.Except(expectedSet).ToList();

        Assert.That(missingLines.Count, Is.EqualTo(0), $"Missing lines:\n{string.Join("\n", missingLines)}");
        Assert.That(extraLines.Count, Is.EqualTo(0), $"Extra lines:\n{string.Join("\n", extraLines)}");

        // Log detailed information to NUnit's test context for drill-down diagnostics
        TestContext.Out.WriteLine($"Test completed successfully.");
        TestContext.Out.WriteLine($"Expected total lines: {expectedSet.Count}");
        TestContext.Out.WriteLine($"Actual total lines: {actualSet.Count}");
        TestContext.Out.WriteLine("Every line in the actual output had a matching line in the expected output file.");
    }
}
