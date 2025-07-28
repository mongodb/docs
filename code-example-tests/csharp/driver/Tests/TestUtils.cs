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
        return File.ReadAllLines(filePath).ToList(); // Read file content as a list of strings  
    }

    private static string NormalizeWhitespace(string input)
    {
        return Regex.Replace(input.Trim(), @"\s+", " "); // Replace multiple spaces with a single space  
    }

    private static string NormalizeCase(string input)
    {
        return input.ToLowerInvariant(); // Normalize string to lowercase for case-insensitive comparison  
    }

    private static HashSet<string> NormalizeLinesToSet(List<string> lines)
    {
        return new HashSet<string>(lines.Select(line => NormalizeWhitespace(NormalizeCase(line))));
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
        var expectedSet = NormalizeLinesToSet(expectedLines);
        var actualSet = NormalizeLinesToSet(actualLines);

        // Find differences  
        var missingLines = expectedSet.Except(actualSet).ToList(); // Lines in expected but not in actual  
        var extraLines = actualSet.Except(expectedSet).ToList(); // Lines in actual but not in expected  

        Assert.That(missingLines.Count, Is.EqualTo(0), $"Missing lines:\n{string.Join("\n", missingLines)}");
        Assert.That(extraLines.Count, Is.EqualTo(0), $"Extra lines:\n{string.Join("\n", extraLines)}");

        // Log detailed information to NUnit's test context for drill-down diagnostics  
        TestContext.Out.WriteLine($"Test completed successfully.");
        TestContext.Out.WriteLine($"Expected total lines: {expectedSet.Count}");
        TestContext.Out.WriteLine($"Actual total lines: {actualSet.Count}");
        TestContext.Out.WriteLine("Every line in the actual output had a matching line in the expected output file.");
    }
}
