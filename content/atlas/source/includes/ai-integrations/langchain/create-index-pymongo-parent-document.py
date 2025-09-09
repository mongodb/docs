from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your cluster
client = MongoClient(MONGODB_URI)
collection = client[database_name][collection_name]

# Create your vector search index model, then create the index
vector_index_model = SearchIndexModel(
   definition={
      "fields": [
         {
         "type": "vector",
         "path": "embedding",
         "numDimensions": 1024,
         "similarity": "dotProduct"
         }
      ]
   },
   name="vector_index",
   type="vectorSearch"
)
collection.create_search_index(model=vector_index_model)