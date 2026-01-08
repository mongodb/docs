import asyncio
from pymongo import AsyncMongoClient

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
                "order_id": 6363763262239,
                "products": [
                    {
                        "prod_id": "abc12345",
                        "name": "Asus Laptop",
                        "price": 431,
                    },
                    {
                        "prod_id": "def45678",
                        "name": "Karcher Hose Set",
                        "price": 22,
                    },
                ]
            },
            {
                "order_id": 1197372932325,
                "products": [
                    {
                        "prod_id": "abc12345",
                        "name": "Asus Laptop",
                        "price": 429,
                    }
                ]
            },
            {
                "order_id": 9812343774839,
                "products": [
                    {
                        "prod_id": "pqr88223",
                        "name": "Morphy Richards Food Mixer",
                        "price": 431,
                    },
                    {
                        "prod_id": "def45678",
                        "name": "Karcher Hose Set",
                        "price": 21,
                    }
                ]
            },
            {
                "order_id": 4433997244387,
                "products": [
                    {
                        "prod_id": "def45678",
                        "name": "Karcher Hose Set",
                        "price": 23,
                    },
                    {
                        "prod_id": "jkl77336",
                        "name": "Picky Pencil Sharpener",
                        "price": 1,
                    },
                    {
                        "prod_id": "xyz11228",
                        "name": "Russell Hobbs Chrome Kettle",
                        "price": 16,
                    }
                ]
            }
        ]

        await orders_coll.insert_many(order_data)
        # end-insert-orders

        pipeline = []

        # start-unwind
        pipeline.append({
            "$unwind": {
                "path": "$products"
            }
        })
        # end-unwind

        # start-match
        pipeline.append({
            "$match": {
                "products.price": {
                    "$gt": 15
                }
            }
        })
        # end-match

        # start-group
        pipeline.append({
            "$group": {
                "_id": "$products.prod_id",
                "product": {"$first": "$products.name"},
                "total_value": {"$sum": "$products.price"},
                "quantity": {"$sum": 1}
            }
        })
        # end-group

        # start-set
        pipeline.append({
            "$set": {
                "product_id": "$_id"
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
