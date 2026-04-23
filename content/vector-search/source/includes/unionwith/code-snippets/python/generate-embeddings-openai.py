import os
from openai import OpenAI
import pymongo

# Specify your OpenAI API key and embedding model
os.environ["OPENAI_API_KEY"] = "<api-key>"
model = "text-embedding-3-large"
openai_client = OpenAI()

# Define a function to generate embeddings
def get_embedding(text):
    """Generates vector embeddings for the given text."""

    embedding = openai_client.embeddings.create(input = [text], model=model).data[0].embedding
    return embedding

# Connect to your Atlas cluster
mongo_client = pymongo.MongoClient("<connection-string>")
db = mongo_client["sample_mflix"]
collection = db["embedded_movies"]

# Filter to exclude null or empty summary fields
filter = { "title": {"$nin": [ None, "" ]} }

# Get a subset of documents in the collection
documents = collection.find(filter).limit(3500)

# Update each document with a new embedding field
updated_doc_count = 0
for doc in documents:
    embedding = get_embedding(doc["title"])
    collection.update_one( { "_id": doc["_id"] }, { "$set": { "title_embedding": embedding } } )
    updated_doc_count += 1

print(f"Updated {updated_doc_count} documents.")