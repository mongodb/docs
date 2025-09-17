from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

# set namespace
database = client["sample_mflix"]
collection = database["movies"]

# define your Atlas Search index
search_index_model = SearchIndexModel(
    definition={
      "mappings": {
        "dynamic": true,
        "fields": {
          "clubs": {
            "dynamic": true,
            "fields": {
              "sports": {
                "dynamic": true,
                "type": "embeddedDocuments"
              }
            },
            "type": "document"
          },
          "teachers": [
            {
              "dynamic": true,
              "fields": {
                "classes": {
                  "dynamic": true,
                 "type": "embeddedDocuments"
                }
              },
              "type": "embeddedDocuments"
            },
            {
              "dynamic": true,
              "fields": {
                "classes": {
                    "dynamic": true,
                    "fields": {
                      "grade": {
                      "type": "token"
                    }
                  },
                  "type": "document"
                }
              },
              "type": "document"
            }
          ]
        }
      }
    },
    name="embedded-documents-tutorial",
)

# create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")