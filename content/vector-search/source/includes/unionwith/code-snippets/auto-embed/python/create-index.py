from pymongo.mongo_client import MongoClient
from pymongo.operations import SearchIndexModel
import time

# Connect to your deployment
uri = "<connectionString>"
client = MongoClient(uri)

# Access your database and collection
database = client["sample_mflix"]
collection = database["embedded_movies"]

# Create your index model, then create the search index
search_index_model_auto_embed = SearchIndexModel(
  definition={
    "fields": [
      {
        "type": "autoEmbed",
        "modality": "text",
        "path": "fullplot",
        "model": "voyage-4",
        "numDimensions": 2048
      },
      {
        "type": "autoEmbed",
        "modality": "text",
        "path": "title",
        "model": "voyage-4",
        "numDimensions": 2048
      },
    ]
  },
  name="multiple-auto-embed-search",
  type="vectorSearch"
)

search_index_model_vector = SearchIndexModel(
  definition={
    "fields": [
      {
        "type": "vector",
        "numDimensions": 1536,
        "path": "plot_embedding",
        "similarity": "dotProduct"
      }
    ]
  },
  name="multiple-models-search",
  type="vectorSearch"
)

result_auto_embed = collection.create_search_index(model=search_index_model_auto_embed)
print("New search index named " + result_auto_embed + " is building.")

result_vector = collection.create_search_index(model=search_index_model_vector)
print("New search index named " + result_vector + " is building.")

# Wait for initial sync to complete
print("Polling to check if the index is ready. This may take up to a minute.")
predicate=None
if predicate is None:
  predicate = lambda index: index.get("queryable") is True

while True:
  indices = list(collection.list_search_indexes(result_vector))
  if len(indices) and predicate(indices[0]):
    break
  time.sleep(5)
print(result_auto_embed + " is ready for querying.")
print(result_vector + " is ready for querying.")

client.close()