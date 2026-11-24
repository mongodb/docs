import { Memory } from '@mastra/memory'
import { MongoDBStore, MongoDBVector } from '@mastra/mongodb'

const semanticRecallMemory = new Memory({
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
    semanticRecall: { topK: 3, messageRange: 2 },
  },
})
