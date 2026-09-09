// :replace-start: {
//   "terms": {
//     "_embeddingsFilePath": "\"embeddings.json\""
//   }
// }
using System.Net;
using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using DotNetEnv;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Examples.VectorSearch.Quantization;

public class QuantizationExistingData
{
    private readonly string _uri = Env.GetString("CONNECTION_STRING",
        "Env variable not found. Verify you have a .env file with a valid connection string.");
    private readonly string _voyageApiKey = Env.GetString("VOYAGE_API_KEY",
        "Env variable not found. Verify you have a .env file with a valid Voyage AI API key.");
    private readonly string _embeddingsFilePath;

    public QuantizationExistingData(string embeddingsFilePath = "embeddings.json")
    {
        _embeddingsFilePath = embeddingsFilePath;
    }

    // :snippet-start: generate-convert-embeddings-existing-data
    public async Task GenerateAndConvertEmbeddingsAsync()
    {
        using var client = new MongoClient(_uri); // :remove:
        // :uncomment-start:
        // using var client = new MongoClient("<connectionString>");
        // :uncomment-end:
        var collection = client.GetDatabase("sample_airbnb").GetCollection<QuantizationSourceDocument>("listingsAndReviews");

        var voyageApiKey = _voyageApiKey; // :remove:
        // :uncomment-start:
        // var voyageApiKey = "<voyageApiKey>";
        // :uncomment-end:

        var filter = Builders<QuantizationSourceDocument>.Filter.Nin(
            d => d.Summary, new[] { null, "" });
        var summaries = collection.Find(filter).Limit(50).ToList()
            .Select(d => d.Summary)
            .Where(s => !string.IsNullOrEmpty(s))
            .ToList();

        var floatEmbeddings = await FetchEmbeddingsFromVoyageAsync(summaries, "float", voyageApiKey);
        var int8Embeddings = await FetchEmbeddingsFromVoyageAsync(summaries, "int8", voyageApiKey);
        var ubinaryEmbeddings = await FetchEmbeddingsFromVoyageAsync(summaries, "ubinary", voyageApiKey);

        var documents = new List<QuantizationEmbeddingDocument>();
        for (var i = 0; i < summaries.Count; i++)
        {
            documents.Add(new QuantizationEmbeddingDocument
            {
                Text = summaries[i],
                EmbeddingsFloat32 = new BinaryVectorFloat32(ToFloatArray(floatEmbeddings[i])),
                EmbeddingsInt8 = new BinaryVectorInt8(ToSByteArray(int8Embeddings[i])),
                EmbeddingsInt1 = new BinaryVectorPackedBit(ToByteArray(ubinaryEmbeddings[i]), 0)
            });
        }

        File.WriteAllText(_embeddingsFilePath, new QuantizationEmbeddingsFile { Data = documents }.ToBsonDocument().ToJson());
        Console.WriteLine("Embeddings saved to embeddings.json");
    }

    // Send a request to the Voyage AI embeddings API for the given output data type
    private static async Task<List<List<double>>> FetchEmbeddingsFromVoyageAsync(List<string> inputs, string outputDtype, string voyageApiKey)
    {
        using var client = new HttpClient();
        client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", voyageApiKey);

        var requestBody = new
        {
            input = inputs,
            model = "voyage-3-large",
            input_type = "document",
            output_dtype = outputDtype,
            output_dimension = 1024
        };

        const int maxRetries = 5;
        HttpResponseMessage response;
        var attempt = 0;
        while (true)
        {
            var content = new StringContent(JsonSerializer.Serialize(requestBody), Encoding.UTF8, "application/json");
            response = await client.PostAsync("https://ai.mongodb.com/v1/embeddings", content);

            if (response.StatusCode != HttpStatusCode.TooManyRequests || attempt >= maxRetries)
            {
                break;
            }

            attempt++;
            var delay = TimeSpan.FromSeconds(Math.Pow(2, attempt));
            Console.WriteLine($"Rate limited by Voyage AI. Retrying in {delay.TotalSeconds}s...");
            await Task.Delay(delay);
        }

        if (!response.IsSuccessStatusCode)
        {
            throw new ApplicationException($"API error: HTTP {(int)response.StatusCode}");
        }

        var responseBody = await response.Content.ReadAsStringAsync();
        using var responseJson = JsonDocument.Parse(responseBody);

        var embeddings = new List<List<double>>();
        foreach (var item in responseJson.RootElement.GetProperty("data").EnumerateArray())
        {
            var vector = new List<double>();
            foreach (var value in item.GetProperty("embedding").EnumerateArray())
            {
                vector.Add(value.GetDouble());
            }
            embeddings.Add(vector);
        }

        return embeddings;
    }

    private static float[] ToFloatArray(List<double> values) => values.Select(v => (float)v).ToArray();

    private static sbyte[] ToSByteArray(List<double> values) => values.Select(v => (sbyte)v).ToArray();

    private static byte[] ToByteArray(List<double> values) => values.Select(v => (byte)v).ToArray();
    // :snippet-end:

    // :snippet-start: upload-create-index-existing-data
    public void UploadEmbeddingsData()
    {
        using var client = new MongoClient(_uri); // :remove:
        // :uncomment-start:
        // using var client = new MongoClient("<connectionString>");
        // :uncomment-end:
        var collection = client.GetDatabase("sample_airbnb").GetCollection<QuantizationSourceDocument>("listingsAndReviews");

        var fileContent = File.ReadAllText(_embeddingsFilePath);
        var embeddingsFile = BsonSerializer.Deserialize<QuantizationEmbeddingsFile>(BsonDocument.Parse(fileContent));

        foreach (var doc in embeddingsFile.Data)
        {
            var filter = Builders<QuantizationSourceDocument>.Filter.Eq("summary", doc.Text);
            var update = Builders<QuantizationSourceDocument>.Update
                .Set("embeddings_float32", doc.EmbeddingsFloat32)
                .Set("embeddings_int8", doc.EmbeddingsInt8)
                .Set("embeddings_int1", doc.EmbeddingsInt1);

            collection.UpdateOne(filter, update);
            Console.WriteLine($"Processed document with summary: {doc.Text}");
        }
    }

    public string SetupVectorSearchIndex(string indexName)
    {
        using var client = new MongoClient(_uri); // :remove:
        // :uncomment-start:
        // using var client = new MongoClient("<connectionString>");
        // :uncomment-end:
        var collection = client.GetDatabase("sample_airbnb").GetCollection<BsonDocument>("listingsAndReviews");

        var definition = new BsonDocument
        {
            { "fields", new BsonArray
                {
                    new BsonDocument
                    {
                        { "type", "vector" },
                        { "path", "embeddings_float32" },
                        { "numDimensions", 1024 },
                        { "similarity", "dotProduct" }
                    },
                    new BsonDocument
                    {
                        { "type", "vector" },
                        { "path", "embeddings_int8" },
                        { "numDimensions", 1024 },
                        { "similarity", "dotProduct" }
                    },
                    new BsonDocument
                    {
                        { "type", "vector" },
                        { "path", "embeddings_int1" },
                        { "numDimensions", 1024 },
                        { "similarity", "euclidean" }
                    }
                }
            }
        };

        var indexModel = new CreateSearchIndexModel(indexName, SearchIndexType.VectorSearch, definition);
        var searchIndexView = collection.SearchIndexes;
        var name = searchIndexView.CreateOne(indexModel);
        Console.WriteLine($"Successfully created vector index named: {name}");
        Console.WriteLine("It may take up to a minute for the index to leave the BUILDING status and become queryable.");

        Console.WriteLine("Polling to confirm the index has changed from the BUILDING status.");
        var queryable = false;
        while (!queryable)
        {
            var indexes = searchIndexView.List();
            foreach (var index in indexes.ToEnumerable())
            {
                if (index["name"] == name)
                {
                    queryable = index["queryable"].AsBoolean;
                }
            }
            if (!queryable)
            {
                Thread.Sleep(5000);
            }
        }
        Console.WriteLine($"{name} index is ready to query");
        return name;
    }
    // :snippet-end:

    public long CountDocumentsWithEmbeddings()
    {
        using var client = new MongoClient(_uri);
        var collection = client.GetDatabase("sample_airbnb").GetCollection<QuantizationSourceDocument>("listingsAndReviews");
        var filter = Builders<QuantizationSourceDocument>.Filter.Ne("embeddings_float32", BsonNull.Value);
        return collection.CountDocuments(filter);
    }

    public void DropIndexIfExists(string indexName)
    {
        using var client = new MongoClient(_uri);
        var collection = client.GetDatabase("sample_airbnb").GetCollection<QuantizationSourceDocument>("listingsAndReviews");
        try
        {
            collection.SearchIndexes.DropOne(indexName);
        }
        catch (MongoCommandException)
        {
            // Index does not exist; nothing to clean up.
        }
    }
}

// :snippet-start: quantization-source-document
[BsonIgnoreExtraElements]
public class QuantizationSourceDocument
{
    [BsonElement("summary")]
    public string Summary { get; set; } = null!;
}
// :snippet-end:

// :snippet-start: quantization-embedding-document
public class QuantizationEmbeddingsFile
{
    [BsonElement("data")]
    public List<QuantizationEmbeddingDocument> Data { get; set; } = null!;
}

public class QuantizationEmbeddingDocument
{
    [BsonElement("text")]
    public string Text { get; set; } = null!;

    [BsonElement("embeddings_float32")]
    public BinaryVectorFloat32 EmbeddingsFloat32 { get; set; } = null!;

    [BsonElement("embeddings_int8")]
    public BinaryVectorInt8 EmbeddingsInt8 { get; set; } = null!;

    [BsonElement("embeddings_int1")]
    public BinaryVectorPackedBit EmbeddingsInt1 { get; set; } = null!;
}
// :snippet-end:
// :replace-end:
