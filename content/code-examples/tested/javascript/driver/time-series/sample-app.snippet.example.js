const { MongoClient } = require('mongodb');

// Replace the placeholder with your connection string.
const uri = '<connection-string>';
const client = new MongoClient(uri);

export async function runApp() {
  try {
    // start example code here
    // end example code here
  } finally {
    await client.close();
  }
}

runApp().catch(console.dir);
