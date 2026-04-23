import { MongoClient } from 'mongodb';

const uri = "<connectionString>"; 
const sourceDbName = "<sourceDatabaseName>"; 
const targetDbName = "<targetDatabaseName>"; 
const targetCollectionName = "<targetCollectionName>";

async function migrateCollections() {
 const client = new MongoClient(uri);

 try {
     await client.connect();

     const sourceDb = client.db(sourceDbName);
     const targetDb = client.db(targetDbName);
     const targetCollection = targetDb.collection(targetCollectionName);

     const collections = await sourceDb.listCollections().toArray();
     console.log(`Found ${collections.length} collections.`);

     const BATCH_SIZE = 1000; // Define a suitable batch size based on your requirements
     let totalProcessed = 0;

     for (const collectionInfo of collections) {
         const collection = sourceDb.collection(collectionInfo.name);
         let documentsProcessed = 0;
         let batch = [];
         const tenantId = collectionInfo.name; // Uses the collection name as the tenant_id

         const cursor = collection.find({});
         for await (const doc of cursor) {
             doc.tenant_id = tenantId; // Adds a tenant_id field to each document
             batch.push(doc);

             if (batch.length >= BATCH_SIZE) {
                 await targetCollection.insertMany(batch);
                 totalProcessed += batch.length;
                 documentsProcessed += batch.length;
                 console.log(`Processed ${documentsProcessed} documents from ${collectionInfo.name}. Total processed: ${totalProcessed}`);
                 batch = [];
             }
         }

         if (batch.length > 0) {
             await targetCollection.insertMany(batch);
             totalProcessed += batch.length;
             documentsProcessed += batch.length;
             console.log(`Processed ${documentsProcessed} documents from ${collectionInfo.name}. Total processed: ${totalProcessed}`);
         }
     }

     console.log(`Migration completed. Total documents processed: ${totalProcessed}`);
 } catch (err) {
     console.error('An error occurred:', err);
 } finally {
     await client.close();
 }
}

await migrateCollections().catch(console.error);