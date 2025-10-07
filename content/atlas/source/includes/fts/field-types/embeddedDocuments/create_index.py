from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

database = client["<database>"]
collection = database["<collection>"]

# Create the MongoDB Search index definition for the embeddedDocuments field
search_index_model = SearchIndexModel(
    definition={
      "mappings": {
        "dynamic": true|false | {
          "typeSet": "<typeSet-name>"
        },
        "fields": {
          "<field-name>": {
            "type": "embeddedDocuments",
            "dynamic": <true|false> | {
              "typeSet": "<typeSet-name>"
            },
            "fields": {
              "<field-name>": {
                <field-mapping-definition>
              },
              ...
            }
          },
          ...
        }
      },
      "typeSets": [
        {
          "name": "<typeSet-name>",
          "types": [
            {
              "type": "<field-type>",
              ... 
            },
            ...
          ]
        },
        ...
      ]
    },
    name="default",
)

# Create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")
