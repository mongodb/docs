# Get the vector store instance from the retriever
vector_store = parent_doc_retriever.vectorstore

# Use helper method to create the vector search index
vector_store.create_vector_search_index(
   dimensions = 1536 # The dimensions of the vector embeddings to be indexed
)