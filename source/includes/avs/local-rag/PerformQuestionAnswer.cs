namespace MyCompany.RAG.Local;

public class PerformQuestionAnswer
{
    private readonly MongoDBDataService _dataService = new();
    private readonly OllamaAIService _ollamaAiService = new();

    public async Task<string> SummarizeResults(string question)
    {
        // Get the vector embedding for the query
        var query = question;
        var queryEmbedding = await _ollamaAiService.GetEmbedding(query);
        // Query the vector database for applicable query results
        var matchingDocuments = _dataService.PerformVectorQuery(queryEmbedding);
        // Construct a string from the query results for performing QA with the LLM
        var sb = new System.Text.StringBuilder();
        if (matchingDocuments != null)
        {
            foreach (var doc in matchingDocuments)
            {
                sb.AppendLine($"Summary: {doc.GetValue("summary").ToString()}");
                sb.AppendLine($"Listing URL: {doc.GetValue("listing_url").ToString()}");
            }
        }
        else
        {
            return "No matching documents found.";
        }
        return await _ollamaAiService.SummarizeAnswer(sb.ToString());
    }
}