public async Task GenerateAndConvertEmbeddingsAsync()
{
    var voyageApiKey = "<voyageApiKey>";
    string[] sampleData =
    [
        "The Great Wall of China is visible from space.",
        "The Eiffel Tower was completed in Paris in 1889.",
        "Mount Everest is the highest peak on Earth at 8,848m.",
        "Shakespeare wrote 37 plays and 154 sonnets during his lifetime.",
        "The Mona Lisa was painted by Leonardo da Vinci."
    ];

    var floatEmbeddings = await FetchEmbeddingsFromVoyageAsync(sampleData, "float", voyageApiKey);
    var int8Embeddings = await FetchEmbeddingsFromVoyageAsync(sampleData, "int8", voyageApiKey);
    var ubinaryEmbeddings = await FetchEmbeddingsFromVoyageAsync(sampleData, "ubinary", voyageApiKey);

    var documents = new List<QuantizationEmbeddingDocument>();
    for (var i = 0; i < sampleData.Length; i++)
    {
        documents.Add(new QuantizationEmbeddingDocument
        {
            Text = sampleData[i],
            EmbeddingsFloat32 = new BinaryVectorFloat32(ToFloatArray(floatEmbeddings[i])),
            EmbeddingsInt8 = new BinaryVectorInt8(ToSByteArray(int8Embeddings[i])),
            EmbeddingsInt1 = new BinaryVectorPackedBit(ToByteArray(ubinaryEmbeddings[i]), 0)
        });
    }

    File.WriteAllText("embeddings.json", new QuantizationEmbeddingsFile { Data = documents }.ToBsonDocument().ToJson());
    Console.WriteLine("Embeddings saved to embeddings.json");
}

// Send a request to the Voyage AI embeddings API for the given output data type
private static async Task<List<List<double>>> FetchEmbeddingsFromVoyageAsync(string[] inputs, string outputDtype, string voyageApiKey)
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
