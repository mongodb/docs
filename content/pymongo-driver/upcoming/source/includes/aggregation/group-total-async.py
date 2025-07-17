import asyncio
from pymongo import AsyncMongoClient
from datetime import datetime

uri = "<connection string>"
client = AsyncMongoClient(uri)

async def main():
    try:
        agg_db = client["agg_tutorials_db"]

        # start-coll
        orders_coll = agg_db["orders"]
        # end-coll

        # start-insert-orders
        await orders_coll.delete_many({})

        order_data = [
            {
                "customer_id": "elise_smith@myemail.com",
                "orderdate": datetime(2020, 5, 30, 8, 35, 52),
                "value": 231
            },
            {
                "customer_id": "elise_smith@myemail.com",
                "orderdate": datetime(2020, 1, 13, 9, 32, 7),
                "value": 99
            },
            {
                "customer_id": "oranieri@warmmail.com",
                "orderdate": datetime(2020, 1, 1, 8, 25, 37),
                "value": 63
            },
            {
                "customer_id": "tj@wheresmyemail.com",
                "orderdate": datetime(2019, 5, 28, 19, 13, 32),
                "value": 2
            },
            {
                "customer_id": "tj@wheresmyemail.com",
                "orderdate": datetime(2020, 11, 23, 22, 56, 53),
                "value": 187
            },
            {
                "customer_id": "tj@wheresmyemail.com",
                "orderdate": datetime(2020, 8, 18, 23, 4, 48),
                "value": 4
            },
            {
                "customer_id": "elise_smith@myemail.com",
                "orderdate": datetime(2020, 12, 26, 8, 55, 46),
                "value": 4
            },
            {
                "customer_id": "tj@wheresmyemail.com",
                "orderdate": datetime(2021, 2, 28, 7, 49, 32),
                "value": 1024
            },
            {
                "customer_id": "elise_smith@myemail.com",
                "orderdate": datetime(2020, 10, 3, 13, 49, 44),
                "value": 102
            }
        ]

        await orders_coll.insert_many(order_data)
        # end-insert-orders

        pipeline = []

        # start-match
        pipeline.append({
            "$match": {
                "orderdate": {
                    "$gte": datetime(2020, 1, 1, 0, 0, 0),
                    "$lt": datetime(2021, 1, 1, 0, 0, 0)
                }
            }
        })
        # end-match

        # start-sort1
        pipeline.append({
            "$sort": {
                "orderdate": 1
            }
        })
        # end-sort1

        # start-group
        pipeline.append({
            "$group": {
                "_id": "$customer_id",
                "first_purchase_date": {"$first": "$orderdate"},
                "total_value": {"$sum": "$value"},
                "total_orders": {"$sum": 1},
                "orders": {"$push": {"orderdate": "$orderdate", "value": "$value"}}
            }
        })
        # end-group

        # start-sort2
        pipeline.append({
            "$sort": {
                "first_purchase_date": 1
            }
        })
        # end-sort2

        # start-set
        pipeline.append({
            "$set": {
                "customer_id": "$_id"
            }
        })
        # end-set

        # start-unset
        pipeline.append({"$unset": ["_id"]})
        # end-unset

        # start-run-agg
        aggregation_result = await orders_coll.aggregate(pipeline)
        # end-run-agg

        async for document in aggregation_result:
            print(document)

    finally:
        await client.close()

asyncio.run(main())