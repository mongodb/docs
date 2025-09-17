async function run() {
  try {
    // Configure your MongoDB collection
    const database = client.db("langchain_db");
    const collection = database.collection("test");
    const dbConfig = {  
      collection: collection,
      indexName: "vector_index", // The name of the MongoDB Search index to use.
      textKey: "text", // Field name for the raw text content. Defaults to "text".
      embeddingKey: "embedding", // Field name for the vector embeddings. Defaults to "embedding".
    };
    
    // Ensure that the collection is empty
    const count = await collection.countDocuments();
    if (count > 0) {
      await collection.deleteMany({});
    }

    // Save online PDF as a file
    const rawData = await fetch("https://webassets.mongodb.com/MongoDB_Best_Practices_Guide.pdf");
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

    // Instantiate MongoDB as a vector store
    const embeddingModel = new VoyageEmbeddings({ model: "voyage-3-large" });
    const vectorStore = await MongoDBAtlasVectorSearch.fromDocuments(docs, embeddingModel, dbConfig);

  } finally {
    // Ensure that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);
