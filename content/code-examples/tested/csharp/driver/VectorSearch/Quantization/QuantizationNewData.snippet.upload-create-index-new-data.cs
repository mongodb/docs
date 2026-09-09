public void StoreEmbeddings(string dbName, string collectionName)
{
    using var client = new MongoClient("<connectionString>");

    var fileContent = File.ReadAllText("embeddings.json");
    var embeddingsFile = BsonSerializer.Deserialize<QuantizationEmbeddingsFile>(BsonDocument.Parse(fileContent));

    var collection = client.GetDatabase(dbName).GetCollection<QuantizationEmbeddingDocument>(collectionName);
    collection.InsertMany(embeddingsFile.Data);
    Console.WriteLine("Inserted documents into MongoDB");
}

public string SetupVectorSearchIndex(string dbName, string collectionName, string indexName)
{
    using var client = new MongoClient("<connectionString>");
    var collection = client.GetDatabase(dbName).GetCollection<BsonDocument>(collectionName);

    var definition = new BsonDocument
    {
        { "fields", new BsonArray
            {
                new BsonDocument
                {
                    { "type", "vector" },
                    { "path", "embeddings_float32" },
                    { "numDimensions", 1024 },
                    { "similarity", "dotProduct" }
                },
                new BsonDocument
                {
                    { "type", "vector" },
                    { "path", "embeddings_int8" },
                    { "numDimensions", 1024 },
                    { "similarity", "dotProduct" }
                },
                new BsonDocument
                {
                    { "type", "vector" },
                    { "path", "embeddings_int1" },
                    { "numDimensions", 1024 },
                    { "similarity", "euclidean" }
                }
            }
        }
    };

    var indexModel = new CreateSearchIndexModel(indexName, SearchIndexType.VectorSearch, definition);
    var searchIndexView = collection.SearchIndexes;
    var name = searchIndexView.CreateOne(indexModel);
    Console.WriteLine($"Successfully created vector index named: {name}");
    Console.WriteLine("It may take up to a minute for the index to leave the BUILDING status and become queryable.");

    Console.WriteLine("Polling to confirm the index has changed from the BUILDING status.");
    var queryable = false;
    while (!queryable)
    {
        var indexes = searchIndexView.List();
        foreach (var index in indexes.ToEnumerable())
        {
            if (index["name"] == name)
            {
                queryable = index["queryable"].AsBoolean;
            }
        }
        if (!queryable)
        {
            Thread.Sleep(5000);
        }
    }
    Console.WriteLine($"{name} index is ready to query");
    return name;
}
