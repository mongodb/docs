from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

database = client["<database>"]
collection = database["<collection>"]

# Create the MongoDB Search index definition for the UUID field
search_index_model = SearchIndexModel(
    definition={
        "mappings": {
            "dynamic": true|false,
            "fields": {
                "<field-name>":{
                   "type": "uuid"
                }
            }
        },
    },
    name="default",
)

# Create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")
