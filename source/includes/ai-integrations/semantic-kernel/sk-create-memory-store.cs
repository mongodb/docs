// Import Packages
using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.Connectors.MongoDB; 
using Microsoft.SemanticKernel.Connectors.OpenAI;
using Microsoft.SemanticKernel.Memory;
using Microsoft.SemanticKernel.Plugins.Memory;

# pragma warning disable SKEXP0010, SKEXP0020, SKEXP0001, SKEXP0050

class Program {
    static async Task Main(string[] args) {

        // Get connection string and OpenAI API Key
        var connectionString = Environment.GetEnvironmentVariable("ATLAS_CONNECTION_STRING");
        if (connectionString == null)
        {
            Console.WriteLine("You must set your 'ATLAS_CONNECTION_STRING' environment variable.");
            Environment.Exit(0);
        }
        var openAIKey = Environment.GetEnvironmentVariable("OPENAI_API_KEY");
        if (openAIKey == null)
        {
            Console.WriteLine("You must set your 'OPENAPI_KEY' environment variable.");
            Environment.Exit(0);
        }        
        
        // Create new OpenAI API Embedding Model 
        var embeddingGenerator = new OpenAITextEmbeddingGenerationService("text-embedding-ada-002", openAIKey);

        // Initialize Kernel
        IKernelBuilder builder = Kernel.CreateBuilder();

        // Add OpenAI Chat Completion to Kernel
        builder.AddOpenAIChatCompletion(
            modelId: "gpt-3.5-turbo",
            apiKey: openAIKey
        ); 

        Kernel kernel = builder.Build();

        // Instantiate Atlas as a memory store.
        MongoDBMemoryStore memoryStore = new(connectionString, "semantic_kernel_db", indexName: "vector_index"); 
        SemanticTextMemory textMemory = new(memoryStore, embeddingGenerator);

        // Populate memory with sample data
        async Task PopulateMemoryAsync(Kernel kernel) {
            await textMemory.SaveInformationAsync(collection: "test", text: "I am a developer", id: "1");
            await textMemory.SaveInformationAsync(collection: "test", text: "I started using MongoDB two years ago", id: "2");
            await textMemory.SaveInformationAsync(collection: "test", text: "I'm using MongoDB Vector Search with Semantic Kernel to implement RAG", id: "3");
            await textMemory.SaveInformationAsync(collection: "test", text: "I like coffee", id: "4");
            
        }
        await PopulateMemoryAsync(kernel);
    }
}