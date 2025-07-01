using MongoDB.Bson;
using MyCompany.Embeddings;

var aiService = new AIService();
var queryString = "ocean tragedy";
var queryEmbedding = await aiService.GetEmbeddingsAsync([queryString]);

if (!queryEmbedding.Any())
{
    Console.WriteLine("No embeddings found.");
}
else
{
    var dataService = new DataService();
    var matchingDocuments = dataService.PerformVectorQuery(queryEmbedding[queryString]);
    if (matchingDocuments == null)
    {
        Console.WriteLine("No documents matched the query.");
    }
    else
    {
        foreach (var document in matchingDocuments)
        {
            Console.WriteLine(document.ToJson());
        }
    }
}
