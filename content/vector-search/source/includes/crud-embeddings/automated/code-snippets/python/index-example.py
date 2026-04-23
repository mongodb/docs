from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

client = MongoClient("<CONNECTION-STRING>")
db = client["sample_mflix"]
collection = db["movies"]

search_index_model = SearchIndexModel(
  definition={
    "fields": [
      {
        "type": "text",
        "path": "fullplot",
        "model": "voyage-3-large"
      }
    ]
  },
    name="movies_automated_embeddings",
    type="vectorSearch",
)
result = collection.create_search_index(model=search_index_model)
print(result)