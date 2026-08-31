from langchain_mongodb.retrievers.full_text_search import (
    MongoDBAtlasFullTextSearchRetriever,
)
from pymongo import MongoClient

# Connect to your MongoDB cluster
client = MongoClient("<connection-string>")
collection = client["<database-name>"]["<collection-name>"]

# Initialize the retriever
retriever = MongoDBAtlasFullTextSearchRetriever(
    collection=collection,  # MongoDB Collection in Atlas
    search_field="<field-name>",  # Name of the field to search
    search_index_name="<index-name>",  # Name of the search index
)

# Define your query
query = "some search query"

# Print results
documents = retriever.invoke(query)
for doc in documents:
    print(doc)
