from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

database = client["sample_training"]
collection = database["companies"]

# Create the MongoDB Search index definition for the embeddedDocuments field with dynamic mapping
search_index_model = SearchIndexModel(
    definition={
        "mappings": {
            "dynamic": True,
            "fields": {
                "products": {
                    "dynamic": True,
                    "type": "embeddedDocuments"
                },
                "category_code": {
                    "type": "token"
                }
            }
        },
    },
    name="default",
)

# Create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")
