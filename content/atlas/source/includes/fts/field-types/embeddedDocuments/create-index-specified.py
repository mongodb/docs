from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

database = client["sample_supplies"]
collection = database["sales"]

# Create the Atlas Search index definition for the embeddedDocuments field with specified fields
search_index_model = SearchIndexModel(
    definition={
        "mappings": {
            "fields": {
                "items": {
                    "type": "embeddedDocuments",
                    "dynamic": False,
                    "fields": {
                        "name": {
                            "type": "string"
                        },
                        "tags": {
                            "type": "string"
                        }
                    }
                }
            }
        },
    },
    name="default",
)

# Create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")
