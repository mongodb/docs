from pymongo.mongo_client import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your Atlas deployment
uri = "<connectionString>"
client = MongoClient(uri)

# Access your database and collection
database = client["sample_mflix"]
collection = database["embedded_movies"]

# Create your index model, then create the search index
search_index_model = SearchIndexModel(
  definition={
    "fields": [
      {
        "type": "vector",
        "path": "plot_embedding",
        "numDimensions": 1536,
        "similarity": "euclidean"
      }
    ]
  },
  name="vector_index",
  type="vectorSearch",
)

result = collection.create_search_index(model=search_index_model)
print(result)