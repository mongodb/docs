# Get the vector store instance from the retriever
vector_store = parent_doc_retriever.vectorstore

# Use helper method to create the vector search index
vector_store.create_vector_search_index(
   dimensions = 1024 # The number of dimensions to index
)