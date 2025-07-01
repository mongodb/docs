namespace MyCompany.RAG.Local;
using Microsoft.Extensions.AI;

public class OllamaAIService
{
    private static readonly System.Uri OllamaUri = new Uri("http://localhost:11434/");
    private static readonly Uri OllamaUri = new("http://localhost:11434/");
    private static readonly string EmbeddingModelName = "nomic-embed-text";
    private static readonly OllamaEmbeddingGenerator EmbeddingGenerator = new OllamaEmbeddingGenerator(OllamaUri, EmbeddingModelName);
    private static readonly string ChatModelName = "mistral";
    private static readonly OllamaChatClient ChatClient = new OllamaChatClient(OllamaUri, ChatModelName);

    public async Task<float[]> GetEmbedding(string text)
    {
        // Method details...
    }

    public async Task<string> SummarizeAnswer(string context)
    {
        string question = "Can you recommend me a few AirBnBs that are beach houses? Include a link to the listings.";
        
        string prompt = $"""
                         Use the following pieces of context to answer the question at the end.
                         Context: {context}
                         Question: {question}
                         """;
        
        ChatCompletion response = await ChatClient.CompleteAsync(prompt, new ChatOptions { MaxOutputTokens = 400 });
        return response.ToString();
    }
}