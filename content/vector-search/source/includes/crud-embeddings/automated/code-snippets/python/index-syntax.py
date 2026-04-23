from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

client = pymongo.MongoClient("<CONNECTION-STRING>")
db = client["<DATABASE-NAME>"]
collection = db["<COLLECTION-NAME>"]

search_index_model = SearchIndexModel(
  definition={
    "fields": [
      {
        "type": "text",
        "path": "<FIELD-NAME>",
        "model": "voyage-3-large | voyage-3.5 | voyage-3.5-lite" 
      }
    ]
  },
  name="<INDEX-NAME>",
  type="vectorSearch",
)
result = collection.create_search_index(model=search_index_model)
print(result)