from datetime import datetime
from pymongo import MongoClient
from bson import ObjectId

def load_sample_data(CONNECTION_STRING):
    try:
        # add sample docs
        # :snippet-start: add-sample-data
        client = MongoClient(CONNECTION_STRING)

        timeseries_db = client["mydatabase"]

        weather_data_coll = timeseries_db["weather_data"]

        sample_document = {
            "_id": ObjectId("5553a998e4b02cf7151190b8"),
            "st": "x+47600-047900",
            "ts": datetime(1984, 3, 5, 13, 0, 0),
            "position": {
                "type": "Point",
                "coordinates": [-47.9, 47.6]
            },
            "elevation": 9999,
            "callLetters": "VCSZ",
            "qualityControlProcess": "V020",
            "dataSource": "4",
            "type": "FM-13",
            "airTemperature": {"value": -3.1, "quality": "1"},
            "dewPoint": {"value": 999.9, "quality": "9"},
            "pressure": {"value": 1015.3, "quality": "1"},
            "wind": {
                "direction": {"angle": 999, "quality": "9"},
                "type": "9",
                "speed": {"rate": 999.9, "quality": "9"}
            },
            "visibility": {
                "distance": {"value": 999999, "quality": "9"},
                "variability": {"value": "N", "quality": "9"}
            },
            "skyCondition": {
                "ceilingHeight": {"value": 99999, "quality": "9", "determination": "9"},
                "cavok": "N"
            },
            "sections": ["AG1"],
            "precipitationEstimatedObservation": {
                "discrepancy": "2",
                "estimatedWaterDepth": 999
            }
        }

        weather_data_coll.insert_one(sample_document)
        # :snippet-end:

        client.close()

    except Exception as e:
        raise Exception("Error while loading sample data: ", e)

def migrate_data(CONNECTION_STRING):
    try:
        client = MongoClient(CONNECTION_STRING)

        timeseries_db = client["mydatabase"]

        weather_data_coll = timeseries_db["weather_data"]

        # :snippet-start: create-aggregation-pipeline
        pipeline = [
            # :snippet-start: add-meta-field
            {
                "$addFields": {
                    "metaData": {
                        "st": "$st",
                        "position": "$position",
                        "elevation": "$elevation",
                        "callLetters": "$callLetters",
                        "qualityControlProcess": "$qualityControlProcess",
                        "type": "$type"
                    }
                }
            },
            {
                "$project": {
                    "_id": 1,
                    "ts": 1,
                    "metaData": 1,
                    "dataSource": 1,
                    "airTemperature": 1,
                    "dewPoint": 1,
                    "pressure": 1,
                    "wind": 1,
                    "visibility": 1,
                    "skyCondition": 1,
                    "sections": 1,
                    "precipitationEstimatedObservation": 1
                }
            },
            # :snippet-end:
            # :snippet-start: add-out-stage
            {
                "$out": {
                    "db": "mydatabase",
                    "coll": "weather_new",
                    "timeseries": {
                        "timeField": "ts",
                        "metaField": "metaData",
                        "granularity": "seconds"
                    }
                }
            }
            # :snippet-end:
        ]

        weather_data_coll.aggregate(pipeline)
        # :snippet-end:

        client.close()

    except Exception as e:
        raise Exception("Error while migrating data: ", e)

def query_new_ts_collection(CONNECTION_STRING):
    try:
        client = MongoClient(CONNECTION_STRING)

        timeseries_db = client["mydatabase"]

        # :snippet-start: query-new-ts-collection
        weather_new_coll = timeseries_db["weather_new"]
        result = weather_new_coll.find_one()
        # :snippet-end:

        client.close()
        return result

    except Exception as e:
        raise Exception("Error while querying new time series collection: ", e)
