// :replace-start: {
//   "terms": {
//     "Examples.VectorSearch.Rag": "MyCompany.RAG",
//     "public partial class AIService": "public class AIService"
//   }
// }

// :snippet-start: ai-service-class
namespace Examples.VectorSearch.Rag;

using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

public partial class AIService
{
    private readonly HttpClient _httpClient;
    private readonly string _chatEndpoint;
    private static readonly string EmbeddingModelName = "voyage-4-large";
    private static readonly string ApiEndpoint = "https://ai.mongodb.com/v1/embeddings";
    private static readonly string ChatModelName = "gpt-5.4-mini";

    public AIService()
    {
        _httpClient = new HttpClient();
        _chatEndpoint = "https://api.openai.com/v1/chat/completions";
    }

    // :remove-start:
    // Tests can route OpenAI calls through the Grove AI gateway, an
    // OpenAI-compatible internal endpoint that authenticates with an
    // api-key header in addition to the bearer token. This constructor
    // is stripped from the published snippet so readers see the
    // standard OpenAI endpoint above.
    public AIService(HttpClient httpClient, string? openaiBaseUrl = null)
    {
        _httpClient = httpClient;
        var baseUrl = string.IsNullOrWhiteSpace(openaiBaseUrl)
            ? "https://api.openai.com/v1"
            : openaiBaseUrl.TrimEnd('/');
        _chatEndpoint = $"{baseUrl}/chat/completions";
        if (!string.IsNullOrWhiteSpace(openaiBaseUrl))
        {
            _httpClient.DefaultRequestHeaders.Add(
                "api-key",
                Environment.GetEnvironmentVariable("OPENAI_API_KEY"));
        }
    }
    // :remove-end:
    public async Task<Dictionary<string, float[]>> GetEmbeddingsAsync(string[] texts)
    {
        var voyageApiKey = Environment.GetEnvironmentVariable("VOYAGE_API_KEY");
        using var request = new HttpRequestMessage(HttpMethod.Post, ApiEndpoint);
        request.Headers.Authorization =
            new AuthenticationHeaderValue("Bearer", voyageApiKey);
        request.Content = new StringContent(
            JsonSerializer.Serialize(new
            {
                input = texts,
                model = EmbeddingModelName,
                truncation = true,
            }),
            Encoding.UTF8,
            "application/json");

        var response = await _httpClient.SendAsync(request);

        if (!response.IsSuccessStatusCode)
            throw new ApplicationException(
                $"Error calling Voyage API: {response.ReasonPhrase}");

        var body = await response.Content.ReadAsStringAsync();
        var parsed = JsonSerializer.Deserialize<EmbeddingResponse>(body)!;

        return parsed.Data!.ToDictionary(
            item => texts[item.Index],
            item => item.Embedding.Select(e => (float)e).ToArray());
    }

    private sealed class EmbeddingResponse
    {
        [JsonPropertyName("data")]
        public List<EmbeddingItem>? Data { get; set; }
    }

    private sealed class EmbeddingItem
    {
        [JsonPropertyName("embedding")]
        public List<double> Embedding { get; set; } = [];

        [JsonPropertyName("index")]
        public int Index { get; set; }
    }
}
// :snippet-end:
// :replace-end:
