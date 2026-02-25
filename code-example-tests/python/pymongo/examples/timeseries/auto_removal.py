# :replace-start: {
#    "terms": {
#       "COLLECTION_NAME": "\"weather24h\""
#    }
# }
"""
Auto Removal for Time Series Collections

This module demonstrates how to configure automatic data removal
for time series collections in MongoDB using PyMongo.
"""

import os
from pymongo import MongoClient

COLLECTION_NAME = "weather24h"
DATABASE_NAME = "timeseries"

client = None
database = None


def create_timeseries_collection():
    """Create a time series collection with automatic expiration."""
    global client, database

    uri = os.getenv("CONNECTION_STRING")
    if uri is None:
        raise Exception("CONNECTION_STRING environment variable not set.")

    client = MongoClient(uri)
    database = client[DATABASE_NAME]

    # Drop collection if it exists
    try:
        database.drop_collection(COLLECTION_NAME)
    except Exception:
        pass

    # :snippet-start: create-timeseries-collection-for-removal
    create_command = {
        "create": COLLECTION_NAME,
        "timeseries": {
            "timeField": "timestamp",
            "metaField": "sensorId",
            "granularity": "seconds"
        },
        "expireAfterSeconds": 86400
    }

    # Execute the command to create the collection
    database.command(create_command)
    # :snippet-end:


def update_collection_options():
    """Update the expireAfterSeconds option on the collection."""
    create_timeseries_collection()

    # :snippet-start: modify-timeseries-collection-for-removal
    command = {
        "collMod": COLLECTION_NAME,
        "expireAfterSeconds": 7200  # Set expiration to 2 hours (7200 seconds)
    }

    result = database.command(command)
    # :snippet-end:
    return result


def get_collection_info():
    """Get the current expireAfterSeconds value for the collection."""
    create_timeseries_collection()

    # :snippet-start: get-timeseries-collection-expiry
    collections = list(database.list_collections(filter={"name": COLLECTION_NAME}))
    if collections:
        collection_info = collections[0]
        options = collection_info.get("options", {})
        return options.get("expireAfterSeconds")
    # :snippet-end:
    return None


def remove_removal():
    """Remove the expireAfterSeconds setting from the collection."""
    create_timeseries_collection()

    # :snippet-start: remove-expireAfterSeconds
    command = {
        "collMod": COLLECTION_NAME,
        "expireAfterSeconds": "off"
    }

    database.command(command)
    # :snippet-end:

    # Make sure the property was actually removed
    collections = list(database.list_collections(filter={"name": COLLECTION_NAME}))
    if collections:
        collection_info = collections[0]
        options = collection_info.get("options", {})
        if "expireAfterSeconds" not in options:
            return True

    return False


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

# :replace-end: