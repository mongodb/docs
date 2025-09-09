using Microsoft.Extensions.AI;
using Microsoft.Extensions.VectorData;
using Microsoft.SemanticKernel.Connectors.MongoDB;
using Microsoft.SemanticKernel.Data;
using MongoDB.Bson;
using MongoDB.Driver;
using OpenAI;

#pragma warning disable SKEXP0001

static class Program
{
    static async Task Main(string[] args)
    {
        // Get connection string and OpenAI API Key
        var connectionString = Environment.GetEnvironmentVariable("MONGODB_URI");
        if (connectionString == null)
        {
            Console.WriteLine("You must set your 'MONGODB_URI' environment variable.");
            Environment.Exit(0);
        }

        var openAIKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
        if (openAIKey == null)
        {
            Console.WriteLine("You must set your 'OPENAPI_KEY' environment variable.");
            Environment.Exit(0);
        }

        // Create new OpenAI API Embedding Model
        var embeddingGenerator = new OpenAIClient(openAIKey)
            .GetEmbeddingClient("text-embedding-ada-002")
            .AsIEmbeddingGenerator();

        // Instantiate MongoDB as a vector store
        var mongoClient = new MongoClient(connectionString);
        var options = new MongoVectorStoreOptions { EmbeddingGenerator = embeddingGenerator };
        var vectorStore = new MongoVectorStore(mongoClient.GetDatabase("semantic_kernel_db"), options);

        // Sample data
        string[] lines =
        [
            "I am a developer",
            "I started using MongoDB two years ago",
            "I'm using MongoDB Vector Search with Semantic Kernel to implement RAG",
            "I like coffee"
        ];

        // Populate database with sample data
        await CreateCollectionFromListAsync<string, DataModel>(vectorStore, "records", lines, embeddingGenerator, CreateRecord);
        
        // Get the specific collection from the vector store
        var recordCollection = vectorStore.GetCollection<string, DataModel>("records");
    }

    static DataModel CreateRecord(string text, ReadOnlyMemory<float> embedding)
        => new()
        {
            Key = ObjectId.GenerateNewId().ToString(),
            Text = text,
            Embedding = embedding
        };

    static async Task CreateCollectionFromListAsync<TKey, TRecord>(
        this VectorStore vectorStore,
        string collectionName,
        string[] entries,
        IEmbeddingGenerator<string, Embedding<float>> embeddingGenerator,
        Func<string, ReadOnlyMemory<float>, TRecord> createRecord)
        where TKey : notnull
        where TRecord : class
    {
        // Get and create collection if it doesn't exist
        var collection = vectorStore.GetCollection<TKey, TRecord>(collectionName);
        await collection.EnsureCollectionExistsAsync().ConfigureAwait(false);

        // Create records and generate embeddings for them
        var embeddings = await embeddingGenerator.GenerateAsync(entries);
        var records = entries.Zip(embeddings, (entry, embedding) => createRecord(entry, embedding.Vector));

        // Add them to the database
        await collection.UpsertAsync(records).ConfigureAwait(false);
    }

    internal sealed class DataModel
    {
        [VectorStoreKey]
        [TextSearchResultName]
        public required String Key { get; init; }

        [VectorStoreData]
        [TextSearchResultValue]
        public required string Text { get; init; }

        [VectorStoreVector(1536)]
        public ReadOnlyMemory<float> Embedding { get; init; }
    }
}