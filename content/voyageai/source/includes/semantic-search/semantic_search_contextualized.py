import voyageai
import numpy as np

# Initialize Voyage AI client
vo = voyageai.Client()

# Sample documents (each document is a list of chunks that share context)
documents = [
    [
        "This is the SEC filing on Greenery Corp.'s Q2 2024 performance.",
        "The company's revenue increased by 7% compared to the previous quarter."
    ],
    [
        "This is the SEC filing on Leafy Inc.'s Q2 2024 performance.",
        "The company's revenue increased by 15% compared to the previous quarter."
    ],
    [
        "This is the SEC filing on Elephant Ltd.'s Q2 2024 performance.",
        "The company's revenue decreased by 2% compared to the previous quarter."
    ]
]

# Search query
query = "What was the revenue growth for Leafy Inc. in Q2 2024?"

# Generate contextualized embeddings (preserves relationships between chunks)
contextualized_result = vo.contextualized_embed(
    inputs=documents,
    model="voyage-context-3",
    input_type="document"
)

# Flatten the embeddings and chunks for semantic search
contextualized_embeddings = []
all_chunks = []
chunk_to_doc = []  # Maps chunk index to document index

for doc_idx, result in enumerate(contextualized_result.results):
    for emb, chunk in zip(result.embeddings, documents[doc_idx]):
        contextualized_embeddings.append(emb)
        all_chunks.append(chunk)
        chunk_to_doc.append(doc_idx)

# Generate contextualized query embedding
query_embedding_ctx = vo.contextualized_embed(
    inputs=[[query]],
    model="voyage-context-3",
    input_type="query"
).results[0].embeddings[0]

# Calculate similarity scores using dot product
similarities_ctx = np.dot(contextualized_embeddings, query_embedding_ctx)

# Sort by similarity (highest to lowest)
ranked_indices_ctx = np.argsort(-similarities_ctx)

# Display top 3 results
print(f"Query: '{query}'\n")
for rank, idx in enumerate(ranked_indices_ctx[:3], 1):
    doc_idx = chunk_to_doc[idx]
    print(f"{rank}. {all_chunks[idx]}")
    print(f"   (From document: {documents[doc_idx][0]})")
    print(f"   Similarity: {similarities_ctx[idx]:.4f}\n")
