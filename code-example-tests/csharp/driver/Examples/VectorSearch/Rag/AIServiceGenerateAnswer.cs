namespace Examples.VectorSearch.Rag;

using System.Net.Http.Headers;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

public partial class AIService
{
    // :snippet-start: generate-answer
    public async Task<string> GenerateAnswer(string question, string context)
    {
        var openaiApiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
        var prompt = $"""
            Answer the following question based on the given context.
            Context: {context}
            Question: {question}
            """;

        using var request = new HttpRequestMessage(HttpMethod.Post, _chatEndpoint);
        request.Headers.Authorization =
            new AuthenticationHeaderValue("Bearer", openaiApiKey);
        request.Content = new StringContent(
            JsonSerializer.Serialize(new
            {
                model = ChatModelName,
                messages = new[] { new { role = "user", content = prompt } },
                max_completion_tokens = 400,
            }),
            Encoding.UTF8,
            "application/json");

        var response = await _httpClient.SendAsync(request);

        if (!response.IsSuccessStatusCode)
            throw new ApplicationException(
                $"OpenAI API error: {response.ReasonPhrase}");

        var body = await response.Content.ReadAsStringAsync();
        var parsed = JsonSerializer.Deserialize<ChatResponse>(body)!;
        return parsed.Choices![0].Message!.Content
            ?? throw new ApplicationException("No response from OpenAI.");
    }

    private sealed class ChatResponse
    {
        [JsonPropertyName("choices")]
        public List<ChatChoice>? Choices { get; set; }
    }

    private sealed class ChatChoice
    {
        [JsonPropertyName("message")]
        public ChatMessageContent? Message { get; set; }
    }

    private sealed class ChatMessageContent
    {
        [JsonPropertyName("content")]
        public string? Content { get; set; }
    }
    // :snippet-end:
}
