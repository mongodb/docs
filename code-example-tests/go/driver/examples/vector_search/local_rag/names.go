package local_rag

// Field and index names used by the local RAG examples.
//
// The tutorial documents an "embeddings" field and a "vector_index" index on
// sample_airbnb.listingsAndReviews. The tested code uses distinct names so this
// suite cannot collide with the PyMongo local RAG suite, which writes
// 1024-dimension vectors to "embeddings" and builds a "vector_index" of the
// same name on the same collection. The Ollama model used here produces
// 768-dimension vectors, so sharing either name would break both suites
// whenever they run against the same deployment.
//
// Bluehawk replace terms substitute the documented names back into the
// published snippets, so readers still see "embeddings" and "vector_index".
// This file is listed in IGNORE_PATTERNS in snip.js and is never snipped.
const (
	EmbeddingsField = "embeddings_go"
	VectorIndexName = "local_rag_go_index"
)
