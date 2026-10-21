import "dotenv/config";
import { MongoClient } from "mongodb";
import { MongoDBAtlasVectorSearch, VoyageEmbeddings } from "@langchain/mongodb";
import { ChatAnthropic } from "@langchain/anthropic";
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { PromptTemplate } from "@langchain/core/prompts";
import { RunnableSequence, RunnablePassthrough } from "@langchain/core/runnables";
import { StringOutputParser } from "@langchain/core/output_parsers";
import type { Document } from "@langchain/core/documents";
import * as fs from "fs";

const MONGODB_URI = process.env.MONGODB_URI!;

const client = new MongoClient(MONGODB_URI);
const formatDocumentsAsString = (docs: Document[]) =>
  docs.map((d) => d.pageContent).join("\n\n");

async function run() {
  try {
    // start-load-data
    // Configures your MongoDB collection
    const database = client.db("voyage_db");
    const collection = database.collection("langchain_typescript");

    // Ensures that the collection is empty
    const count = await collection.countDocuments();
    if (count > 0) {
      await collection.deleteMany({});
    }

    // Saves the online PDF as a local file
    const rawData = await fetch("https://investors.mongodb.com/node/13576/pdf");
    const pdfBuffer = await rawData.arrayBuffer();
    fs.writeFileSync("earnings-report.pdf", Buffer.from(pdfBuffer));

    // Loads and splits the sample data
    const loader = new PDFLoader("earnings-report.pdf");
    const data = await loader.load();
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 200,
      chunkOverlap: 20,
    });
    const docs = await textSplitter.splitDocuments(data);
    // end-load-data

    // start-vector-store
    // Instantiates the Voyage AI embedding model
    const embeddingModel = new VoyageEmbeddings({
      modelName: "voyage-4-large",
      basePath: "https://ai.mongodb.com/v1",
    });

    // Instantiates MongoDB as a vector store
    const vectorStore = await MongoDBAtlasVectorSearch.fromDocuments(
      docs,
      embeddingModel,
      {
        collection: collection,
        indexName: "vector_index",
        textKey: "text",
        embeddingKey: "embedding",
      }
    );
    // end-vector-store

    // start-create-index
    // Creates the index if it does not already exist
    const indexes = await collection.listSearchIndexes("vector_index").toArray();
    if (indexes.length === 0) {
      await collection.createSearchIndex({
        name: "vector_index",
        type: "vectorSearch",
        definition: {
          fields: [
            {
              type: "vector",
              numDimensions: 1024,
              path: "embedding",
              similarity: "cosine",
            },
            {
              type: "filter",
              path: "loc.pageNumber",
            },
          ],
        },
      });
    }

    // Waits for the index to build and become queryable
    console.log("Waiting for initial sync...");
    await new Promise((resolve) => setTimeout(resolve, 60000));
    // end-create-index

    // start-search
    const query = "New AI product partnerships";

    // Basic semantic search
    const results = await vectorStore.similaritySearchWithScore(query, 3);
    console.log("Semantic search results without pre-filtering:");
    console.log(JSON.stringify(results, null, 2));

    // Semantic search with pre-filtering
    const filteredResults = await vectorStore.similaritySearchWithScore(query, 3, {
      preFilter: { "loc.pageNumber": { $eq: 2 } },
    });
    console.log("Semantic search results with pre-filtering:");
    console.log(JSON.stringify(filteredResults, null, 2));
    // end-search-filtered

    // start-answer
    // Instantiates the vector store as a retriever
    const retriever = vectorStore.asRetriever();

    // Defines a prompt template
    const prompt = PromptTemplate.fromTemplate(
      `Answer the question based on the following context:
      {context}

      Question: {question}`
    );
    const model = new ChatAnthropic({ model: "claude-haiku-4-5-20251001" });

    // Constructs a chain to answer questions on your data
    const chain = RunnableSequence.from([
      {
        context: retriever.pipe(formatDocumentsAsString),
        question: new RunnablePassthrough(),
      },
      prompt,
      model,
      new StringOutputParser(),
    ]);

    // Prompts the chain
    const question = "Which AI providers have partnerships with MongoDB?";
    const answer = await chain.invoke(question);
    console.log("Question: " + question);
    console.log("Answer: " + answer);
    // end-answer
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
