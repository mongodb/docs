using DotNetEnv;
using Examples.VectorSearch.Quantization;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using Utilities.Comparison;

namespace Tests.VectorSearch.Quantization;

[TestFixture]
public class QuantizationNewDataTest
{
    private const string DbName = "quantization_new_data_test_db";
    private const string CollectionName = "embeddings";
    private const string IndexName = "quantization_new_data_test_index";

    private static readonly string[] SampleTexts =
    [
        "The Great Wall of China is visible from space.",
        "The Eiffel Tower was completed in Paris in 1889.",
        "Mount Everest is the highest peak on Earth at 8,848m.",
        "Shakespeare wrote 37 plays and 154 sonnets during his lifetime.",
        "The Mona Lisa was painted by Leonardo da Vinci."
    ];

    private string _embeddingsFilePath;
    private IMongoClient _client;
    private QuantizationNewData _example;

    [SetUp]
    [Description("Initializes the MongoDB client and test example instance before each test")]
    public void Setup()
    {
        var connectionString = Env.GetString("CONNECTION_STRING",
            "Env variable not found. Verify you have a .env file with a valid connection string.");
        _client = new MongoClient(connectionString);
        _embeddingsFilePath = Path.Combine(Path.GetTempPath(), $"quantization-new-data-{Guid.NewGuid()}.json");
        _example = new QuantizationNewData(_embeddingsFilePath);
    }

    [Test]
    [Description("Generates, ingests, and queries quantized BSON vector embeddings for new sample data")]
    public async Task TestGenerateIngestAndQueryNewData()
    {
        await _example.GenerateAndConvertEmbeddingsAsync();

        Expect.That(File.Exists(_embeddingsFilePath)).ShouldMatch(true);
        var embeddingsDoc = BsonDocument.Parse(File.ReadAllText(_embeddingsFilePath));
        var dataArray = embeddingsDoc["data"].AsBsonArray;
        Expect.That(dataArray.Count).ShouldMatch(5);

        var documents = dataArray.Select(doc => doc.AsBsonDocument).ToList();
        Expect.That(documents).ShouldResemble(documents).WithSchema(new SchemaValidationOptions
        {
            Count = 5,
            RequiredFields = new[] { "text", "embeddings_float32", "embeddings_int8", "embeddings_int1" }
        });

        // The embedding values themselves come from a live Voyage AI call and
        // aren't deterministic, but the vector dimensions are fixed by the
        // requested output_dimension, so verify each quantized vector has the
        // expected length.
        foreach (var document in documents)
        {
            var embeddingDocument = BsonSerializer.Deserialize<QuantizationEmbeddingDocument>(document);
            Expect.That(embeddingDocument.EmbeddingsFloat32.Data.Length).ShouldMatch(1024);
            Expect.That(embeddingDocument.EmbeddingsInt8.Data.Length).ShouldMatch(1024);
            Expect.That(embeddingDocument.EmbeddingsInt1.Data.Length).ShouldMatch(128);
        }

        // Deterministic: the source text is fixed, so assert it exactly.
        Expect.That(documents.Select(d => d["text"].AsString).ToList())
            .ShouldMatch(SampleTexts);

        _example.StoreEmbeddings(DbName, CollectionName);

        var collection = _client.GetDatabase(DbName).GetCollection<BsonDocument>(CollectionName);
        Expect.That(collection.CountDocuments(FilterDefinition<BsonDocument>.Empty)).ShouldMatch(5);

        _example.SetupVectorSearchIndex(DbName, CollectionName, IndexName);

        var query = new QuantizationQuery();
        var results = await query.RunQueriesAsync(
            DbName, CollectionName, IndexName, "text", "science fact", 5, 2);

        Expect.That(results.Keys.OrderBy(k => k)).ShouldMatch(new[]
        {
            "embeddings_float32", "embeddings_int1", "embeddings_int8"
        }.OrderBy(k => k));

        var outputFilesByField = new Dictionary<string, string>
        {
            ["embeddings_float32"] = "QuantizationNewDataFloat32Output.txt",
            ["embeddings_int8"] = "QuantizationNewDataInt8Output.txt",
            ["embeddings_int1"] = "QuantizationNewDataInt1Output.txt"
        };

        foreach (var (field, docs) in results)
        {
            var outputFilePath = Path.Combine(
                Directory.GetCurrentDirectory(),
                "../../../../Examples/VectorSearch/Quantization",
                outputFilesByField[field]);
            Expect.That(docs).ShouldMatch(outputFilePath);
        }
    }

    [TearDown]
    [Description("Drops the test database and cleans up resources")]
    public void TearDown()
    {
        _client?.DropDatabase(DbName);

        if (File.Exists(_embeddingsFilePath))
        {
            File.Delete(_embeddingsFilePath);
        }

        _client?.Dispose();
    }
}
