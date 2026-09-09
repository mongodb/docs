using DotNetEnv;
using Examples.VectorSearch.Quantization;
using MongoDB.Bson;
using MongoDB.Driver;
using Utilities.Comparison;
using Utilities.SampleData;

namespace Tests.VectorSearch.Quantization;

[TestFixture]
public class QuantizationExistingDataTest
{
    private const string IndexName = "quantization_existing_data_test_index";

    private string _embeddingsFilePath;
    private IMongoClient _client;
    private IMongoCollection<BsonDocument> _collection;
    private QuantizationExistingData _example;
    private List<string> _processedSummaries;

    [SetUp]
    [Description("Initializes the MongoDB client and test example instance before each test")]
    public void Setup()
    {
        var connectionString = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(connectionString);
        _collection = _client.GetDatabase("sample_airbnb").GetCollection<BsonDocument>("listingsAndReviews");
        _embeddingsFilePath = Path.Combine(Path.GetTempPath(), $"quantization-existing-data-{Guid.NewGuid()}.json");
        _example = new QuantizationExistingData(_embeddingsFilePath);
        _processedSummaries = new List<string>();
    }

    [Test]
    [RequiresSampleData("sample_airbnb", new[] { "listingsAndReviews" })]
    [Description("Generates, ingests, and queries quantized BSON vector embeddings for existing sample_airbnb data")]
    public async Task TestGenerateIngestAndQueryExistingData()
    {
        await _example.GenerateAndConvertEmbeddingsAsync();

        Expect.That(File.Exists(_embeddingsFilePath)).ShouldMatch(true);
        var embeddingsDoc = BsonDocument.Parse(File.ReadAllText(_embeddingsFilePath));
        var dataArray = embeddingsDoc["data"].AsBsonArray;
        Expect.That(dataArray.Count).ShouldMatch(50);

        var documents = dataArray.Select(doc => doc.AsBsonDocument).ToList();
        Expect.That(documents).ShouldResemble(documents).WithSchema(new SchemaValidationOptions
        {
            Count = 50,
            RequiredFields = new[] { "text", "embeddings_float32", "embeddings_int8", "embeddings_int1" }
        });
        _processedSummaries = documents.Select(doc => doc["text"].AsString).ToList();

        _example.UploadEmbeddingsData();

        var updatedCount = _collection.CountDocuments(
            Builders<BsonDocument>.Filter.In("summary", _processedSummaries)
            & Builders<BsonDocument>.Filter.Exists("embeddings_float32"));
        Expect.That(updatedCount).ShouldMatch(_processedSummaries.Count);

        _example.SetupVectorSearchIndex(IndexName);

        var query = new QuantizationQuery();
        var results = await query.RunQueriesAsync(
            "sample_airbnb", "listingsAndReviews", IndexName, "summary", "ocean view", 5, 2);

        Expect.That(results.Keys.OrderBy(k => k)).ShouldMatch(new[]
        {
            "embeddings_float32", "embeddings_int1", "embeddings_int8"
        }.OrderBy(k => k));

        foreach (var docs in results.Values)
        {
            Expect.That(docs).ShouldResemble(docs).WithSchema(new SchemaValidationOptions
            {
                Count = 2,
                RequiredFields = new[] { "text", "score" }
            });
            Expect.That(docs.Select(d => d.Text).Except(_processedSummaries).ToList())
                .ShouldMatch(Array.Empty<string>());
        }
    }

    [TearDown]
    [Description("Drops the test search index, removes added embedding fields from sample data, and cleans up resources")]
    public void TearDown()
    {
        // Setup may have failed before _example/_client were created (e.g. a
        // connectivity error) — guard so that failure isn't masked by a
        // NullReferenceException here.
        _example?.DropIndexIfExists(IndexName);

        if (_processedSummaries is { Count: > 0 })
        {
            var unset = Builders<BsonDocument>.Update
                .Unset("embeddings_float32")
                .Unset("embeddings_int8")
                .Unset("embeddings_int1");
            _collection?.UpdateMany(Builders<BsonDocument>.Filter.In("summary", _processedSummaries), unset);
        }

        if (File.Exists(_embeddingsFilePath))
        {
            File.Delete(_embeddingsFilePath);
        }

        _client?.Dispose();
    }
}
