import os
import voyageai

# Specify the embedding model
model = "voyage-3-large"
vo = voyageai.Client()

# Define a function to generate embeddings
def get_embedding(data, input_type = "document"):
  embeddings = vo.embed(
      data, model = model, input_type = input_type
  ).embeddings
  return embeddings[0]