from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch
from langchain_voyageai import VoyageAIEmbeddings

# Instantiate the vector store
vector_store = MongoDBAtlasVectorSearch.from_connection_string(
    connection_string="<connection-string>",  # MongoDB cluster URI
    namespace="<database-name>.<collection-name>",  # Database and collection name
    embedding=VoyageAIEmbeddings(model="voyage-3-large"),  # Embedding model to use
    index_name="vector_index",  # Name of the vector search index
)

# Use the vector store as a retriever
retriever = vector_store.as_retriever()

# Define your query
query = "some search query"

# Print results
documents = retriever.invoke(query)
for doc in documents:
    print(doc)
