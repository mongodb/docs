// start-workspace
import { LocalFilesystem, Workspace } from '@mastra/core/workspace'
import { MongoDBVector } from '@mastra/mongodb'

const workspace = new Workspace({
  id: 'movie-docs',
  filesystem: new LocalFilesystem({ basePath: './workspace' }),
  vectorStore: new MongoDBVector({
    id: 'workspace-vector',
    uri: process.env.MONGODB_URI!,
    dbName: process.env.MONGODB_DATABASE!,
    autoEmbed: { model: 'voyage-4' }, // MongoDB generates the embeddings
  }),
})
// end-workspace

// start-index
await workspace.index(
  '/movies/inception.md',
  'A thief steals corporate secrets through dream-sharing technology.',
)
await workspace.index(
  '/movies/casablanca.md',
  'A nightclub owner in wartime Morocco must choose between love and helping a former lover escape.',
)
// end-index

// start-search
const results = await workspace.search('film about stealing ideas from dreams', {
  topK: 3,
  mode: 'vector',
})

for (const result of results) {
  console.log(`${result.id}: ${result.score}`)
  console.log(result.content)
}
// end-search

// start-hybrid
const hybridWorkspace = new Workspace({
  id: 'movie-docs-hybrid',
  filesystem: new LocalFilesystem({ basePath: './workspace' }),
  bm25: true,
  vectorStore: new MongoDBVector({
    id: 'workspace-vector-hybrid',
    uri: process.env.MONGODB_URI!,
    dbName: process.env.MONGODB_DATABASE!,
    autoEmbed: { model: 'voyage-4' },
  }),
})

await hybridWorkspace.index(
  '/movies/inception.md',
  'A thief steals corporate secrets through dream-sharing technology.',
)

const hybridResults = await hybridWorkspace.search('dream heist', {
  mode: 'hybrid',
  vectorWeight: 0.5,
})
// end-hybrid
