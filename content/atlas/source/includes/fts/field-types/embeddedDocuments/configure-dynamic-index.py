from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

database = client["sample_training"]
collection = database["companies"]

# Create the Atlas Search index definition for the embeddedDocuments field with dynamic mapping
search_index_model = SearchIndexModel(
    definition={
      "mappings": {
        "dynamic": false,
        "fields": {
          "relationships": {
            "type": "embeddedDocuments",
            "dynamic": {
              "typeSet": "stringBooleanIndex"
            },
            "fields": {
              "person": {
                "type": "document",
                "dynamic": {
                  "typeSet": "stringBooleanIndex"
                }
              }
            }
          }
        }
      },
      "typeSets": [
        {
          "name": "stringBooleanIndex",
          "types": [
            {
              "type": "boolean"
            },
            {
              "type": "string"
            }
          ]
        }
      ]
    },
    name="default",
)

# Create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")
