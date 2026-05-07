import time
from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

client = MongoClient("<CONNECTION-STRING>")
collection = client["sample_mflix"]["movies"]

# define your MongoDB Vector Search index
search_index_model = SearchIndexModel(
    definition={
        "fields": [
            {
                "type": "autoEmbed",
                "modality": "text",
                "path": "fullplot",
                "model": "voyage-4"
            }
        ]
    },
    name="autoembed_index",
    type="vectorSearch",
)

# run the helper method
result = collection.create_search_index(model=search_index_model)
print(f"New search index named {result} is building.")

print("Polling to check if the index is ready. This may take up to a minute.")
while True:
    indices = list(collection.list_search_indexes(result))
    if len(indices) and indices[0].get("queryable"):
        break
    time.sleep(5)
print(f"{result} is ready for querying.")
