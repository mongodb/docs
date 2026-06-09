from pymongo.mongo_client import MongoClient
from pymongo.operations import SearchIndexModel

def create_index():
    # Connect to your Atlas deployment
    uri = "<connectionString>"
    client = MongoClient(uri)

    # Access your database and collection
    database = client["<databaseName>"]
    collection = database["<collectionName>"]

    # Create your index model, then create the search index
    search_index_model = SearchIndexModel(
        definition={
            "mappings": {
                "dynamic": True
            },
        },
        name="<indexName>",
    )

    result = collection.create_search_index(model=search_index_model)
    print(result)

