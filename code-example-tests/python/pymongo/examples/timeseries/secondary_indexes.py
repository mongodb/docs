"""
Secondary Indexes for Time Series Collections

This module demonstrates how to create and use secondary indexes
on time series collections in MongoDB using PyMongo.
"""

import os
from datetime import datetime, timezone
from pymongo import MongoClient, ASCENDING, DESCENDING, GEOSPHERE

COLLECTION_NAME = "sensorData"
DATABASE_NAME = "timeseries"

client = None
database = None
collection = None


def load_data():
    """Load sample sensor data into a time series collection."""
    global client, database, collection

    uri = os.getenv("CONNECTION_STRING")
    if uri is None:
        raise Exception("CONNECTION_STRING environment variable not set.")

    client = MongoClient(uri)
    database = client[DATABASE_NAME]

    # Drop collection if it exists
    database.drop_collection(COLLECTION_NAME)

    # :snippet-start: secondary-create-collection
    # :replace-start: {
    #    "terms": {
    #       "COLLECTION_NAME": "sensorData"
    #    }
    # }
    database.create_collection(
        COLLECTION_NAME,
        timeseries={
            "timeField": "timestamp",
            "metaField": "metadata",
        },
        expireAfterSeconds=86400  # 24 hours
    )
    # :replace-end:
    # :snippet-end:

    collection = database[COLLECTION_NAME]

    # :snippet-start: secondary-data
    sample_documents = [
        {
            # :snippet-start: secondary-data-schema
            "metadata": {
                "sensorId": 5578,
                "type": "omni",
                "location": {
                    "type": "Point",
                    "coordinates": [-77.40711, 39.03335]
                }
            },
            # :snippet-end:
            "timestamp": datetime(2022, 1, 15, 0, 0, 0, tzinfo=timezone.utc),
            "currentConditions": {
                "windDirection": 127.0,
                "tempF": 71.0,
                "windSpeed": 2.0,
                "cloudCover": None,
                "precip": 0.1,
                "humidity": 94.0
            }
        },
        {
            "metadata": {
                "sensorId": 5578,
                "type": "omni",
                "location": {
                    "type": "Point",
                    "coordinates": [-77.40711, 39.03335]
                }
            },
            "timestamp": datetime(2022, 1, 15, 0, 1, 0, tzinfo=timezone.utc),
            "currentConditions": {
                "windDirection": 128.0,
                "tempF": 69.8,
                "windSpeed": 2.2,
                "cloudCover": None,
                "precip": 0.1,
                "humidity": 94.3
            }
        },
        {
            "metadata": {
                "sensorId": 5579,
                "type": "omni",
                "location": {
                    "type": "Point",
                    "coordinates": [-80.19773, 25.77481]
                }
            },
            "timestamp": datetime(2022, 1, 15, 0, 1, 0, tzinfo=timezone.utc),
            "currentConditions": {
                "windDirection": 115.0,
                "tempF": 88.0,
                "windSpeed": 1.0,
                "cloudCover": None,
                "precip": 0.0,
                "humidity": 99.0
            }
        }
    ]
    # :snippet-end:

    collection.insert_many(sample_documents)


def create_and_use_secondary_index():
    """Create a secondary index on timestamp and use it for sorting."""
    load_data()
    # :snippet-start: simple-in-example
    filter_query = {"metadata.type": {"$in": ["temperature", "pressure"]}}
    # :snippet-end:

    # :snippet-start: create-secondary-index
    collection.create_index([("timestamp", ASCENDING)])
    # :snippet-end:

    # :snippet-start: sort-with-secondary-index
    match_stage = {"$match": {"timestamp": {"$gte": datetime(2022, 1, 15, 0, 0, 0, tzinfo=timezone.utc)}}}
    sort_stage = {"$sort": {"timestamp": 1}}

    pipeline = [match_stage, sort_stage]

    result = list(collection.aggregate(pipeline))
    # :snippet-end:

    # :snippet-start: sort-with-secondary-index-explain
    # :replace-start: {
    #    "terms": {
    #       "COLLECTION_NAME": "sensorData"
    #    }
    # }
    explain_result = database.command(
        "explain",
        {
            "aggregate": COLLECTION_NAME,
            "pipeline": pipeline,
            "cursor": {}
        },
        verbosity="executionStats"
    )
    # :replace-end:
    # :snippet-end:

    return {"result": result, "explain_result": explain_result}


def create_and_use_compound_indexes():
    """Create compound indexes and use them for sorting and grouping."""
    # :snippet-start: last-point-indexes
    # Indexes on ``timeField`` descending are more performant because they 
    # enable ``DISTINCT_SCAN`` optimizations.
    indexes = [
        [("metadata.sensorId", ASCENDING), ("timestamp", ASCENDING)],
        [("metadata.sensorId", ASCENDING), ("timestamp", DESCENDING)],
        [("metadata.sensorId", DESCENDING), ("timestamp", ASCENDING)],
        [("metadata.sensorId", DESCENDING), ("timestamp", DESCENDING)],
    ]
    # :snippet-end:

    # :snippet-start: last-point-index-meta-up-time-down
    collection.create_index([("metadata.type", ASCENDING), ("timestamp", DESCENDING)])
    # :snippet-end:

    # :snippet-start: sort-and-group
    pipeline = [
        {"$sort": {"metadata.sensorId": 1, "timestamp": -1}},
        {"$group": {
            "_id": "$metadata.sensorId",
            "ts": {"$first": "$timestamp"},
            "temperatureF": {"$first": "$currentConditions.tempF"}
        }}
    ]

    result = list(collection.aggregate(pipeline))
    # :snippet-end:

    # :snippet-start: sort-and-group-explain
    # :replace-start: {
    #    "terms": {
    #       "COLLECTION_NAME": "sensorData"
    #    }
    # }
    explain_result = database.command(
        "explain",
        {
            "aggregate": COLLECTION_NAME,
            "pipeline": pipeline,
            "cursor": {}
        },
        verbosity="executionStats"
    )
    # :replace-end:
    # :snippet-end:

    # :snippet-start: hint
    hint_result = list(collection.aggregate(
        pipeline,
        hint={"metadata.sensorId": 1, "timestamp": -1}
    ))
    # :snippet-end:

    return {"result": result, "explain_result": explain_result, "hint_result": hint_result}


def create_and_use_geospatial_index():
    # :snippet-start: create-geospatial-index-location
    collection.create_index([("metadata.location", GEOSPHERE)])
    # :snippet-end:

    filter_query = {
        "metadata.location": {
            "$nearSphere": {
                "$geometry": {
                    "type": "Point",
                    "coordinates": [-77.03653, 38.897676]
                },
                "$maxDistance": 5000000
            }
        }
    }

    result = list(collection.find(filter_query))

    return result


def cleanup():
    """Clean up the test collection and close the client."""
    global database, client
    try:
        if database is not None:
            database.drop_collection(COLLECTION_NAME)
        if client is not None:
            client.close()
    except Exception:
        pass

