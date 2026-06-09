const { MongoClient } = require('mongodb');

async function createTransportSynonyms() {
  // Connection URI
  const uri = '<connection-string>';
  
  // Create a new MongoClient
  const client = new MongoClient(uri);

  try {
    // Connect to the MongoDB server
    await client.connect();
    
    // Get the sample_mflix database
    const database = client.db('sample_mflix');
    
    // Create the transport_synonyms collection
    try {
      await database.createCollection('transport_synonyms');
    } catch (err) {
      // Collection may already exist, which is fine
      console.log(`Note: ${err.message}`);
    }
    
    // Get the collection
    const collection = database.collection('transport_synonyms');
    
    // Create and insert the first document - equivalent mapping
    const doc1 = {
      mappingType: 'equivalent',
      synonyms: ['car', 'vehicle', 'automobile']
    };
    
    await collection.insertOne(doc1);
    
    // Create and insert the second document - explicit mapping
    const doc2 = {
      mappingType: 'explicit',
      input: ['boat'],
      synonyms: ['boat', 'vessel', 'sail']
    };
    
    await collection.insertOne(doc2);
    console.log('Synonyms collections successfully created and populated.');
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Run the function and handle any errors
createTransportSynonyms().catch(console.error);
