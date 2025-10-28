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
          "dynamic": <True|False> | {
            "typeSet": "<typeSet-name>"
          },
          "fields": {
            "<field-name>": {
              "type": "embeddedDocuments",
              "dynamic": <True|False> | {
                "typeSet": "<typeSet-name>"
              },
              "fields": {
                "<field-name>": {
                  <field-mapping-definition>
                }
              },
              "storedSource": <True|False>  | {"include" | "exclude": ["<field-name>", ...]}
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
