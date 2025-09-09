# Connect to your cluster
client = MongoClient(MONGODB_URI)
collection = client["langchain_db"]["test"]

# Create your vector search index model, then create the index
search_index_model = SearchIndexModel(
   definition={
      "fields": [
         {
         "type": "vector",
         "path": "embedding",
         "numDimensions": 1024,
         "similarity": "cosine"
         },
         {
         "type": "filter",
         "path": "page_label"
         }
      ]
   },
   name="vector_index",
   type="vectorSearch"
)

collection.create_search_index(model=search_index_model)
