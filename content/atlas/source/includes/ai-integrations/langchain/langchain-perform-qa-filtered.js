// Implement RAG to answer questions on your data 
const retriever = await vectorStore.asRetriever({
    searchType: "mmr", // Defaults to "similarity
    filter: { preFilter: { "loc.pageNumber": { "$eq": 17 } } },
    searchKwargs: {
      fetchK: 20,
      lambda: 0.1,
    },
  });
const prompt =
  PromptTemplate.fromTemplate(`Answer the question based on the following context:
  {context}

  Question: {question}`);
const model = new ChatOpenAI({});
const chain = RunnableSequence.from([
  {
    context: retriever.pipe(formatDocumentsAsString),
    question: new RunnablePassthrough(),
  },
  prompt,
  model,
  new StringOutputParser(),
]);

// Prompt the LLM
const question = "How can I secure my MongoDB Atlas cluster?";  
const answer = await chain.invoke(question);
console.log("Question: " + question);
console.log("Answer: " + answer);

// Return source documents
const retrievedResults = await retriever.getRelevantDocuments(question)
const documents = retrievedResults.map((documents => ({
  pageContent: documents.pageContent,
  pageNumber: documents.metadata.loc.pageNumber,
})))
console.log("\nSource documents:\n" + JSON.stringify(documents, 1, 2))
