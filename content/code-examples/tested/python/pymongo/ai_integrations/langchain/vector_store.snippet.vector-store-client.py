from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch
from langchain_voyageai import VoyageAIEmbeddings
from pymongo import MongoClient

# Connect to your MongoDB cluster
client = MongoClient("<connection-string>")
collection = client["<database-name>"]["<collection-name>"]

# Instantiate the vector store
vector_store = MongoDBAtlasVectorSearch(
    collection=collection,  # Collection to store embeddings
    embedding=VoyageAIEmbeddings(model="voyage-3-large"),  # Embedding model to use
    index_name="vector_index",  # Name of the vector search index
    # Other optional parameters...
)
