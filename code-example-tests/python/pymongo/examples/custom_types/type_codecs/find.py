# See https://mongodb-university.github.io/Bluehawk/ for more info on Bluehawk.

from enum import Enum
from bson.codec_options import CodecOptions, TypeEncoder, TypeRegistry
from pymongo import MongoClient

# The custom type and its encoder live at module scope so they can be
# imported by the test and reused by other examples in this file.
class Status(Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"

class StatusEncoder(TypeEncoder):
    # Tell PyMongo which Python type this encoder handles.
    python_type = Status

    def transform_python(self, value: Status) -> str:
        # Convert a Status into a BSON-encodable value.
        return value.value

def example(CONNECTION_STRING):
    client = MongoClient(CONNECTION_STRING)
    db = client["test"]

    try:
        # Build codec options that contain the encoder, then get a
        # collection that uses them. Any document PyMongo serializes for
        # this collection -- including query filters -- runs the encoder.
        codec_options = CodecOptions(type_registry=TypeRegistry([StatusEncoder()]))

        collection = db.get_collection("custom_status_example", codec_options=codec_options)

        collection.drop() # :remove:

        # Insert documents using Status instances. The encoder converts
        # each Status to its string value on the way to the server.
        collection.insert_many([
            {"_id": 1, "title": "first task", "status": Status.ACTIVE},
            {"_id": 2, "title": "second task", "status": Status.INACTIVE},
            {"_id": 3, "title": "third task", "status": Status.ACTIVE},
        ])

        # Pass a Status instance directly in a find() filter. Because the
        # collection has the encoder registered, PyMongo encodes
        # Status.ACTIVE to "active" before sending the query.
        # :snippet-start: custom-type-find-filter
        find_results = list(collection.find({"status": Status.ACTIVE}))
        print(find_results)
        # :snippet-end:

        # Return output so the test can validate it.
        return find_results

    finally:
        # Always close connection to free resources.
        client.close()
