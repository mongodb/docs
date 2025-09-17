const { MongoClient } = require('mongodb');

// Connection URI
const uri = 'mongodb+srv://<username>:<password>@<cluster-url>/sample_mflix';

// Create a new MongoClient
const client = new MongoClient(uri);

async function createSearchIndex() {
  try {
    await client.connect();
    const database = client.db('sample_mflix');

    // Create a MongoDB Search index on the objectId field
    await database.command({
      createSearchIndexes: 'comments',
      indexes: [{
        name: 'movie_id_index',
        definition: {
          mappings: {
            dynamic: false,
            fields: {
              'movie_id': {
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