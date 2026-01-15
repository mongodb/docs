import voyageai
import numpy as np
from datasets import load_dataset
from collections import defaultdict

# Initialize Voyage AI client
vo = voyageai.Client()

# Load legal benchmark dataset
corpus_ds = load_dataset("mteb/legalbench_consumer_contracts_qa", "corpus")["corpus"]
queries_ds = load_dataset("mteb/legalbench_consumer_contracts_qa", "queries")["queries"]
qrels_ds = load_dataset("mteb/legalbench_consumer_contracts_qa")["test"]

# Extract corpus and query data
corpus_ids = [row["_id"] for row in corpus_ds]
corpus_texts = [row["text"] for row in corpus_ds]
query_ids = [row["_id"] for row in queries_ds]
query_texts = [row["text"] for row in queries_ds]

# Build relevance mapping (defaultdict creates sets for missing keys)
qrels = defaultdict(set)
for row in qrels_ds:
    if row["score"] > 0:
        qrels[row["query-id"]].add(row["corpus-id"])

# Generate embeddings for the entire corpus
print(f"Generating embeddings for {len(corpus_texts)} documents...")
corpus_embeddings = vo.embed(
    texts=corpus_texts,
    model="voyage-4-large",
    input_type="document"
).embeddings

# Select a sample query
query_idx = 1
query = query_texts[query_idx]
query_id = query_ids[query_idx]

# Generate embedding for the query
query_embedding = vo.embed(
    texts=[query],
    model="voyage-4-large",
    input_type="query"
).embeddings[0]

# Calculate similarity scores using dot product
similarities = np.dot(corpus_embeddings, query_embedding)

# Sort by similarity (highest to lowest)
ranked_indices = np.argsort(-similarities)

# Display top 5 results
print(f"Query: {query}\n")
print("Top 5 Results:")
for rank, idx in enumerate(ranked_indices[:5], 1):
    doc_id = corpus_ids[idx]
    is_relevant = "✓" if doc_id in qrels[query_id] else "✗"
    print(f"{rank}. [{is_relevant}] Document ID: {doc_id}")
    print(f"   Similarity: {similarities[idx]:.4f}")
    print(f"   Text: {corpus_texts[idx][:100]}...\n")

# Show the ground truth most relevant document
most_relevant_id = list(qrels[query_id])[0]
most_relevant_idx = corpus_ids.index(most_relevant_id)
print(f"Ground truth most relevant document:")
print(f"Document ID: {most_relevant_id}")
print(f"Rank in results: {np.where(ranked_indices == most_relevant_idx)[0][0] + 1}")
print(f"Similarity: {similarities[most_relevant_idx]:.4f}")

