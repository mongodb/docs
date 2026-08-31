# :replace-start: {
#   "terms": {
#     "CONNECTION_STRING": "\"<connection-string>\"",
#     "\"langchain_db.docstore\"": "\"<database-name>.<collection-name>\""
#   }
# }


def create_document_store(CONNECTION_STRING):
    # :snippet-start: document-store
    from langchain_mongodb.docstores import MongoDBDocStore

    # Replace with your MongoDB connection string and namespace
    connection_string = CONNECTION_STRING
    namespace = "langchain_db.docstore"

    # Initialize the MongoDBDocStore
    docstore = MongoDBDocStore.from_connection_string(connection_string, namespace)
    # :snippet-end:

    return docstore  # :remove:


def create_byte_store(CONNECTION_STRING):
    # :snippet-start: binary-storage
    from langchain_community.storage.mongodb import MongoDBByteStore

    # Instantiate the MongoDBByteStore
    mongodb_store = MongoDBByteStore(
        connection_string=CONNECTION_STRING,  # MongoDB cluster URI
        db_name="langchain_db",  # Name of the database
        collection_name="byte_store",  # Name of the collection
    )

    # Set values for keys
    mongodb_store.mset([("key1", b"hello"), ("key2", b"world")])

    # Get values for keys
    values = mongodb_store.mget(["key1", "key2"])
    print(values)

    # Iterate over keys
    for key in mongodb_store.yield_keys():
        print(key)

    # Delete keys
    mongodb_store.mdelete(["key1", "key2"])
    # :snippet-end:

    return values  # :remove:


# :replace-end:
