from pymongo.mongo_client import MongoClient

def view_index():
    # Connect to your Atlas deployment
    uri = "<connectionString>"
    client = MongoClient(uri)

    # Access your database and collection
    database = client["<databaseName>"]
    collection = database["<collectionName>"]

    # Get a list of the collection's search indexes and print them
    cursor = collection.list_search_indexes()
    for index in cursor:
        print(index)