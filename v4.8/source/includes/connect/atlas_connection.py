from pymongo import MongoClient
from pymongo.server_api import ServerApi

# Replace the placeholder with your Atlas connection string
uri = "<connection string>"

# Create a MongoClient with a MongoClientOptions object to set the Stable API version
client = MongoClient(uri, server_api=ServerApi(
    version='1', strict=True, deprecation_errors=True))

try:
    # Connect the client to the server (optional starting in v4.7)
    client.connect()

    # Send a ping to confirm a successful connection
    client.admin.command({'ping': 1})
    print("Pinged your deployment. You successfully connected to MongoDB!")

finally:
    # Ensures that the client will close when you finish/error
    client.close()
