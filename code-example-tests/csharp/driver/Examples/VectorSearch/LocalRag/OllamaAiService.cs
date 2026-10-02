// :replace-start: {
//   "terms": {
//     "Examples.VectorSearch.LocalRag": "MyCompany.RAG.Local"
//   }
// }

// :snippet-start: ollama-ai-service
using Microsoft.Extensions.AI;

namespace Examples.VectorSearch.LocalRag;

public class OllamaAIService
{
    private static readonly Uri OllamaUri = new("http://localhost:11434/");
    private static readonly string EmbeddingModelName = "nomic-embed-text";
    private static readonly OllamaEmbeddingGenerator EmbeddingGenerator = new OllamaEmbeddingGenerator(OllamaUri, EmbeddingModelName);
    private static readonly string ChatModelName = "mistral";
    private static readonly OllamaChatClient ChatClient = new OllamaChatClient(OllamaUri, ChatModelName);

    public async Task<float[]> GetEmbedding(string text)
    {
        var embedding = await EmbeddingGenerator.GenerateVectorAsync(text);
        return embedding.ToArray();
    }

    public async Task<string> SummarizeAnswer(string context)
    {
        string question = "Can you recommend me a few AirBnBs that are beach houses? Include a link to the listings.";

        string prompt = $"""
                         Use the following pieces of context to answer the question at the end.
                         Context: {context}
                         Question: {question}
                         """;

        ChatResponse response = await ChatClient.GetResponseAsync(prompt, new ChatOptions { MaxOutputTokens = 400 });
        return response.Text;
    }
}
// :snippet-end:

// :replace-end:
