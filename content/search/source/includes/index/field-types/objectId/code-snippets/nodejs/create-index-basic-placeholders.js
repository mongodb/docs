const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://<username>:<password>@<cluster-url>';

// Create a new MongoClient
const client = new MongoClient(uri);

async function createSearchIndex() {
  try {
    await client.connect();
    const database = client.db('<databaseName>');

    // Create a MongoDB Search index on the objectId field
    await database.command({
      createSearchIndexes: '<collectionName>',
      indexes: [{
        name: '<indexName>',
        definition: {
          mappings: {
            dynamic: true | false,
            fields: {
              '<fieldName>': {
                type: 'objectId'
              }
            }
          }
        }
      }]
    });
    
    console.log('Successfully created Atlas Search index');
  } finally {
    await client.close();
  }
}

createSearchIndex().catch(console.error);