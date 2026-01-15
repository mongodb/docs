import voyageai
import numpy as np
from PIL import Image

# Initialize Voyage AI client
vo = voyageai.Client()

# Prepare interleaved text + image inputs
interleaved_inputs = [
    ["An orange cat", Image.open('cat.jpg')],
    ["A golden retriever", Image.open('dog.jpg')],
    ["A banana", Image.open('banana.jpg')],
]

# Prepare image-only inputs
image_only_inputs = [
    [Image.open('cat.jpg')],
    [Image.open('dog.jpg')],
    [Image.open('banana.jpg')],
]

# Labels for display
labels = ["cat.jpg", "dog.jpg", "banana.jpg"]

# Search query
query = "a cute pet"

# Generate embeddings for interleaved text + image inputs
interleaved_embeddings = vo.multimodal_embed(
    inputs=interleaved_inputs,
    model="voyage-multimodal-3.5"
).embeddings

# Generate embedding for query
query_embedding = vo.multimodal_embed(
    inputs=[[query]],
    model="voyage-multimodal-3.5"
).embeddings[0]

# Calculate similarity scores using dot product
interleaved_similarities = np.dot(interleaved_embeddings, query_embedding)

# Sort by similarity (highest to lowest)
interleaved_ranked = np.argsort(-interleaved_similarities)

print(f"Query: '{query}'\n")
print("Search with interleaved text + image:")
for rank, idx in enumerate(interleaved_ranked, 1):
    print(f"{rank}. {interleaved_inputs[idx][0]}")
    print(f"   Similarity: {interleaved_similarities[idx]:.4f}\n")

# Generate embeddings for image-only inputs
image_only_embeddings = vo.multimodal_embed(
    inputs=image_only_inputs,
    model="voyage-multimodal-3.5"
).embeddings

# Calculate similarity scores using dot product
image_only_similarities = np.dot(image_only_embeddings, query_embedding)

# Sort by similarity (highest to lowest)
image_only_ranked = np.argsort(-image_only_similarities)

print("\nSearch with image-only:")
for rank, idx in enumerate(image_only_ranked, 1):
    print(f"{rank}. {labels[idx]}")
    print(f"   Similarity: {image_only_similarities[idx]:.4f}\n")
