from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

database = client["sample_training"]

# Get collections
companies_collection = database["companies"]
inspections_collection = database["inspections"]

# Create the MongoDB Search index definition with dynamic mapping
search_index_model = SearchIndexModel(
    definition={
        "mappings": {
            "dynamic": True
        },
    },
    name="default",
)

# Create index on companies collection
companies_result = companies_collection.create_search_index(model=search_index_model)
print(f"New index name for companies: {companies_result}")

# Create index on inspections collection
inspections_result = inspections_collection.create_search_index(model=search_index_model)
print(f"New index name for inspections: {inspections_result}")
