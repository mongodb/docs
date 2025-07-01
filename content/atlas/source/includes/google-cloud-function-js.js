const { MongoClient } = require('mongodb');

let client;
async function getConnection() {
    if (!client) {
      
        const client = new MongoClient('<YOUR-ATLAS-CONNECTION-STRING>');
        client.on('connectionCreated', () => {
            console.log('New connection created successfully.');
        });

        // Connect to the database in the global scope
        await client.connect();
    }

    return client;
}