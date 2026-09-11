// :replace-start: {
//   "terms": {
//     "MODEL_PARENT_DIRECTORY": "'/Users/<username>/local-rag-mongodb/'",
//     "ALLOW_REMOTE_MODELS": "false",
//     "MODEL_NAME": "'mxbai-embed-large-v1'"
//   }
// }
import os from 'os';

// The docs snippet reads the model from a directory the reader clones the
// Hugging Face repository into. The tests let transformers.js resolve the model
// from the hub and cache it instead, so no clone is needed before a test run.
const MODEL_PARENT_DIRECTORY = os.tmpdir();
const ALLOW_REMOTE_MODELS = true;
const MODEL_NAME = 'mixedbread-ai/mxbai-embed-large-v1';

// :snippet-start: local-rag-get-embeddings
// :uncomment-start:
// import { env, pipeline } from '@xenova/transformers';
// :uncomment-end:

// Function to generate embeddings for given data
export async function getEmbedding(data) {
  // :remove-start:
  // Imported here rather than at module scope so the test file can load this
  // module without @xenova/transformers installed. It is an optional
  // dependency; see the local model tests note in CLAUDE.md.
  const { env, pipeline } = await import('@xenova/transformers');
  // :remove-end:
  // Replace this path with the parent directory that contains the model files
  env.localModelPath = MODEL_PARENT_DIRECTORY;
  env.allowRemoteModels = ALLOW_REMOTE_MODELS;
  const task = 'feature-extraction';
  const model = MODEL_NAME;
  const embedder = await pipeline(task, model);
  const results = await embedder(data, { pooling: 'mean', normalize: true });
  return Array.from(results.data);
}
// :snippet-end:
// :replace-end:
