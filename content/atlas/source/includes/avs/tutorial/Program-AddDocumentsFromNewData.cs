using MyCompany.Embeddings;

var aiService = new AIService();
var texts = new string[]
{
    "Titanic: The story of the 1912 sinking of the largest luxury liner ever built",
    "The Lion King: Lion cub and future king Simba searches for his identity",
    "Avatar: A marine is dispatched to the moon Pandora on a unique mission"
};
var embeddings = await aiService.GetEmbeddingsAsync(texts);

var dataService = new DataService();
await dataService.AddDocumentsAsync(embeddings);
