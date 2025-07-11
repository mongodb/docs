import os
import voyageai
from bson.binary import Binary, BinaryVectorDtype

# Initialize the Voyage AI Client
os.environ["VOYAGE_API_KEY"] = "<VOYAGEAI-API-KEY>"
vo = voyageai.Client()

# Define a function to generate embeddings for all strings in `texts`
def generate_embeddings(texts, model: str, dtype: str, output_dimension: int):
    embeddings = []
    for text in texts:  # Process eachstring in the data list
        embedding = vo.embed(
            texts=[text],  # Pass each string as a list with a single item
            model=model,
            output_dtype=dtype,
            output_dimension=output_dimension,
        ).embeddings[0]
        embeddings.append(embedding)  # Collect the embedding for the current text
    return embeddings

# Convert embeddings to BSON vectors
def generate_bson_vector(vector, vector_dtype):
   return Binary.from_vector(vector, vector_dtype)
