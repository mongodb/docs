async function run() {
  try {
    // Configure your Atlas collection
    const database = client.db("langchain_db");
    const collection = database.collection("test");
    const dbConfig = {  
      collection: collection,
      indexName: "vector_index", // The name of the Atlas search index to use.
      textKey: "text", // Field name for the raw text content. Defaults to "text".
      embeddingKey: "embedding", // Field name for the vector embeddings. Defaults to "embedding".
    };
    
    // Ensure that the collection is empty
    await collection.deleteMany({});

    // Save online PDF as a file
    const rawData = await fetch("https://query.prod.cms.rt.microsoft.com/cms/api/am/binary/RE4HkJP");
    const pdfBuffer = await rawData.arrayBuffer();
    const pdfData = Buffer.from(pdfBuffer);
    fs.writeFileSync("atlas_best_practices.pdf", pdfData);

    // Load and split the sample data
    const loader = new PDFLoader(`atlas_best_practices.pdf`);
    const data = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 200,
      chunkOverlap: 20,
    });
    const docs = await textSplitter.splitDocuments(data);

    // Instantiate Atlas as a vector store
    const vectorStore = await MongoDBAtlasVectorSearch.fromDocuments(docs, new OpenAIEmbeddings(), dbConfig);

  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
