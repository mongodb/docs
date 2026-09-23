from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your Atlas deployment
uri = "<connectionString>"
client = MongoClient(uri)

# Access your database and collection (View)
database = client["sample_mflix"]
collection = database["movies_ReleasedAfter2000"]

# Define your MongoDB Search index
search_index_model = SearchIndexModel(
    definition={
        "mappings": {
            "dynamic": True
        }
    },
    name="releasedAfter2000Index",
)

# Create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")
