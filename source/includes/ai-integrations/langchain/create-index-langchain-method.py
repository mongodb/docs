# Use helper method to create the vector search index
vector_store.create_vector_search_index(
   dimensions = 1536, # The dimensions of the vector embeddings to be indexed
   filters = [ "page" ]
)