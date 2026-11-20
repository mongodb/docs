from pymongo import MongoClient
from sentence_transformers import SentenceTransformer

# Connect to your local MongoDB deployment
client = MongoClient(MONGODB_URI)

# Select the sample_airbnb.listingsAndReviews collection
collection = client["sample_airbnb"]["listingsAndReviews"]

# Load the embedding model (https://huggingface.co/voyageai/voyage-4-nano)
model = SentenceTransformer("voyageai/voyage-4-nano", trust_remote_code=True)

# Define a function to generate embeddings for documents
def get_embedding(text):
    return model.encode_document(text).tolist()


# Filters for only documents with a summary field and without an embeddings field
filter = {
    "$and": [
        {"summary": {"$exists": True, "$nin": [None, ""]}},
        {"embeddings": {"$exists": False}},
    ]
}

# Creates embeddings for subset of the collection
updated_doc_count = 0
for document in collection.find(filter).limit(50):
    text = document["summary"]
    embedding = get_embedding(text)
    collection.update_one(
        {"_id": document["_id"]},
        {"$set": {"embeddings": embedding}},
        upsert=True,
    )
    updated_doc_count += 1

print("Documents updated: {}".format(updated_doc_count))
