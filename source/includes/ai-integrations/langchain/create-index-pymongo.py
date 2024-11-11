# Create your index model, then create the search index
search_index_model = SearchIndexModel(
   definition={
      "fields": [
         {
         "type": "vector",
         "path": "embedding",
         "numDimensions": 1536,
         "similarity": "cosine"
         },
         {
         "type": "filter",
         "path": "page"
         }
      ]
   },
   name="vector_index",
   type="vectorSearch"
)

atlas_collection.create_search_index(model=search_index_model)
