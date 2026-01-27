from datetime import datetime
from pymongo import MongoClient


def load_sample_data(CONNECTION_STRING):
    try:
        client = MongoClient(CONNECTION_STRING)

        # :snippet-start: create-db
        timeseries_db = client["timeseries"]
        # :snippet-end:

        # a. create empty time series coll
        # :snippet-start: set-ts-options
        time_series_options = {
            "timeField": "date",
            "metaField": "symbol",
            "granularity": "seconds",
        }
        # :snippet-end:

        # b. create
        # :snippet-start: create-coll
        timeseries_db.create_collection("stocks", timeseries=time_series_options)
        # :snippet-end:

        # add sample docs
        # :snippet-start: add-sample-docs
        stocks_coll = timeseries_db["stocks"]

        sample_documents = [
            {
                # :snippet-start: stocks-schema
                "symbol": "MDB",
                "date": datetime(2021, 12, 18, 15, 59, 0, 0),
                "close": 252.47,
                "volume": 55046.00,
            }# :snippet-end:
            ,
            {
                "symbol": "MDB",
                "date": datetime(2021, 12, 18, 15, 58, 0, 0),
                "close": 252.93,
                "volume": 44042.00,
            },
            {
                "symbol": "APPL",
                "date": datetime(2021, 12, 18, 15, 57, 0, 0),
                "close": 253.61,
                "volume": 40182.00,
            },
            {
                "symbol": "GOOG",
                "date": datetime(2021, 12, 18, 15, 56, 0, 0),
                "close": 253.63,
                "volume": 27890.00,
            },
            {
                "symbol": "GOOG",
                "date": datetime(2021, 12, 18, 15, 55, 0, 0),
                "close": 254.03,
                "volume": 40270.00,
            },
        ]

        stocks_coll.insert_many(sample_documents)
        # :snippet-end:

        client.close()

    except Exception as e:
        raise Exception("Error while loading sample data: ", e)


def pipeline_average_price(CONNECTION_STRING):
    try:
        client = MongoClient(CONNECTION_STRING)
        timeseries_db = client["timeseries"]
        stocks_coll = timeseries_db["stocks"]

        # :snippet-start: pipeline-avg-monthly-price
        pipeline_results = stocks_coll.aggregate(
            [
                {
                    "$group": {
                        "_id": {
                            "firstDayOfMonth": {
                                "$dateTrunc": {
                                    "date": "$date",
                                    "unit": "month"
                                }
                            },
                            "symbol": "$symbol"
                        },
                        "avgMonthClose": {"$avg": "$close"}
                    }
                }
            ]
        )
        # :snippet-end:

        docs = []
        for doc in pipeline_results:
            docs.append(doc)
        client.close()
        return docs

    except Exception as e:
        raise Exception("Error while performing metafield query: ", e)


def pipeline_rolling_average(CONNECTION_STRING):
    try:
        client = MongoClient(CONNECTION_STRING)

        timeseries_db = client["timeseries"]
        stocks_coll = timeseries_db["stocks"]

        # :snippet-start: pipeline-rolling-average
        pipeline_results = stocks_coll.aggregate(
            [
                {
                    "$setWindowFields": {
                        "partitionBy": "$symbol",
                        "sortBy": {"date": 1},
                        "output": {
                            "averageMonthClosingPrice": {
                                "$avg": "$close",
                                "window": {"range": [-1, 0], "unit": "month"}
                            }
                        }
                    }
                }
            ]
        )
        # :snippet-end:

        docs = []
        for doc in pipeline_results:
            docs.append(doc)
        client.close()
        return docs

    except Exception as e:
        raise Exception("The following error occurred: ", e)
