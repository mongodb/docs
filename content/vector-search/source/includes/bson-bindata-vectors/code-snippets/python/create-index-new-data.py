from pymongo.operations import SearchIndexModel
import time

# Define and create the vector search index
index_name = "<INDEX-NAME>"
search_index_model = SearchIndexModel(
  definition={
    "fields": [
      {
        "type": "vector",
        "path": float32_field,
        "similarity": "dotProduct",
        "numDimensions": 1024
      },
      {
        "type": "vector",
        "path": int8_field,
        "similarity": "dotProduct",
        "numDimensions": 1024
      },
      {
        "type": "vector",
        "path": int1_field,
        "similarity": "euclidean",
        "numDimensions": 1024
      }
    ]
  },
  name=index_name,
  type="vectorSearch"
)
result = collection.create_search_index(model=search_index_model)
print("New search index named " + result + " is building.")

# Wait for initial sync to complete
print("Polling to check if the index is ready. This may take up to a minute.")
predicate=None
if predicate is None:
  predicate = lambda index: index.get("queryable") is True
while True:
  indices = list(collection.list_search_indexes(index_name))
  if len(indices) and predicate(indices[0]):
    break
  time.sleep(5)
print(result + " is ready for querying.")