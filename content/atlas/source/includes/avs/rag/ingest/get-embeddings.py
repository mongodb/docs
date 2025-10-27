from sentence_transformers import SentenceTransformer

# Load the embedding model (https://huggingface.co/nomic-ai/nomic-embed-text-v1")
model = SentenceTransformer("nomic-ai/nomic-embed-text-v1", trust_remote_code=True)
    
# Define a function to generate embeddings
def get_embedding(data):
    """Generates vector embeddings for the given data."""

    embedding = model.encode(data)
    return embedding.tolist()