from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

database = client["sample_analytics"]
collection = database["accounts"]

# Create the MongoDB Search index definition for the document field
search_index_model = SearchIndexModel(
    definition={
        "mappings": {
            "dynamic": true
        },
    },
    name="lookup-with-search-tutorial",
)

# Create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")