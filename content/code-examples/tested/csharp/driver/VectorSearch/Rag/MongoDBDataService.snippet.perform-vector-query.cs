public List<BsonDocument> PerformVectorQuery(float[] queryVector)
{
    var pipeline = new[]
    {
        new BsonDocument
        {
            { "$vectorSearch", new BsonDocument
                {
                    { "index", "vector_index" },
                    { "path", "embedding" },
                    { "queryVector", new BsonArray(queryVector) },
                    { "exact", true },
                    { "limit", 5 },
                }
            }
        },
        new BsonDocument
        {
            { "$project", new BsonDocument
                {
                    { "_id", 0 },
                    { "text", 1 },
                    { "score", new BsonDocument { { "$meta", "vectorSearchScore" } } },
                }
            }
        },
    };
    return _collection.Aggregate<BsonDocument>(pipeline).ToList();
}
