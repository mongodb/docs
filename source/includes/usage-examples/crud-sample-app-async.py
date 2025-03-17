import asyncio
import pymongo
from pymongo import AsyncMongoClient

async def main():
    try:
        uri = "<connection string URI>"
        client = AsyncMongoClient(uri)

        database = client["<database name>"]
        collection = database["<collection name>"]

        # start example code here

        # end example code here

        await client.close()

    except Exception as e:
        raise Exception(
            "The following error occurred: ", e)

asyncio.run(main())