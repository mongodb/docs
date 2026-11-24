import { MongoDBVector } from '@mastra/mongodb'

// Instantiate MongoDB as a vector store
const mongoVector = new MongoDBVector({
  id: 'mongodb-vector',                // Unique identifier for this vector store instance
  uri: process.env.MONGODB_URI,        // MongoDB connection string
  dbName: process.env.MONGODB_DATABASE // Database name
})