// start-workspace-manual
import { LocalFilesystem, Workspace } from '@mastra/core/workspace'
import { MongoDBVector } from '@mastra/mongodb'
import { voyageEmbedding } from '@mastra/voyageai'
import { embed } from 'ai'

const embedderModel = voyageEmbedding({
  model: 'voyage-4',
  baseUrl: 'https://ai.mongodb.com/v1', // MongoDB-hosted embedding endpoint
})

const manualWorkspace = new Workspace({
  id: 'movie-docs',
  filesystem: new LocalFilesystem({ basePath: './workspace' }),
  vectorStore: new MongoDBVector({
    id: 'workspace-vector',
    uri: process.env.MONGODB_URI!,
    dbName: process.env.MONGODB_DATABASE!,
  }),
  embedder: async (text: string) => {
    const { embedding } = await embed({ model: embedderModel, value: text })
    return embedding
  },
})
// end-workspace-manual

// start-hybrid-manual
const manualHybridWorkspace = new Workspace({
  id: 'movie-docs-hybrid',
  filesystem: new LocalFilesystem({ basePath: './workspace' }),
  bm25: true,
  vectorStore: new MongoDBVector({
    id: 'workspace-vector-hybrid',
    uri: process.env.MONGODB_URI!,
    dbName: process.env.MONGODB_DATABASE!,
  }),
  embedder: async (text: string) => {
    const { embedding } = await embed({ model: embedderModel, value: text })
    return embedding
  },
})

await manualHybridWorkspace.index(
  '/movies/inception.md',
  'A thief steals corporate secrets through dream-sharing technology.',
)

const manualHybridResults = await manualHybridWorkspace.search('dream heist', {
  mode: 'hybrid',
  vectorWeight: 0.5,
})
// end-hybrid-manual
