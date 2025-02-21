import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { MongoClient } from 'mongodb';
import { getEmbedding } from './get-embeddings.js';
import * as fs from 'fs';

async function run() {
    const client = new MongoClient(process.env.ATLAS_CONNECTION_STRING);

    try {
        // Save online PDF as a file
        const rawData = await fetch("https://investors.mongodb.com/node/12236/pdf");
        const pdfBuffer = await rawData.arrayBuffer();
        const pdfData = Buffer.from(pdfBuffer);
        fs.writeFileSync("investor-report.pdf", pdfData);

        const loader = new PDFLoader(`investor-report.pdf`);
        const data = await loader.load();

        // Chunk the text from the PDF
        const textSplitter = new RecursiveCharacterTextSplitter({
            chunkSize: 400,
            chunkOverlap: 20,
        });
        const docs = await textSplitter.splitDocuments(data);
        console.log(`Successfully chunked the PDF into ${docs.length} documents.`);

        // Connect to your Atlas cluster
        await client.connect();
        const db = client.db("rag_db");
        const collection = db.collection("test");

        console.log("Generating embeddings and inserting documents...");
        const insertDocuments = [];
        await Promise.all(docs.map(async doc => {

            // Generate embeddings using the function that you defined
            const embedding = await getEmbedding(doc.pageContent);

            // Add the document with the embedding to array of documents for bulk insert
            insertDocuments.push({
                document: doc,
                embedding: embedding
            });
        }))

        // Continue processing documents if an error occurs during an operation
        const options = { ordered: false };

        // Insert documents with embeddings into Atlas
        const result = await collection.insertMany(insertDocuments, options);  
        console.log("Count of documents inserted: " + result.insertedCount); 

    } catch (err) {
        console.log(err.stack);
    }
    finally {
        await client.close();
    }
}
run().catch(console.dir);
