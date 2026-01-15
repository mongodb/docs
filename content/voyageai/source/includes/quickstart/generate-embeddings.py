import voyageai

# Initialize Voyage client
vo = voyageai.Client()

# Sample texts
texts = [
    "hello, world",
    "welcome to voyage ai!"
]

# Generate embeddings
result = vo.embed(
    texts,
    model="voyage-4-large"
)

print(f"Generated {len(result.embeddings)} embeddings")
print(f"Each embedding has {len(result.embeddings[0])} dimensions")
print(f"First embedding (truncated): {result.embeddings[0][:5]}...")