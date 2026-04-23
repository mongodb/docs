import os
import pymongo
import voyageai

# Specify your Voyage API key and embedding model
os.environ["VOYAGE_API_KEY"] = "<api-key>"

model = "voyage-3-large"
outputDimension = 2048
vo = voyageai.Client()
# Define a function to generate embeddings
def get_embedding(data, input_type = "document"):
  embeddings = vo.embed(
      data, model = model, output_dimension = outputDimension, input_type = input_type
  ).embeddings
  return embeddings[0]

# Connect to your MongoDB Atlas cluster
mongo_client = pymongo.MongoClient("<connection-string>")
db = mongo_client["sample_mflix"]
collection = db["embedded_movies"]

# Filter to exclude null or empty plot fields
filter = {"title": {"$nin": [None, ""]}}

# Get a subset of documents in the collection
documents = collection.find(filter).limit(3500)

# Update each document with a new embedding field
updated_doc_count = 0
for doc in documents:
    embedding = get_embedding(doc["title"])
    if embedding is not None:
        collection.update_one({"_id": doc["_id"]}, {"$set": {"title_voyageai_embedding": embedding}})
        updated_doc_count += 1

print(f"Updated {updated_doc_count} documents.")