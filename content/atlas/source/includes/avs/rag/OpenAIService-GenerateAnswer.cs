namespace MyCompany.RAG;

using OpenAI.Embeddings;
using OpenAI.Chat;
using System;
using System.Text;
using System.Threading.Tasks;

public class OpenAIService
{
    private static readonly string? OpenAIApiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
    private static readonly string EmbeddingModelName = "text-embedding-3-small";
    private static readonly EmbeddingClient EmbeddingClient = new(model: EmbeddingModelName, apiKey: OpenAIApiKey);
    private static readonly string ChatModelName = "gpt-4o-mini";
    private static readonly ChatClient ChatClient = new(model: ChatModelName, apiKey: OpenAIApiKey);

    public async Task<Dictionary<string, float[]>> GetEmbeddingsAsync(string[] texts)
    {
        // Method details...
    }

    public async Task<string> GenerateAnswer(string question, string context)
    {   
        string prompt = $"""
                         Answer the following question based on the given context.
                         Context: {context}
                         Question: {question}
                         """;
        byte[] binaryContent = Encoding.UTF8.GetBytes(prompt);
        IEnumerable<ChatMessage> messages = new List<ChatMessage>([prompt]);
        ChatCompletion responses = await ChatClient.CompleteChatAsync(messages, new ChatCompletionOptions { MaxOutputTokenCount = 400 });
        var summaryResponse = responses.Content[0].Text;
        if (summaryResponse is null)
        {
            throw new ApplicationException("No response from the chat client.");
        }
        return summaryResponse;
    }
}