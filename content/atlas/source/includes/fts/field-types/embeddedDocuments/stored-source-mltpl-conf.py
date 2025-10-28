from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

database = client["sample_training"]
collection = database["companies"]

# Create the Atlas Search index definition for the embeddedDocuments field
search_index_model = SearchIndexModel(
    definition={
        "mappings": { 
          "dynamic": false,
          "fields": { 
            "products": { 
              "type": "embeddedDocuments",
              "dynamic": true,
              "storedSource": true
            } 
          }
        },
        "storedSource": {
          "include": [ "_id", "name" ]
        }
    },
    name="default",
)

# Create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")
