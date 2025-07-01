namespace MyCompany.Embeddings;

using OpenAI.Embeddings;
using System;
using System.Threading.Tasks;

public class AIService
{
    private static readonly string? OpenAIApiKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
    private static readonly string EmbeddingModelName = "text-embedding-3-small";
    public async Task<Dictionary<string, float[]>> GetEmbeddingsAsync(string[] texts)
    {
        EmbeddingClient embeddingClient = new(model: EmbeddingModelName, apiKey: OpenAIApiKey);
        Dictionary<string, float[]> documentData = new Dictionary<string, float[]>();
        try
        {
            var result = await embeddingClient.GenerateEmbeddingsAsync(texts);
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
