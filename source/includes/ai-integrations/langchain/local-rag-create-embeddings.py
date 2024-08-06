from langchain_huggingface import HuggingFaceEmbeddings
from pymongo import MongoClient

# Connect to your local Atlas deployment or Atlas Cluster
client = MongoClient(ATLAS_CONNECTION_STRING)

# Select the sample_airbnb.listingsAndReviews collection
collection = client["sample_airbnb"]["listingsAndReviews"]

# Specify local embedding model (https://huggingface.co/sentence-transformers/baai/bge-large-en-v1.5)
model = HuggingFaceEmbeddings(model_name="baai/bge-large-en-v1.5")

# Filters for only documents with a summary field and without an embeddings field
filter = { '$and': [ { 'summary': { '$exists': True, '$ne': None } }, { 'embeddings': { '$exists': False } } ] }
count = 0
totalCount = collection.count_documents(filter)

# Creates embeddings and updates the documents in the collection
for document in collection.find(filter):
   text = document['summary']
   embedding = model.embed_query(text)
   collection.update_one({ '_id': document['_id'] }, { "$set": { 'embeddings': embedding } }, upsert = True)
   count+=1
   print("Documents updated: {}/{} ".format(count, totalCount))
