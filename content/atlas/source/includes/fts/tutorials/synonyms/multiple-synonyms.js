const { MongoClient } = require('mongodb');

async function createMultipleSynonyms() {
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
    
    // Get the transport_synonyms collection
    const transportCollection = database.collection('transport_synonyms');
    
    // Create and insert the first transport document - equivalent mapping
    const doc1 = {
      mappingType: 'equivalent',
      synonyms: ['car', 'vehicle', 'automobile']
    };
    
    await transportCollection.insertOne(doc1);
    
    // Create and insert the second transport document - explicit mapping
    const doc2 = {
      mappingType: 'explicit',
      input: ['boat'],
      synonyms: ['boat', 'vessel', 'sail']
    };
    
    await transportCollection.insertOne(doc2);
    
    // Create the attire_synonyms collection
    try {
      await database.createCollection('attire_synonyms');
    } catch (err) {
      // Collection may already exist, which is fine
      console.log(`Note: ${err.message}`);
    }
    
    // Get the attire_synonyms collection
    const attireCollection = database.collection('attire_synonyms');
    
    // Create and insert the first attire document - equivalent mapping
    const doc3 = {
      mappingType: 'equivalent',
      synonyms: ['dress', 'apparel', 'attire']
    };
    
    await attireCollection.insertOne(doc3);
    
    // Create and insert the second attire document - explicit mapping
    const doc4 = {
      mappingType: 'explicit',
      input: ['hat'],
      synonyms: ['hat', 'fedora', 'headgear']
    };
    
    await attireCollection.insertOne(doc4);
    
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
createMultipleSynonyms().catch(console.error);
