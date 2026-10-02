using Examples.VectorSearch.LocalRag;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;
using Utilities.SampleData;
using Utilities.SearchIndex;

namespace Tests.VectorSearch;

/// <summary>
///     Tests for the local RAG C# examples.
///     <para>
///         Nothing is mocked. Embeddings come from a real Ollama server running
///         at http://localhost:11434/ with the nomic-embed-text model pulled,
///         retrieval runs a real $vectorSearch query, and generation runs the
///         real mistral model through Ollama. Tests skip rather than fail when
///         Ollama or the search index is unavailable.
///     </para>
///     <para>
///         Sample data hygiene: these tests add a vector field to documents in
///         sample_airbnb.listingsAndReviews and create a search index on that
///         collection. Both are reverted in teardown. The sample database is
///         never dropped. See LocalRagNames for why the tested field and index
///         names differ from the documented ones.
///     </para>
/// </summary>
[TestFixture]
public class LocalRagTests
{
    private const string DatabaseName = "sample_airbnb";
    private const string CollectionName = "listingsAndReviews";
    private const string Question =
        "Can you recommend me a few AirBnBs that are beach houses? Include a link to the listings.";

    private static readonly Uri OllamaProbeUri = new("http://localhost:11434/api/tags");
    private static bool _ollamaProbed;
    private static string? _ollamaUnavailable;

    private IMongoClient _client = null!;
    private IMongoCollection<BsonDocument> _collection = null!;
    private bool _createdIndex;
    private bool _wroteEmbeddings;
    private bool _fixtureReady;
    private string? _fixtureFailure;

    [OneTimeSetUp]
    public void OneTimeSetup()
    {
        var connectionString = DotNetEnv.Env.GetString("CONNECTION_STRING",
            "Set your CONNECTION_STRING in the .env file");
        _client = new MongoClient(connectionString);
        _collection = _client.GetDatabase(DatabaseName)
            .GetCollection<BsonDocument>(CollectionName);
    }

    [OneTimeTearDown]
    public void OneTimeTearDown()
    {
        // Skip cleanup when no test wrote embeddings, so runs without a
        // reachable deployment do not wait out server selection here.
        if (_wroteEmbeddings)
        {
            RemoveEmbeddings();
        }

        if (_createdIndex)
        {
            try
            {
                _collection.SearchIndexes.DropOne(LocalRagNames.VectorIndexName);
            }
            catch
            {
                // The index may already be gone, or the deployment may not
                // support search indexes. Neither should fail teardown.
            }
        }

        _client.Dispose();
    }

    /// <summary>
    ///     Skips the test when no Ollama server is reachable, so environments
    ///     without Ollama running report these tests as ignored rather than
    ///     failing on a connection error. Probed once for the whole run.
    /// </summary>
    [SetUp]
    public void EnsureOllamaAvailable()
    {
        if (!_ollamaProbed)
        {
            _ollamaUnavailable = ProbeOllama();
            _ollamaProbed = true;
        }

        if (_ollamaUnavailable is not null)
        {
            Assert.Ignore(_ollamaUnavailable);
        }
    }

    /// <summary>
    ///     Returns null when Ollama answers, or the reason to skip when it does
    ///     not.
    /// </summary>
    private static string? ProbeOllama()
    {
        try
        {
            using var httpClient = new HttpClient { Timeout = TimeSpan.FromSeconds(5) };
            var response = httpClient.GetAsync(OllamaProbeUri).GetAwaiter().GetResult();

            return response.IsSuccessStatusCode
                ? null
                : $"Ollama at {OllamaProbeUri} returned {(int)response.StatusCode}. Skipping test.";
        }
        catch (Exception exception)
        {
            return $"No Ollama server reachable at {OllamaProbeUri} "
                + $"({exception.GetBaseException().Message}). Skipping test.";
        }
    }

    /// <summary>
    ///     Reverts the only change these tests make to the sample data: the
    ///     added vector field. The documents and the sample database itself are
    ///     left intact.
    /// </summary>
    private void RemoveEmbeddings()
    {
        var filter = Builders<BsonDocument>.Filter.Exists(
            LocalRagNames.EmbeddingsFieldName, true);
        var update = Builders<BsonDocument>.Update.Unset(
            LocalRagNames.EmbeddingsFieldName);
        _collection.UpdateMany(filter, update);
    }

    /// <summary>
    ///     Generates embeddings and builds the vector index, which the retrieval
    ///     and generation tests depend on. Uses the examples under test rather
    ///     than duplicating their logic.
    ///     <para>
    ///         The fixture is built once for the whole suite. Rebuilding it per
    ///         test would rewrite 250 vectors each time and then query before
    ///         Atlas had synced them into the index, which returns zero results
    ///         intermittently: an index reports queryable as soon as it exists,
    ///         which says nothing about whether newly written vectors are
    ///         searchable yet.
    ///     </para>
    /// </summary>
    private async Task EnsureRetrievalFixture()
    {
        if (_fixtureReady)
        {
            return;
        }

        // Cache a fixture failure so the remaining tests skip immediately
        // instead of each regenerating embeddings and waiting out the poll.
        if (_fixtureFailure is not null)
        {
            Assert.Ignore(_fixtureFailure);
        }

        _wroteEmbeddings = true;
        await new LocalRagEmbeddingGenerator().GenerateEmbeddings();

        var indexExists = _collection.SearchIndexes.List().ToEnumerable()
            .Any(index => index["name"] == LocalRagNames.VectorIndexName);

        if (!indexExists)
        {
            new MongoDBDataService().CreateVectorIndex();
            _createdIndex = true;
        }

        SearchIndexTestHelper.EnsureSearchIndexOrSkip(
            _collection, LocalRagNames.VectorIndexName);

        await WaitForVectorsToBeSearchable();
        _fixtureReady = true;
    }

    /// <summary>
    ///     Polls the vector query until it returns results, so retrieval tests do
    ///     not race the index sync. Skips the test if vectors never become
    ///     searchable, rather than failing on an empty result set.
    /// </summary>
    private async Task WaitForVectorsToBeSearchable(int timeoutSeconds = 120)
    {
        var queryEmbedding = await new OllamaAIService().GetEmbedding("beach house");
        var dataService = new MongoDBDataService();
        var deadline = DateTime.UtcNow.AddSeconds(timeoutSeconds);

        while (DateTime.UtcNow < deadline)
        {
            var results = dataService.PerformVectorQuery(queryEmbedding);
            if (results is { Count: > 0 })
            {
                return;
            }
            await Task.Delay(TimeSpan.FromSeconds(2));
        }

        _fixtureFailure =
            $"Vectors did not become searchable through index "
            + $"'{LocalRagNames.VectorIndexName}' within {timeoutSeconds}s. Skipping test.";
        Assert.Ignore(_fixtureFailure);
    }

    [Test]
    [RequiresSampleData(DatabaseName, [CollectionName])]
    [Description("Verifies that the Ollama embedding model returns a 768-dimension vector")]
    public async Task TestGetEmbeddingReturnsVector()
    {
        var service = new OllamaAIService();

        var embedding = await service.GetEmbedding("Ocean Living! Secluded Secret Beach!");

        Expect.That(embedding.Length).ShouldMatch(768);
    }

    [Test]
    [RequiresSampleData(DatabaseName, [CollectionName])]
    [Description("Verifies that GetDocuments returns documents that have a summary and no vector field")]
    public void TestGetDocumentsReturnsCandidateDocuments()
    {
        // GetDocuments only returns documents that have no vector field yet, so
        // clear the embeddings other tests write to keep the count independent
        // of run order.
        RemoveEmbeddings();
        _fixtureReady = false;

        var documents = new MongoDBDataService().GetDocuments();

        Expect.That(documents!.Count).ShouldMatch(250);
        Expect.That(documents.All(doc => doc.Contains("summary"))).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData(DatabaseName, [CollectionName])]
    [Description("Verifies that generating embeddings updates 250 documents")]
    public async Task TestGenerateEmbeddingsUpdatesDocuments()
    {
        // GetDocuments only returns documents that have no vector field yet, so
        // clear the embeddings other tests write to keep the count independent
        // of run order. Any retrieval test that runs later rebuilds its fixture
        // and waits for the new vectors to become searchable.
        RemoveEmbeddings();
        _fixtureReady = false;

        var generator = new LocalRagEmbeddingGenerator();

        _wroteEmbeddings = true;
        var result = await generator.GenerateEmbeddings();

        Expect.That(result).ShouldMatch("250 documents updated successfully.");
    }

    [Test]
    [RequiresSampleData(DatabaseName, [CollectionName])]
    [Description("Verifies that each updated document stores a 768-dimension vector")]
    public async Task TestGenerateEmbeddingsStoresVectors()
    {
        _wroteEmbeddings = true;
        await new LocalRagEmbeddingGenerator().GenerateEmbeddings();

        var filter = Builders<BsonDocument>.Filter.Exists(
            LocalRagNames.EmbeddingsFieldName, true);
        var document = _collection.Find(filter).First();

        Expect.That(document[LocalRagNames.EmbeddingsFieldName].AsBsonArray.Count)
            .ShouldMatch(768);
    }

    [Test]
    [RequiresSampleData(DatabaseName, [CollectionName])]
    [RequiresSearchIndex(LocalRagNames.VectorIndexName, IndexType = "vectorSearch")]
    [Description("Verifies that the vector index is created and becomes queryable")]
    public async Task TestCreateVectorIndexBecomesQueryable()
    {
        await EnsureRetrievalFixture();

        var index = _collection.SearchIndexes.List().ToEnumerable()
            .First(i => i["name"] == LocalRagNames.VectorIndexName);

        Expect.That(index["type"].AsString).ShouldMatch("vectorSearch");
    }

    [Test]
    [RequiresSampleData(DatabaseName, [CollectionName])]
    [RequiresSearchIndex(LocalRagNames.VectorIndexName, IndexType = "vectorSearch")]
    [Description("Verifies that a vector query returns five listings with summary, url, and score")]
    public async Task TestPerformVectorQueryReturnsListings()
    {
        await EnsureRetrievalFixture();
        var queryEmbedding = await new OllamaAIService().GetEmbedding("beach house");

        var results = new MongoDBDataService().PerformVectorQuery(queryEmbedding);

        // Scores and ordering vary across environments, so validate shape only.
        Expect.That(results!.Count).ShouldMatch(5);
        Expect.That(results.All(doc =>
            doc.Contains("summary") && doc.Contains("listing_url") && doc.Contains("score")))
            .ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData(DatabaseName, [CollectionName])]
    [RequiresSearchIndex(LocalRagNames.VectorIndexName, IndexType = "vectorSearch")]
    [Description("Verifies that a test query returns a formatted string of listings")]
    public async Task TestGetQueryResultsReturnsFormattedString()
    {
        await EnsureRetrievalFixture();

        var result = await new PerformTestQuery().GetQueryResults("beach house");

        Expect.That(result.Contains("Summary:")).ShouldMatch(true);
        Expect.That(result.Contains("Listing URL:")).ShouldMatch(true);
    }

    [Test]
    [RequiresSampleData(DatabaseName, [CollectionName])]
    [RequiresSearchIndex(LocalRagNames.VectorIndexName, IndexType = "vectorSearch")]
    [Description("Verifies that the local LLM generates a non-empty answer from retrieved listings")]
    public async Task TestSummarizeResultsReturnsAnswer()
    {
        await EnsureRetrievalFixture();

        var answer = await new PerformQuestionAnswer().SummarizeResults(Question);

        // The generated text varies on every run, so assert only that the
        // generation step produced output.
        Expect.That(string.IsNullOrWhiteSpace(answer)).ShouldMatch(false);
    }
}
