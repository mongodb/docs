from pymongo import MongoClient
from sentence_transformers import SentenceTransformer

# Connect to your local Atlas deployment or Atlas Cluster
client = MongoClient(ATLAS_CONNECTION_STRING)

# Select the sample_airbnb.listingsAndReviews collection
collection = client["sample_airbnb"]["listingsAndReviews"]

# Load the embedding model (https://huggingface.co/sentence-transformers/mixedbread-ai/mxbai-embed-large-v1)
model_path = "<model-path>"
model = SentenceTransformer('mixedbread-ai/mxbai-embed-large-v1')
model.save(model_path)
model = SentenceTransformer(model_path)

# Define function to generate embeddings
def get_embedding(text):
    return model.encode(text).tolist()

# Filters for only documents with a summary field and without an embeddings field
filter = { '$and': [ { 'summary': { '$exists': True, "$nin": [ None, "" ] } }, { 'embeddings': { '$exists': False } } ] }

# Creates embeddings for subset of the collection
updated_doc_count = 0
for document in collection.find(filter).limit(50):
    text = document['summary']
    embedding = get_embedding(text)
    collection.update_one({ '_id': document['_id'] }, { "$set": { 'embeddings': embedding } }, upsert=True)
    updated_doc_count += 1

print("Documents updated: {}".format(updated_doc_count))
