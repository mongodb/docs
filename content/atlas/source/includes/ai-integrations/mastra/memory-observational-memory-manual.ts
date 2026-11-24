import { Memory } from '@mastra/memory'
import { MongoDBStore, MongoDBVector } from '@mastra/mongodb'
import { voyageEmbedding } from '@mastra/voyageai'

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
  }),
  embedder: voyageEmbedding({
    model: 'voyage-4',
    baseUrl: 'https://ai.mongodb.com/v1', // MongoDB-hosted embedding endpoint
  }),
  options: {
    observationalMemory: {
      retrieval: { vector: true },
    },
  },
})
