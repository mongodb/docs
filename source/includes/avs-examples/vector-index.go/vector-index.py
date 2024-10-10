pymongo.operations import SearchIndexModel

# Create your index model, then create the search index
search_index_model = SearchIndexModel(
  definition = {
    "fields": [
      {
        "type": "vector",
        "numDimensions": 1024,
        "path": "embeddings",
        "similarity": "cosine"
      }
    ]
  },
  name = "vector_index",
  type = "vectorSearch" 
)
collection.create_search_index(model=search_index_model)
