namespace MyCompany.Embeddings;
using System;
using System.Net.Http;
using System.Text.Json;
using System.Threading.Tasks;
using System.Net.Http.Headers;

public class AIService
{
    private static readonly string? HuggingFaceAccessToken = Environment.GetEnvironmentVariable("HUGGINGFACE_ACCESS_TOKEN");
    private static readonly HttpClient Client = new HttpClient();
    public async Task<Dictionary<string, float[]>> GetEmbeddingsAsync(string[] texts)
    {
        const string modelName = "mixedbread-ai/mxbai-embed-large-v1";
        const string url = $"https://api-inference.huggingface.co/models/{modelName}";
        Client.DefaultRequestHeaders.Authorization 
            = new AuthenticationHeaderValue("Bearer", HuggingFaceAccessToken);
        var data = new { inputs = texts };
        var dataJson = JsonSerializer.Serialize(data);
        var content = new StringContent(dataJson,null, "application/json");
        var response = await Client.PostAsync(url, content);
        response.EnsureSuccessStatusCode();
        var responseString = await response.Content.ReadAsStringAsync();
        var embeddings = JsonSerializer.Deserialize<float[][]>(responseString);
        if (embeddings is null)
        {
            throw new ApplicationException("Failed to deserialize embeddings response to an array of floats.");
        }
        Dictionary<string, float[]> documentData = new Dictionary<string, float[]>();
        var embeddingCount = embeddings.Length;
        foreach (var value in Enumerable.Range(0, embeddingCount))
        {
            // Pair each embedding with the text used to generate it.
            documentData[texts[value]] = embeddings[value];
        }
        return documentData;
    }
}