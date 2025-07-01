using MyCompany.Embeddings;

var dataService = new DataService();
var documents = dataService.GetDocuments();

if (documents != null)
{
    Console.WriteLine("Generating embeddings.");
    var aiService = new AIService();
    var summaries = new List<string>();
    foreach (var document in documents)
    {
        var summary = document.GetValue("summary").ToString();
        if (summary != null)
        {
            summaries.Add(summary);
        }
    }
    
    try
    {
        if (summaries.Count > 0)
        {
            var embeddings = await aiService.GetEmbeddingsAsync(summaries.ToArray());
        
            try
            {
                var updatedCount = await dataService.AddEmbeddings(embeddings);
                Console.WriteLine($"{updatedCount} documents updated successfully.");
            } catch (Exception e)
            {
                Console.WriteLine($"Error adding embeddings to MongoDB: {e.Message}");
            }
        }
    }
    catch (Exception e)
    {
        Console.WriteLine($"Error creating embeddings for summaries: {e.Message}");
    }
}
else
{
    Console.WriteLine("No documents found");
}
