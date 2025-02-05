namespace MyCompany.RAG;

using OpenAI.Embeddings;
using System;
using System.Threading.Tasks;

public class OpenAIService
{
    private static readonly string? OpenAIApiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
    private static readonly string EmbeddingModelName = "text-embedding-3-small";
    private static readonly EmbeddingClient EmbeddingClient = new(model: EmbeddingModelName, apiKey: OpenAIApiKey);
    public async Task<Dictionary<string, float[]>> GetEmbeddingsAsync(string[] texts)
    {
        Dictionary<string, float[]> documentData = new Dictionary<string, float[]>();
        try
        {
            var result = await EmbeddingClient.GenerateEmbeddingsAsync(texts);
            var embeddingCount = result.Value.Count;
            foreach (var index in Enumerable.Range(0, embeddingCount))
            {
                // Pair each embedding with the text used to generate it.
                documentData[texts[index]] = result.Value[index].ToFloats().ToArray();
            }
        }
        catch (Exception e)
        {
            throw new ApplicationException(e.Message);
        }
        return documentData;
    }
}