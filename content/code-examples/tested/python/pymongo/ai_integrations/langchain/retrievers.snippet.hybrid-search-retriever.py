from langchain_mongodb.retrievers.hybrid_search import (
    MongoDBAtlasHybridSearchRetriever,
)
from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch
from langchain_voyageai import VoyageAIEmbeddings

# Instantiate the vector store
vector_store = MongoDBAtlasVectorSearch.from_connection_string(
    connection_string="<connection-string>",  # MongoDB cluster URI
    namespace="<database-name>.<collection-name>",  # Database and collection name
    embedding=VoyageAIEmbeddings(model="voyage-3-large"),  # Embedding model to use
    index_name="vector_index",  # Name of the vector search index
)

# Initialize the retriever
retriever = MongoDBAtlasHybridSearchRetriever(
    vectorstore=vector_store,  # Vector store instance
    search_index_name="<index-name>",  # Name of the MongoDB Search index
    top_k=5,  # Number of documents to return
    fulltext_penalty=60.0,  # Penalty for full-text search
    vector_penalty=60.0,  # Penalty for vector search
)

# Define your query
query = "some search query"

# Print results
documents = retriever.invoke(query)
for doc in documents:
    print(doc)
