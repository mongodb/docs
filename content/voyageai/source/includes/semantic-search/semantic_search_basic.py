import voyageai
import numpy as np

# Initialize Voyage AI client
vo = voyageai.Client()

# Sample documents
documents = [
    "The Mediterranean diet emphasizes fish, olive oil, and vegetables, believed to reduce chronic diseases.",
    "Photosynthesis in plants converts light energy into glucose and produces essential oxygen.",
    "20th-century innovations, from radios to smartphones, centered on electronic advancements.",
    "Rivers provide water, irrigation, and habitat for aquatic species, vital for ecosystems.",
    "Apple's conference call to discuss fourth fiscal quarter results and business updates is scheduled for Thursday, November 2, 2023 at 2:00 p.m. PT / 5:00 p.m. ET.",
    "Shakespeare's works, like 'Hamlet' and 'A Midsummer Night's Dream,' endure in literature."
]

# Search query
query = "When is Apple's conference call scheduled?"

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

# Sort documents by similarity (highest to lowest)
ranked_indices = np.argsort(-similarities)

# Display results
print(f"Query: '{query}'\n")
for rank, idx in enumerate(ranked_indices, 1):
    print(f"{rank}. {documents[idx]}")
    print(f"   Similarity: {similarities[idx]:.4f}\n")
