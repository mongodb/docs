namespace MyCompany.RAG;

public class RAGPipeline
{
    private readonly MongoDBDataService _dataService = new();
    private readonly OpenAIService _openAiService = new();

    public async Task<string> GenerateResults(string question)
    {
        // Get the vector embedding for the query
        var query = question;
        var queryEmbedding = await _openAiService.GetEmbeddingsAsync([query]);
        // Query the vector database for applicable query results
        var matchingDocuments = _dataService.PerformVectorQuery(queryEmbedding[query]);
        // Construct a string from the query results for performing QA with the LLM
        var sb = new System.Text.StringBuilder();
        if (matchingDocuments != null)
        {
            foreach (var doc in matchingDocuments)
            {
                sb.AppendLine($"Text: {doc.GetValue("text").ToString()}");
            }
        }
        else
        {
            return "No matching documents found.";
        }
        return await _openAiService.GenerateAnswer(question, sb.ToString());
    }
}
