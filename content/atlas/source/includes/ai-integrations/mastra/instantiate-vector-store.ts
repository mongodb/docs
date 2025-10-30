import { MongoDBVector } from '@mastra/mongodb'

// Instantiate MongoDB as a vector store
const mongoVector = new MongoDBVector({
  uri: process.env.MONGODB_URI,        // MongoDB connection string
  dbName: process.env.MONGODB_DATABASE // Database name
})