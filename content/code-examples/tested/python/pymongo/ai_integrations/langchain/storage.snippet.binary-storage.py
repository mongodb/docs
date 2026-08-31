from langchain_community.storage.mongodb import MongoDBByteStore

# Instantiate the MongoDBByteStore
mongodb_store = MongoDBByteStore(
    connection_string="<connection-string>",  # MongoDB cluster URI
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
