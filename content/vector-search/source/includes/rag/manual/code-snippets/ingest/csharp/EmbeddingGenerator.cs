namespace MyCompany.RAG;

public class EmbeddingGenerator
{
    private readonly AIService _aiService = new();
    private readonly MongoDBDataService _dataService = new();

    public async Task<string> GenerateEmbeddings(List<string> textChunks)
    {
        // Generate a vector embedding for each text chunk
        var embeddings = await _aiService.GetEmbeddingsAsync(textChunks.ToArray());
        // Store the text chunks alongside their embeddings in MongoDB
        return await _dataService.AddDocumentsAsync(embeddings);
    }
}
