# Use LangChain helper method to create the vector search index
vector_store.create_vector_search_index(
   dimensions = 1024, # The dimensions of the vector embeddings to be indexed
   filters = [ "genre", "rating", "year" ], # The metadata fields to be indexed for filtering
   wait_until_complete = 60 # Number of seconds to wait for the index to build (can take around a minute)
)
