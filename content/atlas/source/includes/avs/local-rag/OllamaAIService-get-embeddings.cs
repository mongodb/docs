namespace MyCompany.RAG.Local;
using Microsoft.Extensions.AI;

public class OllamaAIService
{
    private static readonly Uri OllamaUri = new("http://localhost:11434/");
    private static readonly string EmbeddingModelName = "nomic-embed-text";
    private static readonly OllamaEmbeddingGenerator EmbeddingGenerator = new OllamaEmbeddingGenerator(OllamaUri, EmbeddingModelName);

    public async Task<float[]> GetEmbedding(string text)
    {
        var embedding = await EmbeddingGenerator.GenerateEmbeddingVectorAsync(text);
        return embedding.ToArray();
    }
}