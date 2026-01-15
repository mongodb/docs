import voyageai
import numpy as np
import anthropic

# Initialize clients (requires VOYAGE_API_KEY and ANTHROPIC_API_KEY environment variables)
vo = voyageai.Client()
claude = anthropic.Anthropic()

# Sample documents
documents = [
    "This quarter, our company is focused on building new products, increasing market share, and cutting costs.",
    "20th-century innovations, from radios to smartphones, centered on electronic advancements.",
    "Photosynthesis in plants converts light energy into glucose and produces essential oxygen."
]

query = "What are my company's goals this quarter?"

# Generate embeddings for documents
doc_embeddings = vo.embed(
    texts=documents,
    model="voyage-4-large",
    input_type="document"
).embeddings

# Generate embedding for query
query_embedding = vo.embed(
    texts=[query],
    model="voyage-4-large",
    input_type="query"
).embeddings[0]

# Calculate similarity scores using dot product
similarities = np.dot(doc_embeddings, query_embedding)

# Sort by similarity (np.argsort with negative sign sorts high to low)
ranked_indices = np.argsort(-similarities)

print(f"Semantic search result: {documents[ranked_indices[0]][:50]}...")
print(f"Similarity score: {similarities[ranked_indices[0]]:.4f}\n")

# Refine results with reranking model
reranked = vo.rerank(query, documents, model="rerank-2.5", top_k=3)

print("Reranked results:")
for i, result in enumerate(reranked.results, 1):
    print(f"{i}. Score: {result.relevance_score:.4f} - {result.document[:50]}...")

# Get the most relevant document as context
context = reranked.results[0].document

# Generate answer using retrieved context
prompt = f"Based on this information: '{context}', answer: {query}"
response = claude.messages.create(
    model="claude-sonnet-4-5-20250929",
    max_tokens=1024,
    messages=[{"role": "user", "content": prompt}]
)

print(f"\nQuestion: {query}")
print(f"Answer: {response.content[0].text}")