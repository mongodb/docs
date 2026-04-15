// Query vector representing "time travel adventure"
float[] queryVector = new float[] { 0.1f, -0.2f, 0.3f }; // Replace with a 1536-dimension embedding vector to match the index

var options = new VectorSearchOptions<Movie>()
{
    IndexName = "plot_embedding",
    NumberOfCandidates = 50,
    Filter = Builders<Movie>.Filter.Gte(m => m.Imdb.Rating, 8.0)
};

var result = moviesCollection.Aggregate()
    .VectorSearch(
        m => m.PlotEmbedding,
        queryVector,
        10,
        options)
    .ToList();
