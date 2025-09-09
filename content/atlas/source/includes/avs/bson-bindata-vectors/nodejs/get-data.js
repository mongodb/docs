import { MongoClient, BSON } from 'mongodb'; 
import fs from 'fs/promises';
import { writeFile } from "fs/promises"; 
  
async function main() {  
  // Replace with your MongoDB connection string
  const uri = process.env.MONGODB_URI || '<CONNECTION-STRING>';

  // Create a new MongoClient instance
  const client = new MongoClient(uri);

  try {
    // Connect to your MongoDB cluster
    await client.connect();
  
    // Specify the database and collection  
    const db = client.db('sample_airbnb');  
    const collection = db.collection('listingsAndReviews');  
  
    // Filter to exclude null or empty summary fields  
    const filter = { summary: { $nin: [null, ''] } };  
  
    // Get a subset of documents in the collection  
    const documentsCursor = collection.find(filter).limit(50);  
  
    // Convert the cursor to an array to get the documents  
    const documents = await documentsCursor.toArray();  
  
    // Write the documents to a local file called "subset.json"  
    const outputFilePath = './subset.json';  
    fs.writeFile(outputFilePath, JSON.stringify(documents, null, 2), 'utf-8');  
  
    // Print the count of documents written to the file  
    console.log(`Written ${documents.length} documents to ${outputFilePath}`);  
  } catch (error) {  
    console.error('An error occurred:', error);  
  } finally {  
    // Ensure the client is closed when finished  
    await client.close();  
  }  
}  
  
main().catch(console.error);  

