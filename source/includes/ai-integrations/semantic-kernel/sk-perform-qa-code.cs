// Create a kernel with OpenAI chat completion
IKernelBuilder kernelBuilder = Kernel.CreateBuilder();
kernelBuilder.AddOpenAIChatCompletion(
        modelId: "gpt-4o",
        apiKey: openAIKey);
Kernel kernel = kernelBuilder.Build();

// Create a text search instance using the vector store collection.
var textSearch = new VectorStoreTextSearch<DataModel>(recordCollection, embeddingGenerator);

// --- Modified RAG Section ---
var userQuestion = "When did I start using MongoDB?";
string retrievedContext = "No relevant context found."; // Default

// 1. Perform search to get context
var searchResults = await textSearch.GetTextSearchResultsAsync(userQuestion, new() { Top = 1 }); // Get most relevant result

await foreach (var result in searchResults.Results)
{
    if (result.Value != null)
    {
        retrievedContext = result.Value; // Use the text from the search result as context
        break; // Take the most relevant result
    }
}

// 2. Define a prompt template that uses the retrieved context
const string ragPromptTemplate = @"
Context:
{{$context}}

Question:
{{$question}}

Based *only* on the context provided, answer the question.
Answer:
";

// 3. Create a function from the RAG prompt template
var ragFunction = kernel.CreateFunctionFromPrompt(ragPromptTemplate);

// 4. Prepare arguments for the RAG prompt
var ragArguments = new KernelArguments
{
    ["question"] = userQuestion,
    ["context"] = retrievedContext
};

// 5. Invoke the RAG prompt
var ragResult = await kernel.InvokeAsync(ragFunction, ragArguments);

Console.WriteLine($"Question: {userQuestion}");
Console.WriteLine($"Retrieved Context: {retrievedContext}");
Console.WriteLine($"Answer: {ragResult.GetValue<string>()}");
// --- End of Modified RAG Section ---
