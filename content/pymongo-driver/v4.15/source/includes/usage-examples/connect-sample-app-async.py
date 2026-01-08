import asyncio
from pymongo import AsyncMongoClient

async def main():
    try:
        # start example code here

        # end example code here

        await client.admin.command("ping")
        print("Connected successfully")

        # other application code

        await client.close()

    except Exception as e:
        raise Exception(
            "The following error occurred: ", e)

asyncio.run(main())