from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

database = client["sample_airbnb"]
collection = database["listingsAndReviews"]

# Create the MongoDB Search index definition for the geo field
search_index_model = SearchIndexModel(
    definition={
        "mappings": {
            "dynamic": false,
            "fields": {
                "address": {
                    "type": "document",
                    "fields": {
                        "location": {
                            "type": "geo",
                            "indexShapes": true
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