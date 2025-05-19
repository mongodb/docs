import os
import voyageai

# Specify your Voyage API key and embedding model
os.environ["VOYAGE_API_KEY"] = "<api-key>"
model = "voyage-3-large"
vo = voyageai.Client()

# Define a function to generate embeddings
def get_embedding(data, input_type = "document"):
  embeddings = vo.embed(
      data, model = model, input_type = input_type
  ).embeddings
  return embeddings[0]