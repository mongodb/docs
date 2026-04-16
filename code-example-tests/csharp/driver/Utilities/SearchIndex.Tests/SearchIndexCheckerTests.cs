using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Driver;
using NUnit.Framework;

namespace Utilities.SearchIndex.Tests;

[TestFixture]
public class SearchIndexCheckerTests
{
    [TestFixture]
    public class WaitForIndexAsyncTests
    {
        private MongoClient _client = null!;
        private IMongoCollection<BsonDocument> _collection = null!;

        [SetUp]
        public void SetUp()
        {
            Env.TraversePath().Load();
            var connectionString = Env.GetString("CONNECTION_STRING");
            if (string.IsNullOrEmpty(connectionString))
                Assert.Ignore("No CONNECTION_STRING available. Skipping test.");
            _client = new MongoClient(connectionString);
            _collection = _client.GetDatabase("test_search_index_checker")
                .GetCollection<BsonDocument>("test_collection");
        }

        [TearDown]
        public void TearDown()
        {
            try { _client.DropDatabase("test_search_index_checker"); } catch { }
            _client.Dispose();
        }

        [Test]
        [Description("Verifies that WaitForIndexAsync returns false when the index does not exist")]
        public async Task ShouldReturnFalse_WhenIndexDoesNotExist()
        {
            try
            {
                var result = await SearchIndexChecker.WaitForIndexAsync(
                    _collection,
                    "nonexistent_index",
                    timeout: TimeSpan.FromSeconds(5),
                    pollInterval: TimeSpan.FromSeconds(1));

                Assert.That(result, Is.False);
            }
            catch (MongoCommandException)
            {
                Assert.Ignore("Environment does not support Atlas Search indexes. Skipping test.");
            }
            catch (TimeoutException)
            {
                Assert.Ignore("MongoDB is not reachable. Skipping test.");
            }
        }

        [Test]
        [Description("Verifies that WaitForIndexAsync respects cancellation tokens")]
        public void ShouldThrowOperationCanceled_WhenTokenIsCanceled()
        {
            try
            {
                using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(2));

                Assert.ThrowsAsync(Is.InstanceOf<OperationCanceledException>(), async () =>
                    await SearchIndexChecker.WaitForIndexAsync(
                        _collection,
                        "nonexistent_index",
                        timeout: TimeSpan.FromSeconds(60),
                        pollInterval: TimeSpan.FromSeconds(1),
                        cancellationToken: cts.Token));
            }
            catch (MongoCommandException)
            {
                Assert.Ignore("Environment does not support Atlas Search indexes. Skipping test.");
            }
            catch (TimeoutException)
            {
                Assert.Ignore("MongoDB is not reachable. Skipping test.");
            }
        }

        [Test]
        [Description("Verifies that default timeout and poll interval values are sensible")]
        public void DefaultValues_ShouldBeSensible()
        {
            Assert.That(SearchIndexChecker.DefaultTimeout, Is.EqualTo(TimeSpan.FromSeconds(120)));
            Assert.That(SearchIndexChecker.DefaultPollInterval, Is.EqualTo(TimeSpan.FromSeconds(2)));
        }
    }

    [TestFixture]
    public class EnsureIndexReadyAsyncTests
    {
        private MongoClient _client = null!;
        private IMongoCollection<BsonDocument> _collection = null!;

        [SetUp]
        public void SetUp()
        {
            Env.TraversePath().Load();
            var connectionString = Env.GetString("CONNECTION_STRING");
            if (string.IsNullOrEmpty(connectionString))
                Assert.Ignore("No CONNECTION_STRING available. Skipping test.");
            _client = new MongoClient(connectionString);
            _collection = _client.GetDatabase("test_search_index_checker")
                .GetCollection<BsonDocument>("test_collection");
        }

        [TearDown]
        public void TearDown()
        {
            try { _client.DropDatabase("test_search_index_checker"); } catch { }
            _client.Dispose();
        }

        [Test]
        [Description("Verifies that EnsureIndexReadyAsync throws TimeoutException when the index never becomes ready")]
        public void ShouldThrowTimeoutException_WhenIndexNeverBecomesReady()
        {
            try
            {
                var ex = Assert.ThrowsAsync<TimeoutException>(async () =>
                    await SearchIndexChecker.EnsureIndexReadyAsync(
                        _collection,
                        "nonexistent_index",
                        timeout: TimeSpan.FromSeconds(5),
                        pollInterval: TimeSpan.FromSeconds(1)));

                Assert.That(ex!.Message, Does.Contain("nonexistent_index"));
                Assert.That(ex.Message, Does.Contain("5s"));
            }
            catch (MongoCommandException)
            {
                Assert.Ignore("Environment does not support Atlas Search indexes. Skipping test.");
            }
            catch (TimeoutException)
            {
                Assert.Ignore("MongoDB is not reachable. Skipping test.");
            }
        }
    }

    [TestFixture]
    public class GenericOverloadTests
    {
        private MongoClient _client = null!;
        private IMongoCollection<TestDocument> _collection = null!;

        [SetUp]
        public void SetUp()
        {
            Env.TraversePath().Load();
            var connectionString = Env.GetString("CONNECTION_STRING");
            if (string.IsNullOrEmpty(connectionString))
                Assert.Ignore("No CONNECTION_STRING available. Skipping test.");
            _client = new MongoClient(connectionString);
            _collection = _client.GetDatabase("test_search_index_checker")
                .GetCollection<TestDocument>("test_collection");
        }

        [TearDown]
        public void TearDown()
        {
            try { _client.DropDatabase("test_search_index_checker"); } catch { }
            _client.Dispose();
        }

        [Test]
        [Description("Verifies that the generic WaitForIndexAsync overload works with typed collections")]
        public async Task WaitForIndexAsync_ShouldWorkWithTypedCollection()
        {
            try
            {
                var result = await SearchIndexChecker.WaitForIndexAsync(
                    _collection,
                    "nonexistent_index",
                    timeout: TimeSpan.FromSeconds(5),
                    pollInterval: TimeSpan.FromSeconds(1));

                Assert.That(result, Is.False);
            }
            catch (MongoCommandException)
            {
                Assert.Ignore("Environment does not support Atlas Search indexes. Skipping test.");
            }
            catch (TimeoutException)
            {
                Assert.Ignore("MongoDB is not reachable. Skipping test.");
            }
        }

        private class TestDocument
        {
            public string Title { get; set; } = null!;
        }
    }
}
