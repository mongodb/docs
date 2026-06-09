from pymongo import MongoClient
from pymongo.operations import SearchIndexModel
# Connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)
database = client["sample_analytics"]
collection = database["customers"]
# Create the MongoDB Search index definition for the geo field
search_index_model = SearchIndexModel(
    definition={
        "mappings": {
            "dynamic": False,
            "fields": {
                "active": {
                    "type": "boolean"
                }
            }
        },
    },
    name="default",
)
# Create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")
