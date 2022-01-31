from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

# Replace <connection string> with your MongoDB deployment's connection string.
conn_str = "<connection string>"

# Set the version of the {+stable-api+} on the client.
client = pymongo.MongoClient(conn_str, server_api=ServerApi('1'), serverSelectionTimeoutMS=5000)
