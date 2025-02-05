namespace MyCompany.RAG;

public class EmbeddingGenerator
{
    private readonly MongoDBDataService _dataService = new();
    private readonly OpenAIService _openAiService = new();
    public async Task<string> GenerateEmbeddings(List<string> textChunks)
    {
        Console.WriteLine("Generating embeddings.");
        Dictionary<string, float[]> docs = new Dictionary<string, float[]>();
        try
        {
            // Pass the text chunks to OpenAI to generate vector embeddings
            var embeddings = await _openAiService.GetEmbeddingsAsync(textChunks.ToArray());
            
            // Pair each embedding with the text chunk used to generate it
            int index = 0;
            foreach (var embedding in embeddings)
            {
                docs[textChunks[index]] = embedding.Value;
                index++;
            }
        }
        catch (Exception e)
        {
            throw new ApplicationException("Error creating embeddings for text chunks: "  + e.Message);
        }
        // Add a new document to the MongoDB collection for each text and vector embedding pair
        var result = await _dataService.AddDocumentsAsync(docs);
        return result;
    }
}
