# Use helper method to create the vector search index
vector_store.create_vector_search_index(
   dimensions = 1024, # The number of vector dimensions to  index
   filters = [ "page_label" ]
)