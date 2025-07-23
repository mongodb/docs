from pymongo import MongoClient

def example(CONNECTION_STRING):
    client = MongoClient(CONNECTION_STRING)
    try:
        agg_db = client["agg_tutorials_db"]

        # :snippet-start: insert-orders
        orders_coll = agg_db["orders"]

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
                ],
            },
            {
                "order_id": 1197372932325,
                "products": [
                    {
                        "prod_id": "abc12345",
                        "name": "Asus Laptop",
                        "price": 429,
                    }
                ],
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
                    },
                ],
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
                    },
                ],
            },
        ]

        orders_coll.insert_many(order_data)
        # :snippet-end:

        pipeline = []

        # :snippet-start: unwind
        pipeline.append({"$unwind": {"path": "$products"}})
        # :snippet-end:

        # :snippet-start: match
        pipeline.append({"$match": {"products.price": {"$gt": 15}}})
        # :snippet-end:

        # :snippet-start: group
        pipeline.append(
            {
                "$group": {
                    "_id": "$products.prod_id",
                    "product": {"$first": "$products.name"},
                    "total_value": {"$sum": "$products.price"},
                    "quantity": {"$sum": 1},
                }
            }
        )
        # :snippet-end:

        # :snippet-start: set
        pipeline.append({"$set": {"product_id": "$_id"}})
        # :snippet-end:

        # :snippet-start: unset
        pipeline.append({"$unset": ["_id"]})
        # :snippet-end:

        pipeline.append({"$sort": {"product": 1}}) # :remove:

        # :snippet-start: run-agg
        aggregation_result = orders_coll.aggregate(pipeline)
        # :snippet-end:

        for document in aggregation_result:
            print(document)

    finally:
        client.close()
