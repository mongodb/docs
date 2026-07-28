from pymongo import MongoClient

# Connect to your MongoDB deployment
client = MongoClient("<connection-string>")
collection = client["rag_db"]["test"]

# Insert documents into the collection
result = collection.insert_many(docs_to_insert)