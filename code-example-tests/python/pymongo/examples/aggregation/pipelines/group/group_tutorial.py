from datetime import datetime
from pymongo import MongoClient

def example(CONNECTION_STRING):
    client = MongoClient(CONNECTION_STRING)
    try:
        agg_db = client["agg_tutorials_db"]

        # :snippet-start: create-collection
        orders_coll = agg_db["orders"]

        order_data = [
            {
                "customer_id": "elise_smith@myemail.com",
                "orderdate": datetime(2020, 5, 30, 8, 35, 52),
                "value": 231,
            },
            {
                "customer_id": "elise_smith@myemail.com",
                "orderdate": datetime(2020, 1, 13, 9, 32, 7),
                "value": 99,
            },
            {
                "customer_id": "oranieri@warmmail.com",
                "orderdate": datetime(2020, 1, 1, 8, 25, 37),
                "value": 63,
            },
            {
                "customer_id": "tj@wheresmyemail.com",
                "orderdate": datetime(2019, 5, 28, 19, 13, 32),
                "value": 2,
            },
            {
                "customer_id": "tj@wheresmyemail.com",
                "orderdate": datetime(2020, 11, 23, 22, 56, 53),
                "value": 187,
            },
            {
                "customer_id": "tj@wheresmyemail.com",
                "orderdate": datetime(2020, 8, 18, 23, 4, 48),
                "value": 4,
            },
            {
                "customer_id": "elise_smith@myemail.com",
                "orderdate": datetime(2020, 12, 26, 8, 55, 46),
                "value": 4,
            },
            {
                "customer_id": "tj@wheresmyemail.com",
                "orderdate": datetime(2021, 2, 28, 7, 49, 32),
                "value": 1024,
            },
            {
                "customer_id": "elise_smith@myemail.com",
                "orderdate": datetime(2020, 10, 3, 13, 49, 44),
                "value": 102,
            },
        ]

        orders_coll.insert_many(order_data)
        # :snippet-end:

        pipeline = []

        # :snippet-start: match
        pipeline.append(
            {
                "$match": {
                    "orderdate": {
                        "$gte": datetime(2020, 1, 1, 0, 0, 0),
                        "$lt": datetime(2021, 1, 1, 0, 0, 0),
                    }
                }
            }
        )
        # :snippet-end:

        # :snippet-start: sort-orderdate
        pipeline.append({"$sort": {"orderdate": 1}})
        # :snippet-end:

        # :snippet-start: group
        pipeline.append(
            {
                "$group": {
                    "_id": "$customer_id",
                    "first_purchase_date": {"$first": "$orderdate"},
                    "total_value": {"$sum": "$value"},
                    "total_orders": {"$sum": 1},
                    "orders": {"$push": {"orderdate": "$orderdate", "value": "$value"}},
                }
            }
        )
        # :snippet-end:

        # :snippet-start: sort-first-purchase
        pipeline.append({"$sort": {"first_purchase_date": 1}})
        # :snippet-end:

        # :snippet-start: set
        pipeline.append({"$set": {"customer_id": "$_id"}})
        # :snippet-end:

        # :snippet-start: unset
        pipeline.append({"$unset": ["_id"]})
        # :snippet-end:

        # :snippet-start: run-agg
        aggregation_result = orders_coll.aggregate(pipeline)
        # :snippet-end:

        for document in aggregation_result:
            print(document)

        return aggregation_result

    finally:
        client.close()
