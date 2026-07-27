# See https://mongodb-university.github.io/Bluehawk/ for more info on Bluehawk.

from enum import Enum
from bson.codec_options import CodecOptions, TypeEncoder, TypeRegistry
from pymongo import AsyncMongoClient

# The custom type and its encoder live at module scope so they can be
# imported by the test and reused by other examples in this file.
class Status(Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"

class StatusEncoder(TypeEncoder):
    # Tell PyMongo which Python type this encoder handles.
    python_type = Status

    def transform_python(self, value: Status) -> str:
        # Convert the Python type to a BSON type.
        return value.value

async def example(CONNECTION_STRING):
    client = AsyncMongoClient(CONNECTION_STRING)
    db = client["test"]

    try:
        # Build codec options that contain the encoder, then get a
        # collection that uses them. Any document PyMongo serializes for
        # this collection -- including query filters -- runs the encoder.
        codec_options = CodecOptions(type_registry=TypeRegistry([StatusEncoder()]))
        collection = db.get_collection("custom_status_example", codec_options=codec_options)

        await collection.drop()  # :remove:

        # Insert documents using Status instances. The encoder converts
        # each Status to its string value on the way to the server.
        await collection.insert_many([
            {"_id": 1, "title": "first task", "status": Status.ACTIVE},
            {"_id": 2, "title": "second task", "status": Status.INACTIVE},
            {"_id": 3, "title": "third task", "status": Status.ACTIVE},
        ])

        # Pass a Status instance inside an aggregation pipeline stage.
        # Because the collection has the encoder registered, PyMongo
        # encodes Status.ACTIVE to "active" before sending the pipeline, so
        # the $match compares against the encoded string on the server.
        # Result documents contain plain strings because this example
        # registers only an encoder, not a decoder. Matches _id 1 and 3.
        # :snippet-start: custom-type-aggregate-match
        agg_cursor = await collection.aggregate([
            {"$match": {"status": Status.ACTIVE}},
            {"$project": {"_id": 1, "title": 1, "status": 1}}
        ])
        agg_results = [doc async for doc in agg_cursor]
        print(agg_results)
        # :snippet-end:

        # Return output so the test can validate it.
        return agg_results

    finally:
        # Always close connection to free resources.
        await client.close()
