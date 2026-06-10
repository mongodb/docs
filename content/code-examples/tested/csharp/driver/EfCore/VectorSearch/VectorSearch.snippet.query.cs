// Replace queryVector with a 1536-dimension embedding vector from your model
float[] queryVector = new float[] { 0.1f, -0.2f, 0.3f, ... };
var results = context.Movies
    .VectorSearch(m => m.PlotEmbedding, queryVector, limit: 10)
    .ToList();
