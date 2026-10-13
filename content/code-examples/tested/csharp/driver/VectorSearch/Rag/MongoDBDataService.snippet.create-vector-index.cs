public string CreateVectorIndex()
{
    var indexName = "vector_index";
    var definition = new BsonDocument
    {
        { "fields", new BsonArray
            {
                new BsonDocument
                {
                    { "type", "vector" },
                    { "numDimensions", 1024 },
                    { "path", "embedding" },
                    { "similarity", "cosine" },
                }
            }
        },
    };
    var model = new CreateSearchIndexModel(
        indexName,
        SearchIndexType.VectorSearch,
        definition);
    _collection.SearchIndexes.CreateOne(model);

    // Poll until the index is queryable
    Console.WriteLine("Polling to check if the index is ready. This may take up to a minute.");
    var deadline = DateTime.UtcNow.AddMinutes(3);
    bool queryable = false;
    while (!queryable)
    {
        if (DateTime.UtcNow > deadline)
            throw new TimeoutException(
                $"Search index {indexName} did not become queryable within 3 minutes.");
        foreach (var index in _collection.SearchIndexes.List().ToEnumerable())
        {
            if (index["name"] == indexName)
                queryable = index["queryable"].AsBoolean;
        }
        if (!queryable)
            Thread.Sleep(5000);
    }
    Console.WriteLine($"{indexName} is ready for querying.");
    return indexName;
}
