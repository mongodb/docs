from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your Atlas deployment
uri = "<connectionString>"
client = MongoClient(uri)

# Access your database and collection (View)
database = client["sample_airbnb"]
collection = database["listings_SearchableTypes"]

# Define your MongoDB Search index
search_index_model = SearchIndexModel(
    definition={
        "mappings": {
            "dynamic": True,
            "fields": {
                "idString": {
                    "type": "token"
                },
                "superHostString": {
                    "type": "token"
                }
            }
        }
    },
    name="listingsSearchableTypes",
)

# Create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")
