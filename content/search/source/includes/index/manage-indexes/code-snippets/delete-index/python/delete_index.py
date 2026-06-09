from pymongo.mongo_client import MongoClient

def delete_index():
    # Connect to your Atlas deployment
    uri = "<connectionString>"
    client = MongoClient(uri)

    # Access your database and collection
    database = client["<databaseName>"]
    collection = database["<collectionName>"]

    # Delete your search index
    collection.drop_search_index("<indexName>")