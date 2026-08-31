from langchain_mongodb.docstores import MongoDBDocStore

# Replace with your MongoDB connection string and namespace
connection_string = "<connection-string>"
namespace = "<database-name>.<collection-name>"

# Initialize the MongoDBDocStore
docstore = MongoDBDocStore.from_connection_string(connection_string, namespace)
