using System.Diagnostics;
using MongoDB.Bson;
using MongoDB.Driver;

namespace Utilities.SearchIndex;

/// <summary>
///     Utility for waiting on Atlas Search indexes to become queryable.
///     Atlas Search indexes are asynchronous — CreateOne() returns immediately,
///     but the index isn't queryable until it finishes building. This class
///     polls the index status until it reports as queryable or a timeout is reached.
/// </summary>
public static class SearchIndexChecker
{
    public static readonly TimeSpan DefaultTimeout = TimeSpan.FromSeconds(120);
    public static readonly TimeSpan DefaultPollInterval = TimeSpan.FromSeconds(2);

    /// <summary>
    ///     Waits for a search index to become queryable by polling SearchIndexes.List().
    ///     Returns true if the index became queryable within the timeout, false otherwise.
    /// </summary>
    /// <param name="collection">The collection the search index belongs to</param>
    /// <param name="indexName">The name of the search index to wait for</param>
    /// <param name="timeout">Maximum time to wait (default: 120 seconds)</param>
    /// <param name="pollInterval">Time between status checks (default: 2 seconds)</param>
    /// <param name="cancellationToken">Cancellation token</param>
    /// <returns>True if the index became queryable, false if the timeout was reached</returns>
    public static async Task<bool> WaitForIndexAsync(
        IMongoCollection<BsonDocument> collection,
        string indexName,
        TimeSpan? timeout = null,
        TimeSpan? pollInterval = null,
        CancellationToken cancellationToken = default)
    {
        var resolvedTimeout = timeout ?? DefaultTimeout;
        var resolvedPollInterval = pollInterval ?? DefaultPollInterval;
        var stopwatch = Stopwatch.StartNew();

        Console.WriteLine($"Waiting for search index '{indexName}' to become queryable (timeout: {resolvedTimeout.TotalSeconds}s)...");

        while (stopwatch.Elapsed < resolvedTimeout)
        {
            cancellationToken.ThrowIfCancellationRequested();

            try
            {
                using var cursor = await collection.SearchIndexes.ListAsync(indexName, null, cancellationToken);
                var indexes = await cursor.ToListAsync(cancellationToken);

                var index = indexes.FirstOrDefault(i =>
                    i.Contains("name") && i["name"].AsString == indexName);

                if (index != null && index.Contains("queryable") && index["queryable"].AsBoolean)
                {
                    Console.WriteLine(
                        $"Search index '{indexName}' is now queryable (took {stopwatch.Elapsed.TotalSeconds:F1}s)");
                    return true;
                }

                var status = index != null && index.Contains("status")
                    ? index["status"].AsString
                    : "NOT FOUND";

                Console.WriteLine(
                    $"  Index '{indexName}' status: {status} ({stopwatch.Elapsed.TotalSeconds:F1}s elapsed)");
            }
            catch (MongoCommandException ex) when (ex.CodeName == "InvalidNamespace" ||
                                                    ex.Code == 26 /* NamespaceNotFound */)
            {
                Console.WriteLine($"  Collection or namespace not yet available ({stopwatch.Elapsed.TotalSeconds:F1}s elapsed)");
            }
            catch (TimeoutException)
            {
                Console.WriteLine($"  Server unreachable ({stopwatch.Elapsed.TotalSeconds:F1}s elapsed)");
            }

            await Task.Delay(resolvedPollInterval, cancellationToken);
        }

        Console.WriteLine(
            $"Timed out waiting for search index '{indexName}' after {resolvedTimeout.TotalSeconds}s");
        return false;
    }

    /// <summary>
    ///     Waits for a search index on a typed collection to become queryable.
    /// </summary>
    public static Task<bool> WaitForIndexAsync<T>(
        IMongoCollection<T> collection,
        string indexName,
        TimeSpan? timeout = null,
        TimeSpan? pollInterval = null,
        CancellationToken cancellationToken = default)
    {
        var bsonCollection = collection.Database
            .GetCollection<BsonDocument>(collection.CollectionNamespace.CollectionName);
        return WaitForIndexAsync(bsonCollection, indexName, timeout, pollInterval, cancellationToken);
    }

    /// <summary>
    ///     Waits for a search index to become queryable, throwing TimeoutException if it doesn't.
    ///     Use this in tests where a non-ready index should be a test failure.
    /// </summary>
    public static async Task EnsureIndexReadyAsync(
        IMongoCollection<BsonDocument> collection,
        string indexName,
        TimeSpan? timeout = null,
        TimeSpan? pollInterval = null,
        CancellationToken cancellationToken = default)
    {
        var ready = await WaitForIndexAsync(collection, indexName, timeout, pollInterval, cancellationToken);
        if (!ready)
            throw new TimeoutException(
                $"Search index '{indexName}' did not become queryable within {(timeout ?? DefaultTimeout).TotalSeconds}s");
    }

    /// <summary>
    ///     Waits for a search index on a typed collection to become queryable, throwing on timeout.
    /// </summary>
    public static async Task EnsureIndexReadyAsync<T>(
        IMongoCollection<T> collection,
        string indexName,
        TimeSpan? timeout = null,
        TimeSpan? pollInterval = null,
        CancellationToken cancellationToken = default)
    {
        var bsonCollection = collection.Database
            .GetCollection<BsonDocument>(collection.CollectionNamespace.CollectionName);
        await EnsureIndexReadyAsync(bsonCollection, indexName, timeout, pollInterval, cancellationToken);
    }
}