import { Memory } from '@mastra/memory'
import { MongoDBStore, MongoDBVector } from '@mastra/mongodb'

const observationalMemory = new Memory({
  storage: new MongoDBStore({
    id: 'agent-storage',
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DATABASE,
  }),
  vector: new MongoDBVector({
    id: 'agent-vector',
    uri: process.env.MONGODB_URI,
    dbName: process.env.MONGODB_DATABASE,
    autoEmbed: { model: 'voyage-4' }, // MongoDB generates the embeddings
  }),
  options: {
    observationalMemory: {
      retrieval: { vector: true },
    },
  },
})
