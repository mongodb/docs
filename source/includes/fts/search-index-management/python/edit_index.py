from pymongo.mongo_client import MongoClient

def edit_index():
    # Connect to your Atlas deployment
    uri = "<connectionString>"
    client = MongoClient(uri)

    # Access your database and collection
    database = client["<databaseName>"]
    collection = database["<collectionName>"]

    # Specify a new index definition
    definition = {
            "mappings": {
                "dynamic": True
            },
    }
    
    # Update your search index
    collection.update_search_index("<indexName>", definition)