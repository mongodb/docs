namespace MyCompany.RAG;

public class PerformTestQuery
{
    private readonly MongoDBDataService _dataService = new();
    private readonly OpenAIService _openAiService = new();

    public async Task<string> GetQueryResults(string question)
    {
        // Get the vector embedding for the query
        var query = question;
        var queryEmbeddings = await _openAiService.GetEmbeddingsAsync([query]);
        // Query the vector database for applicable query results
        var matchingDocuments = _dataService.PerformVectorQuery(queryEmbeddings[query]);
        // Construct a string from the query results for performing QA with the LLM
        var sb = new System.Text.StringBuilder();
        if (matchingDocuments != null)
        {
            foreach (var doc in matchingDocuments)
            {
                sb.AppendLine($"Text: {doc.GetValue("text").ToString()}");
                sb.AppendLine($"Score: {doc.GetValue("score").ToString()}");
            }
        }
        else
        {
            return "No matching documents found.";
        }
        return sb.ToString();
    }
}