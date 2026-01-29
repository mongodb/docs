import os
from bson import ObjectId
from pymongo import MongoClient

COLLECTION_NAME = "limitations"

client = None
database = None
collection = None


def load_data():
    global client, database, collection

    uri = os.getenv("CONNECTION_STRING")
    if uri is None:
        raise Exception("CONNECTION_STRING environment variable not set.")

    client = MongoClient(uri)
    database = client["timeseries"]
    database.drop_collection(COLLECTION_NAME)
    collection = database[COLLECTION_NAME]

    sample_documents = [
        {
            "_id": ObjectId(),
            "name": "example",
            "meta": {
                "project": 10,
                "type": "a",
            },
        },
        {
            "_id": ObjectId(),
            "name": "example",
            "meta": {
                "project": 10,
                "type": "b",
            },
        },
        {
            "_id": ObjectId(),
            "name": "example",
            "meta": {
                "project": 40,
                "type": "c",
            },
        },
    ]

    collection.insert_many(sample_documents)


def get_distinct_documents():
    load_data()

    # :snippet-start: agg-pipeline-for-distinct
    collection.create_index([("meta.project", 1), ("meta.type", 1)])

    pipeline = [
        {"$match": {"meta.project": 10}},
        {"$group": {"_id": "$meta.type"}},
    ]

    result = list(collection.aggregate(pipeline))
    # :snippet-end:

    return result


def cleanup():
    try:
        if database is not None:
            database.drop_collection(COLLECTION_NAME)
        if client is not None:
            client.close()
    except:
        pass