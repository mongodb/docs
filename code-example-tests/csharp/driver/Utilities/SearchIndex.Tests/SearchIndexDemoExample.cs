// ============================================================================
// DEMO: How to use SearchIndexChecker in a test
//
// This file illustrates the intended usage patterns for the search index
// polling helper. It is NOT a runnable test in this repo — it serves as a
// reference for teams adding Atlas Search or Vector Search examples to the
// C# test suite.
// ============================================================================

using MongoDB.Bson;
using MongoDB.Driver;
using NUnit.Framework;
using Utilities.SearchIndex;

namespace Utilities.SearchIndex.Tests;

// ---------------------------------------------------------------------------
// Pattern 1: Hard failure — index MUST be ready or the test fails
// ---------------------------------------------------------------------------
// Use this when running against an environment that supports Atlas Search
// (e.g., atlas-local in Docker CI). A non-ready index is a real failure.

[TestFixture]
public class AtlasSearchExampleTests
{
    private IMongoClient _client = null!;
    private IMongoCollection<BsonDocument> _collection = null!;
    private const string IndexName = "demo_search_index";
    private const string DatabaseName = "test_search_demo";

    [SetUp]
    public void SetUp()
    {
        DotNetEnv.Env.TraversePath().Load();
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        _client = new MongoClient(connectionString);
        _collection = _client.GetDatabase(DatabaseName)
            .GetCollection<BsonDocument>("movies");
    }

    [TearDown]
    public void TearDown()
    {
        try { _collection.SearchIndexes.DropOne(IndexName); } catch { }
        try { _client.DropDatabase(DatabaseName); } catch { }
        _client.Dispose();
    }

    [Test]
    [Description("Creates an Atlas Search index, waits for it, and runs a $search query.")]
    public async Task TestAtlasSearchQuery()
    {
        // 1. Insert sample data
        await _collection.InsertManyAsync(new[]
        {
            new BsonDocument { { "title", "The Shawshank Redemption" }, { "year", 1994 } },
            new BsonDocument { { "title", "The Godfather" }, { "year", 1972 } },
            new BsonDocument { { "title", "The Dark Knight" }, { "year", 2008 } }
        });

        // 2. Create the search index (returns immediately — index builds async)
        var definition = new BsonDocument
        {
            { "mappings", new BsonDocument { { "dynamic", true } } }
        };
        var model = new CreateSearchIndexModel(IndexName, SearchIndexType.Search, definition);
        _collection.SearchIndexes.CreateOne(model);

        // 3. Wait for the index to become queryable
        await SearchIndexChecker.EnsureIndexReadyAsync(_collection, IndexName);

        // 4. Now safe to run a $search query
        var results = _collection.Aggregate()
            .Search(Builders<BsonDocument>.Search.Text("title", "Godfather"))
            .ToList();

        Assert.That(results, Has.Count.EqualTo(1));
        Assert.That(results[0]["title"].AsString, Is.EqualTo("The Godfather"));
    }
}

// ---------------------------------------------------------------------------
// Pattern 2: Soft skip — skip the test if the index can't be built
// ---------------------------------------------------------------------------
// Use this when the test environment might not support Atlas Search
// (e.g., running locally against a standalone mongod).

[TestFixture]
public class OptionalSearchFeatureTests
{
    private IMongoClient _client = null!;
    private IMongoCollection<BsonDocument> _collection = null!;
    private const string IndexName = "demo_optional_index";
    private const string DatabaseName = "test_search_optional";

    [SetUp]
    public void SetUp()
    {
        DotNetEnv.Env.TraversePath().Load();
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        _client = new MongoClient(connectionString);
        _collection = _client.GetDatabase(DatabaseName)
            .GetCollection<BsonDocument>("planets");
    }

    [TearDown]
    public void TearDown()
    {
        try { _collection.SearchIndexes.DropOne(IndexName); } catch { }
        try { _client.DropDatabase(DatabaseName); } catch { }
        _client.Dispose();
    }

    [Test]
    [RequiresSearchIndex(IndexName)]
    [Description("Runs only if the search index is available; skips gracefully otherwise.")]
    public async Task TestSearchWithGracefulSkip()
    {
        // Insert data and create index
        await _collection.InsertManyAsync(new[]
        {
            new BsonDocument { { "name", "Saturn" }, { "hasRings", true } },
            new BsonDocument { { "name", "Mars" }, { "hasRings", false } }
        });

        var definition = new BsonDocument
        {
            { "mappings", new BsonDocument { { "dynamic", true } } }
        };
        var model = new CreateSearchIndexModel(IndexName, SearchIndexType.Search, definition);

        try
        {
            _collection.SearchIndexes.CreateOne(model);
        }
        catch (MongoCommandException)
        {
            Assert.Ignore("Environment does not support Atlas Search indexes.");
        }

        // This will wait for readiness, or skip the test on timeout
        SearchIndexTestHelper.EnsureSearchIndexOrSkip(_collection, IndexName);

        // If we reach here, the index is ready
        var results = _collection.Aggregate()
            .Search(Builders<BsonDocument>.Search.Equals("hasRings", true))
            .ToList();

        Assert.That(results, Has.Count.EqualTo(1));
        Assert.That(results[0]["name"].AsString, Is.EqualTo("Saturn"));
    }
}

// ---------------------------------------------------------------------------
// Pattern 3: Fixture-level setup — one index shared across multiple tests
// ---------------------------------------------------------------------------
// Use this when multiple tests in a fixture all query the same search index.
// Creating the index once in [OneTimeSetUp] avoids repeated build waits.

[TestFixture]
public class SharedSearchIndexFixtureTests
{
    private IMongoClient _client = null!;
    private IMongoCollection<BsonDocument> _collection = null!;
    private const string IndexName = "demo_shared_index";
    private const string DatabaseName = "test_search_shared";

    [OneTimeSetUp]
    public async Task FixtureSetUp()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING");
        _client = new MongoClient(connectionString);
        _collection = _client.GetDatabase(DatabaseName)
            .GetCollection<BsonDocument>("movies");

        // Insert test data once
        await _collection.InsertManyAsync(new[]
        {
            new BsonDocument { { "title", "Inception" }, { "genre", "sci-fi" }, { "year", 2010 } },
            new BsonDocument { { "title", "Interstellar" }, { "genre", "sci-fi" }, { "year", 2014 } },
            new BsonDocument { { "title", "The Prestige" }, { "genre", "thriller" }, { "year", 2006 } }
        });

        // Create and wait for the index once for the entire fixture
        var definition = new BsonDocument
        {
            { "mappings", new BsonDocument { { "dynamic", true } } }
        };
        var model = new CreateSearchIndexModel(IndexName, SearchIndexType.Search, definition);

        try
        {
            _collection.SearchIndexes.CreateOne(model);
        }
        catch (MongoCommandException)
        {
            Assert.Ignore("Environment does not support Atlas Search indexes.");
        }

        await SearchIndexChecker.EnsureIndexReadyAsync(
            _collection,
            IndexName,
            timeout: TimeSpan.FromSeconds(180));
    }

    [OneTimeTearDown]
    public void FixtureTearDown()
    {
        try { _collection.SearchIndexes.DropOne(IndexName); } catch { }
        try { _client.DropDatabase(DatabaseName); } catch { }
        _client.Dispose();
    }

    [Test]
    public void TestSearchByTitle()
    {
        var results = _collection.Aggregate()
            .Search(Builders<BsonDocument>.Search.Text("title", "Inception"))
            .ToList();

        Assert.That(results, Has.Count.EqualTo(1));
    }

    [Test]
    public void TestSearchByGenre()
    {
        var results = _collection.Aggregate()
            .Search(Builders<BsonDocument>.Search.Text("genre", "sci-fi"))
            .ToList();

        Assert.That(results, Has.Count.EqualTo(2));
    }
}