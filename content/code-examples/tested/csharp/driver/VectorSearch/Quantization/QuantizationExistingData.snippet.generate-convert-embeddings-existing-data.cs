public async Task GenerateAndConvertEmbeddingsAsync()
{
    using var client = new MongoClient("<connectionString>");
    var collection = client.GetDatabase("sample_airbnb").GetCollection<QuantizationSourceDocument>("listingsAndReviews");

    var voyageApiKey = "<voyageApiKey>";

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

    File.WriteAllText("embeddings.json", new QuantizationEmbeddingsFile { Data = documents }.ToBsonDocument().ToJson());
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
