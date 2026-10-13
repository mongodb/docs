namespace Tests.VectorSearch;

using DotNetEnv;
using Examples.VectorSearch.Rag;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;

[TestFixture]
public class RagPipelineTests
{
    private MongoClient? _client;
    private IMongoCollection<BsonDocument>? _collection;

    [SetUp]
    public void Setup()
    {
        var connectionString = Env.GetString("CONNECTION_STRING", "");
        if (string.IsNullOrEmpty(connectionString))
            Assert.Ignore("CONNECTION_STRING not set. Skipping RAG pipeline tests.");

        var voyageApiKey = Env.GetString("VOYAGE_API_KEY", "");
        if (string.IsNullOrEmpty(voyageApiKey))
            Assert.Ignore("VOYAGE_API_KEY not set. Skipping RAG pipeline tests.");

        var openaiApiKey = Env.GetString("OPENAI_API_KEY", "");
        if (string.IsNullOrEmpty(openaiApiKey))
            Assert.Ignore("OPENAI_API_KEY not set. Skipping RAG pipeline tests.");

        _client = new MongoClient(connectionString);
        _collection = _client.GetDatabase("rag_db_test")
            .GetCollection<BsonDocument>("test");
    }

    [TearDown]
    public void TearDown()
    {
        if (_client is null) return;

        try
        {
            _client.DropDatabase("rag_db_test");
        }
        finally
        {
            _client.Dispose();
        }
    }

    private static AIService CreateAIService() =>
        new(
            new HttpClient(),
            Env.GetString("OPENAI_BASE_URL", null));

    [Test]
    [Description("Verifies GetEmbeddingsAsync returns embeddings from the Voyage AI API")]
    public async Task TestGetEmbeddingsAsync()
    {
        var aiService = CreateAIService();

        var result = await aiService.GetEmbeddingsAsync(["hello"]);

        Expect.That(result.Count).ShouldMatch(1);
        Expect.That(result["hello"].Length).ShouldMatch(1024);
        Expect.That(result["hello"].All(v => v != 0f)).ShouldMatch(true);
    }

    [Test]
    [Description("Verifies GenerateAnswer returns a non-empty response from the OpenAI API")]
    public async Task TestGenerateAnswer()
    {
        var aiService = CreateAIService();

        var result = await aiService.GenerateAnswer(
            "What is MongoDB?",
            "MongoDB is a NoSQL document database.");

        Expect.That(string.IsNullOrWhiteSpace(result)).ShouldMatch(false);
    }

    [Test]
    [Description("Verifies AddDocumentsAsync inserts documents with text and embedding fields")]
    public async Task TestAddDocumentsAsync()
    {
        var mongoDataService = new MongoDBDataService(_collection!);
        var embeddings = new Dictionary<string, float[]>
        {
            { "AI-powered applications require reliable data infrastructure.", new float[] { 0.1f, 0.2f, 0.3f } },
            { "MongoDB Atlas Vector Search enables semantic similarity queries.", new float[] { 0.4f, 0.5f, 0.6f } },
        };

        var result = await mongoDataService.AddDocumentsAsync(embeddings);

        Expect.That(result).ShouldMatch("Successfully inserted 2 documents.");
        var docs = _collection.Find(new BsonDocument()).ToList();
        Expect.That(docs.Count).ShouldMatch(2);
        Expect.That(docs.All(d => d.Contains("text") && d.Contains("embedding"))).ShouldMatch(true);
    }

    [Test]
    [Description("Verifies CreateVectorIndex creates a queryable index and PerformVectorQuery returns matching documents")]
    public async Task TestVectorIndexAndQuery()
    {
        var dataService = new MongoDBDataService(_collection!);
        var vector = Enumerable.Repeat(0.5f, 1024).ToArray();
        await dataService.AddDocumentsAsync(new Dictionary<string, float[]>
        {
            { "MongoDB Atlas Vector Search enables semantic similarity queries.", vector },
        });

        // A never-ready index throws TimeoutException after 3 minutes
        // (bounded poll in CreateVectorIndex), so this fails rather than hangs.
        var indexName = dataService.CreateVectorIndex();
        Expect.That(indexName).ShouldMatch("vector_index");

        // A queryable index does not mean newly written vectors are searchable
        // yet. Poll the query rather than racing the index sync, the same
        // pattern LocalRagTests uses. If the deadline passes with no results,
        // the assertions below fail — a real $vectorSearch regression must
        // not report as skipped.
        var deadline = DateTime.UtcNow.AddSeconds(120);
        List<BsonDocument> results = [];
        while (DateTime.UtcNow < deadline)
        {
            results = dataService.PerformVectorQuery(vector);
            if (results.Count > 0)
                break;
            await Task.Delay(5000);
        }

        Expect.That(results.Count).ShouldMatch(1);
        Expect.That(results[0]["text"].AsString)
            .ShouldMatch("MongoDB Atlas Vector Search enables semantic similarity queries.");
    }
}
