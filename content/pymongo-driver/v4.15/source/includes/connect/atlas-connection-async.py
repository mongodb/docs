import asyncio
from pymongo import AsyncMongoClient
from pymongo.server_api import ServerApi

async def main():
    # Replace the placeholder with your Atlas connection string
    uri = "<connection string>"

    # Create a MongoClient with a MongoClientOptions object to set the Stable API version
    client = AsyncMongoClient(uri, server_api=ServerApi(
        version='1', strict=True, deprecation_errors=True))

    try:
        # Send a ping to confirm a successful connection
        await client.admin.command({'ping': 1})
        print("Pinged your deployment. You successfully connected to MongoDB!")

    finally:
        # Ensures that the client will close when you finish/error
        await client.close()

asyncio.run(main())