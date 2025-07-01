const { MongoClient } = require('mongodb');
const fs = require('fs'); // Import the fs module for file system operations

async function main() {
    // Replace with your Atlas connection string
    const uri = process.env.MONGODB_URI || '<CONNECTION-STRING>';

    // Create a new MongoClient instance
    const client = new MongoClient(uri);

    try {
    // Connect to your Atlas cluster
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

    // Log the documents to verify their content
    console.log('Documents retrieved:', documents);

    // Write the documents to a local file called "subset.json"
    const outputFilePath = './subset.json';
    fs.writeFileSync(outputFilePath, JSON.stringify(documents, null, 2), 'utf-8');

    console.log(`Subset of documents written to: ${outputFilePath}`);
    } catch (error) {
    console.error('An error occurred:', error);
    } finally {
    // Ensure the client is closed when finished
    await client.close();
    }
}

main().catch(console.error);