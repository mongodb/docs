from datetime import datetime
from pymongo import MongoClient

def create_collection_with_bucket(CONNECTION_STRING):
    try:
        client = MongoClient(CONNECTION_STRING)

        timeseries_db = client["timeseries"]

        # :snippet-start: set-ts-options-bucket-settings
        time_series_options = {
            "timeField": "time",
            "metaField": "sensor",
            "bucketMaxSpanSeconds": 3600,
            "bucketRoundingSeconds": 3600
        }
        expire_after_seconds = 86400  # optional
        # :snippet-end:

        timeseries_db.create_collection("weather", timeseries=time_series_options, expireAfterSeconds=expire_after_seconds)

        client.close()

    except Exception as e:
        raise Exception("The following error occurred: ", e)

def create_collection(CONNECTION_STRING):
    try:
        client = MongoClient(CONNECTION_STRING)

        # :snippet-start: set-ts-options
        time_series_options = {
            "timeField": "time",
            "metaField": "sensor",
            "granularity": "hours",
        }
        expire_after_seconds = 86400 # optional
        # :snippet-end:

        # :snippet-start: create-coll
        timeseries_db = client["timeseries"]
        timeseries_db.create_collection("weather", timeseries=time_series_options, expireAfterSeconds=expire_after_seconds)
        # :snippet-end:
        client.close()

    except Exception as e:
        raise Exception("The following error occurred: ", e)

def load_sample_data(CONNECTION_STRING):
    try:
        client = MongoClient(CONNECTION_STRING)
        timeseries_db = client["timeseries"]
        weather_coll = timeseries_db["weather"]

        # :snippet-start: add-sample-docs
        sample_documents = [
            {
                "sensor": {"sensorId": 5578, "type": "temperature"},
                "time": datetime(2021, 12, 18, 0, 0, 0),
                "temp": 45.2,
            },
            {
                "sensor": {"sensorId": 5578, "type": "temperature"},
                "time": datetime(2021, 12, 18, 6, 0, 0),
                "temp": 47.3,
            },
            {
                "sensor": {"sensorId": 5578, "type": "temperature"},
                "time": datetime(2021, 12, 18, 12, 0, 0),
                "temp": 49.1,
            },
            {
                "sensor": {"sensorId": 5578, "type": "temperature"},
                "time": datetime(2021, 12, 18, 18, 0, 0),
                "temp": 48.8,
            },
            {
                "sensor": {"sensorId": 5578, "type": "temperature"},
                "time": datetime(2021, 12, 19, 0, 0, 0),
                "temp": 43.3,
            },
            {
                "sensor": {"sensorId": 5578, "type": "temperature"},
                "time": datetime(2021, 12, 19, 6, 0, 0),
                "temp": 47.2,
            },
            {
                "sensor": {"sensorId": 5578, "type": "temperature"},
                "time": datetime(2021, 12, 19, 12, 0, 0),
                "temp": 51.5,
            },
            {
                "sensor": {"sensorId": 5578, "type": "temperature"},
                "time": datetime(2021, 12, 19, 18, 0, 0),
                "temp": 48.2,
            },
        ]

        weather_coll.insert_many(sample_documents)
        # :snippet-end:

        client.close()

    except Exception as e:
        raise Exception("The following error occurred: ", e)

def query_collection(CONNECTION_STRING):
    try:

        client = MongoClient(CONNECTION_STRING)
        timeseries_db = client["timeseries"]
        weather_coll = timeseries_db["weather"]

        # :snippet-start: query-time-series
        result = weather_coll.find_one(
            {"time": datetime(2021, 12, 19, 18, 0, 0)},
            {"_id": 0}
        )
        # :snippet-end:

        client.close()
        return result

    except Exception as e:
        raise Exception("The following error occurred: ", e)

def run_aggregation(CONNECTION_STRING):
    try:
        client = MongoClient(CONNECTION_STRING)
        timeseries_db = client["timeseries"]
        weather_coll = timeseries_db["weather"]

        # :snippet-start: aggregate-time-series
        pipeline = [
            {"$match": {"sensor.sensorId": 5578}},
            {
                "$group": {
                    "_id": {"$dateTrunc": {"date": "$time", "unit": "day"}},
                    "avgTemp": {"$avg": "$temp"},
                }
            },
            {"$sort": {"avgTemp": -1}},
        ]

        cursor = weather_coll.aggregate(pipeline)
        # :snippet-end:

        documents = []
        # :snippet-start: print-results
        for doc in cursor:
            # :uncomment-start:
            # print(doc)
            # :uncomment-end:
            documents.append(doc) # :remove:
        # :snippet-end:

        client.close()
        return documents

    except Exception as e:
        raise Exception("The following error occurred: ", e)
