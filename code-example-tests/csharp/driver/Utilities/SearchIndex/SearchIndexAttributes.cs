using MongoDB.Bson;
using MongoDB.Driver;
using NUnit.Framework;

namespace Utilities.SearchIndex;

/// <summary>
///     NUnit attribute that marks tests as requiring a specific search index.
///     Works with SearchIndexTestHelper to conditionally skip tests.
/// </summary>
/// <example>
///     <code>
/// [Test]
/// [RequiresSearchIndex("my_search_index")]
/// public async Task TestSearchQuery()
/// {
///     SearchIndexTestHelper.EnsureSearchIndexOrSkip(_collection, "my_search_index");
///     // Test runs only if index is queryable...
/// }
/// </code>
/// </example>
[AttributeUsage(AttributeTargets.Method | AttributeTargets.Class)]
public class RequiresSearchIndexAttribute : Attribute
{
    public RequiresSearchIndexAttribute(string indexName)
    {
        IndexName = indexName;
    }

    /// <summary>
    ///     The name of the search index required by the test.
    /// </summary>
    public string IndexName { get; }

    /// <summary>
    ///     Optional description of the index type (e.g., "search", "vectorSearch")
    ///     for documentation purposes in test output.
    /// </summary>
    public string? IndexType { get; set; }
}

/// <summary>
///     Helper class to wait for search index readiness and skip tests when indexes aren't available.
/// </summary>
public static class SearchIndexTestHelper
{
    /// <summary>
    ///     Waits for a search index to become queryable, or skips the test with Assert.Ignore()
    ///     if the index doesn't become ready within the timeout.
    ///     Use this in [SetUp] or at the start of a [Test] method.
    /// </summary>
    /// <param name="collection">The collection the search index belongs to</param>
    /// <param name="indexName">The name of the search index to wait for</param>
    /// <param name="timeout">Maximum time to wait (default: 120 seconds)</param>
    /// <param name="pollInterval">Time between status checks (default: 2 seconds)</param>
    public static void EnsureSearchIndexOrSkip(
        IMongoCollection<BsonDocument> collection,
        string indexName,
        TimeSpan? timeout = null,
        TimeSpan? pollInterval = null)
    {
        bool ready;
        try
        {
            ready = Task.Run(async () =>
                await SearchIndexChecker.WaitForIndexAsync(collection, indexName, timeout, pollInterval)
            ).GetAwaiter().GetResult();
        }
        catch (MongoCommandException ex)
        {
            var message =
                $"Search index '{indexName}' is not available because this environment does not support Atlas Search indexes. Skipping test. MongoDB command error: {ex.Message}";
            Console.WriteLine($"\n  {message}");
            Assert.Ignore(message);
            return;
        }
        catch (TimeoutException)
        {
            var message = $"Search index '{indexName}' check timed out because MongoDB is not reachable. Skipping test.";
            Console.WriteLine($"\n  {message}");
            Assert.Ignore(message);
            return;
        }

        if (!ready)
        {
            var resolvedTimeout = timeout ?? SearchIndexChecker.DefaultTimeout;
            var message =
                $"Search index '{indexName}' did not become queryable within {resolvedTimeout.TotalSeconds}s. Skipping test.";
            Console.WriteLine($"\n  {message}");
            Assert.Ignore(message);
        }
    }

    /// <summary>
    ///     Waits for a search index on a typed collection to become queryable, or skips the test.
    /// </summary>
    public static void EnsureSearchIndexOrSkip<T>(
        IMongoCollection<T> collection,
        string indexName,
        TimeSpan? timeout = null,
        TimeSpan? pollInterval = null)
    {
        var bsonCollection = collection.Database
            .GetCollection<BsonDocument>(collection.CollectionNamespace.CollectionName);
        EnsureSearchIndexOrSkip(bsonCollection, indexName, timeout, pollInterval);
    }
}