import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { vectorCollection } from "./config.js";  
import { VOYAGE_API_KEY, VOYAGE_MODEL } from "./config.js"; 
import { VoyageAIClient } from "voyageai"; 
import { MONGODB_URI } from "./config.js";
import * as fs from 'fs';
import fetch from 'node-fetch';

console.log("Connecting to MongoDB:", MONGODB_URI);
const EMBEDDING_DIMENSIONS = 1024;  

// Use Voyage AI Client SDK to get embeddings 
export async function getEmbedding(data, input_type) {
    if (!VOYAGE_API_KEY) {
        throw new Error("VOYAGE_API_KEY is not set in environment variables.");
    }

    try {
        const client = new VoyageAIClient({ apiKey: VOYAGE_API_KEY });
        const response = await client.embed({
            input: [data],
            model: VOYAGE_MODEL,
            input_type: input_type // "document" or "query"
        });

        if (response.data && response.data.length > 0) {
            return response.data[0].embedding;
        }
        throw new Error("No embedding data found from Voyage AI response.");
    }
    catch (error) {
        console.error("Error generating Voyage AI embedding:", error);
        return null; 
    }
}

// Ingest data from a PDF, generate embeddings, and store in MongoDB
export async function ingestData() {
    try {
        // download PDF
        const rawData = await fetch("https://investors.mongodb.com/node/13176/pdf");
        const pdfBuffer = await rawData.arrayBuffer();
        fs.writeFileSync("investor-report.pdf", Buffer.from(pdfBuffer));

        // load and split PDF
        const loader = new PDFLoader("investor-report.pdf");
        const data = await loader.load();
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 400,
            chunkOverlap: 20,
        });
        const docs = await textSplitter.splitDocuments(data);
        console.log(`Chunked PDF into ${docs.length} documents.`);

        // generate embeddings and insert
        const insertDocuments = await Promise.all(docs.map(async doc => ({
            document: doc,
            embedding: await getEmbedding(doc.pageContent, "document"),
        })));

        const result = await vectorCollection.insertMany(insertDocuments, { ordered: false });  
        console.log("Inserted documents:", result.insertedCount);        
    } catch (err) {  
        console.error("Ingestion error:", err);  
    }  

}


// Create a vector search index 
export async function createVectorIndex() {
    try {
        
        // check if the index already exists
        const existingIndexes = await vectorCollection.listSearchIndexes().toArray();
        if (existingIndexes.some(index => index.name === "vector_index")) {
            console.log("Vector index already exists. Skipping creation.");
            return;
        }
        
        // define your Vector Search index
        const index = {
            name: "vector_index",
            type: "vectorSearch",
            definition: {
                "fields": [
                    {
                    "type": "vector",
                    "path": "embedding",
                    "numDimensions": EMBEDDING_DIMENSIONS,
                    "similarity": "cosine",
                    }
                ]
            }
        }

        // run the helper method to ensure the index is created
        const result = await vectorCollection.createSearchIndex(index);
        console.log(`New index named ${result} is building.`);

        // wait for the index to be ready to query
        console.log("Polling to check if the index is ready. This may take up to a minute.")
        let isQueryable = false;
        while (!isQueryable) {
            const cursor = vectorCollection.listSearchIndexes();
            for await (const index of cursor) {
                if (index.name === result) {
                    if (index.queryable) {
                        console.log(`${result} is ready for querying.`);
                        isQueryable = true;
                    } else {
                        await new Promise(resolve => setTimeout(resolve, 5000));
                    }
                }
            }
        }
    } catch (err) {
        console.error("Error creating vector index:", err);
        throw err;
    }
}
