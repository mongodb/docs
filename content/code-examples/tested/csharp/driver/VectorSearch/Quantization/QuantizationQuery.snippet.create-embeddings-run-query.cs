public async Task<Dictionary<string, List<QuantizationQueryResult>>> RunQueriesAsync(
    string dbName, string collectionName, string indexName, string dataFieldName, string queryText,
    int numberOfCandidates, int numberOfDocuments)
{
    using var client = new MongoClient("<connectionString>");
    var voyageApiKey = "<voyageApiKey>";

    var floatEmbedding = await FetchEmbeddingFromVoyageAsync(queryText, "float", voyageApiKey);
    var int8Embedding = await FetchEmbeddingFromVoyageAsync(queryText, "int8", voyageApiKey);
    var ubinaryEmbedding = await FetchEmbeddingFromVoyageAsync(queryText, "ubinary", voyageApiKey);

    QueryVector float32Vector = new BinaryVectorFloat32(floatEmbedding.Select(v => (float)v).ToArray());
    QueryVector int8Vector = new BinaryVectorInt8(int8Embedding.Select(v => (sbyte)v).ToArray());
    QueryVector int1Vector = new BinaryVectorPackedBit(ubinaryEmbedding.Select(v => (byte)v).ToArray(), 0);

    var collection = client.GetDatabase(dbName).GetCollection<QuantizationEmbeddingDocument>(collectionName);

    var resultsByField = new Dictionary<string, List<QuantizationQueryResult>>
    {
        ["embeddings_float32"] = RunVectorSearchQuery(
            collection, d => d.EmbeddingsFloat32, indexName, dataFieldName, float32Vector, numberOfCandidates, numberOfDocuments),
        ["embeddings_int8"] = RunVectorSearchQuery(
            collection, d => d.EmbeddingsInt8, indexName, dataFieldName, int8Vector, numberOfCandidates, numberOfDocuments),
        ["embeddings_int1"] = RunVectorSearchQuery(
            collection, d => d.EmbeddingsInt1, indexName, dataFieldName, int1Vector, numberOfCandidates, numberOfDocuments)
    };

    foreach (var (path, results) in resultsByField)
    {
        Console.WriteLine($"Results from {path} embeddings:");
        foreach (var result in results)
        {
            Console.WriteLine(result.ToBsonDocument().ToJson());
        }
    }

    return resultsByField;
}

// Send a request to the Voyage AI embeddings API for the given output data type
private static async Task<List<double>> FetchEmbeddingFromVoyageAsync(string text, string outputDtype, string voyageApiKey)
{
    using var client = new HttpClient();
    client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", voyageApiKey);

    var requestBody = new
    {
        input = new[] { text },
        model = "voyage-3-large",
        input_type = "query",
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

    var embedding = new List<double>();
    foreach (var value in responseJson.RootElement.GetProperty("data")[0].GetProperty("embedding").EnumerateArray())
    {
        embedding.Add(value.GetDouble());
    }

    return embedding;
}

// Run a $vectorSearch query against the given embedding field
private static List<QuantizationQueryResult> RunVectorSearchQuery(
    IMongoCollection<QuantizationEmbeddingDocument> collection,
    Expression<Func<QuantizationEmbeddingDocument, object>> path,
    string indexName,
    string dataFieldName,
    QueryVector queryVector,
    int numberOfCandidates,
    int numberOfDocuments)
{
    var options = new VectorSearchOptions<QuantizationEmbeddingDocument>
    {
        IndexName = indexName,
        NumberOfCandidates = numberOfCandidates
    };

    var results = collection.Aggregate()
        .VectorSearch(path, queryVector, numberOfDocuments, options)
        .Project(Builders<QuantizationEmbeddingDocument>.Projection
            .Include(dataFieldName)
            .MetaVectorSearchScore("score"))
        .As<BsonDocument>()
        .ToList();

    return results.Select(document => new QuantizationQueryResult
    {
        Text = document.Contains(dataFieldName)
            ? document[dataFieldName].AsString
            : throw new InvalidOperationException($"Expected field '{dataFieldName}' not found in query result."),
        Score = document.Contains("score") ? document["score"].AsDouble : 0
    }).ToList();
}
