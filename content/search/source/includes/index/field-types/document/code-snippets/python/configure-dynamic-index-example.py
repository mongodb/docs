from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

database = client["sample_mflix"]
collection = database["movies"]

# Create the Atlas Search index definition for the document field
search_index_model = SearchIndexModel(
    definition={
      "mappings": {
        "dynamic": false,
        "fields": {
          "awards": {
            "type": "document",
            "dynamic": {
              "typeSet": "onlyNumbers"
            }
          }
        }
      },
      "typeSets": [
        {
          "name": "onlyNumbers",
          "types": [
            {
              "type": "number"
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