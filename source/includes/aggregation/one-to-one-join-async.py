import asyncio
from pymongo import AsyncMongoClient
from datetime import datetime

uri = "<connection string>"
client = AsyncMongoClient(uri)

async def main():
    try:
        agg_db = client["agg_tutorials_db"]

        # start-colls
        orders_coll = agg_db["orders"]
        products_coll = agg_db["products"]
        # end-colls

        # start-insert-orders
        await orders_coll.delete_many({})

        order_data = [
            {
                "customer_id": "elise_smith@myemail.com",
                "orderdate": datetime(2020, 5, 30, 8, 35, 52),
                "product_id": "a1b2c3d4",
                "value": 431.43
            },
            {
                "customer_id": "tj@wheresmyemail.com",
                "orderdate": datetime(2019, 5, 28, 19, 13, 32),
                "product_id": "z9y8x7w6",
                "value": 5.01
            },
            {
                "customer_id": "oranieri@warmmail.com",
                "orderdate": datetime(2020, 1, 1, 8, 25, 37),
                "product_id": "ff11gg22hh33",
                "value": 63.13
            },
            {
                "customer_id": "jjones@tepidmail.com",
                "orderdate": datetime(2020, 12, 26, 8, 55, 46),
                "product_id": "a1b2c3d4",
                "value": 429.65
            }
        ]

        await orders_coll.insert_many(order_data)
        # end-insert-orders

        # start-insert-products
        await products_coll.delete_many({})

        product_data = [
            {
                "id": "a1b2c3d4",
                "name": "Asus Laptop",
                "category": "ELECTRONICS",
                "description": "Good value laptop for students"
            },
            {
                "id": "z9y8x7w6",
                "name": "The Day Of The Triffids",
                "category": "BOOKS",
                "description": "Classic post-apocalyptic novel"
            },
            {
                "id": "ff11gg22hh33",
                "name": "Morphy Richardds Food Mixer",
                "category": "KITCHENWARE",
                "description": "Luxury mixer turning good cakes into great"
            },
            {
                "id": "pqr678st",
                "name": "Karcher Hose Set",
                "category": "GARDEN",
                "description": "Hose + nosels + winder for tidy storage"
            }
        ]

        await products_coll.insert_many(product_data)
        # end-insert-products

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

        # start-lookup
        pipeline.append({
            "$lookup": {
                "from": "products",
                "localField": "product_id",
                "foreignField": "id",
                "as": "product_mapping"
            }
        })
        # end-lookup

        # start-set
        pipeline.extend([
            {
                "$set": {
                    "product_mapping": {"$first": "$product_mapping"}
                }
            },
            {
                "$set": {
                    "product_name": "$product_mapping.name",
                    "product_category": "$product_mapping.category"
                }
            }
        ])
        # end-set

        # start-unset
        pipeline.append({"$unset": ["_id", "product_id", "product_mapping"]})
        # end-unset

        # start-run-agg
        aggregation_result = await orders_coll.aggregate(pipeline)
        # end-run-agg

        async for document in aggregation_result:
            print(document)

    finally:
        await client.close()

asyncio.run(main())