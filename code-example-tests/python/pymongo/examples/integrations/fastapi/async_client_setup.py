import pymongo
from pymongo import AsyncMongoClient


# :replace-start: {
#   "terms": {
#     "CONNECTION_STRING": "os.environ[\"MONGODB_URL\"]"
#   }
# }


async def async_client_setup(CONNECTION_STRING):
    # :snippet-start: async-client-setup
    client = AsyncMongoClient(
        CONNECTION_STRING,
        server_api=pymongo.server_api.ServerApi(
            version="1", strict=True, deprecation_errors=True
        ),
    )
    db = client.get_database("college")
    student_collection = db.get_collection("students")
    # :snippet-end:

    try:
        await client.admin.command("ping")
        return {
            "db_name": db.name,
            "collection_name": student_collection.name,
        }
    finally:
        await client.aclose()


# :replace-end:
