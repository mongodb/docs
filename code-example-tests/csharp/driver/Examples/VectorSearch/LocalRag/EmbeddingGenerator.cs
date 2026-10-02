// :replace-start: {
//   "terms": {
//     "Examples.VectorSearch.LocalRag": "MyCompany.RAG.Local",
//     "LocalRagEmbeddingGenerator": "EmbeddingGenerator"
//   }
// }

// The class is named LocalRagEmbeddingGenerator in the tested code to avoid
// colliding with Microsoft.Extensions.AI's own EmbeddingGenerator types, which
// are in scope in this file's assembly. A replace term at the top of this file
// restores the documented EmbeddingGenerator name in the published snippet.
// :snippet-start: embedding-generator
namespace Examples.VectorSearch.LocalRag;

public class LocalRagEmbeddingGenerator
{
    private readonly MongoDBDataService _dataService = new();
    private readonly OllamaAIService _ollamaAiService = new();

    public async Task<string> GenerateEmbeddings()
    {
        // Retrieve documents from MongoDB
        var documents = _dataService.GetDocuments();
        if (documents != null)
        {
            Console.WriteLine("Generating embeddings.");
            Dictionary<string, float[]> embeddings = new Dictionary<string, float[]>();
            foreach (var document in documents)
            {
                try
                {
                    var id = document.GetValue("_id").ToString();
                    var summary = document.GetValue("summary").ToString();
                    if (id != null && summary != null)
                    {
                        // Use Ollama to generate vector embeddings for each
                        // document's "summary" field
                        var embedding = await _ollamaAiService.GetEmbedding(summary);
                        embeddings.Add(id, embedding);
                    }
                }
                catch (Exception e)
                {
                    return $"Error creating embeddings for summaries: {e.Message}";
                }
            }
            // Add a new field to the MongoDB documents with the vector embedding
            var result = await _dataService.UpdateDocuments(embeddings);
            return result;
        }
        else
        {
            return "No documents found";
        }
    }
}
// :snippet-end:

// :replace-end:
