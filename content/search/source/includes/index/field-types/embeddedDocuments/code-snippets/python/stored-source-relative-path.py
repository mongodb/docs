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
            "funding_rounds": { 
              "type": "embeddedDocuments",
              "dynamic": true,
              "storedSource": {
                "include": ["round_code", "raised_currency_code", "raised_amount"] 
              }
            } 
          }
        }
    },
    name="default",
)

# Create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")
