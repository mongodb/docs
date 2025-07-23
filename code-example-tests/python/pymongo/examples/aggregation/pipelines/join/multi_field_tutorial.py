from datetime import datetime
from pymongo import MongoClient

def example(CONNECTION_STRING):
    client = MongoClient(CONNECTION_STRING)
    try:
        agg_db = client["agg_tutorials_db"]

        # :snippet-start: load-sample-data
        products_coll = agg_db["products"]
        orders_coll = agg_db["orders"]

        order_data = [
            {
                "customer_id": "elise_smith@myemail.com",
                "orderdate": datetime(2020, 5, 30, 8, 35, 52),
                "product_name": "Asus Laptop",
                "product_variation": "Standard Display",
                "value": 431.43,
            },
            {
                "customer_id": "tj@wheresmyemail.com",
                "orderdate": datetime(2019, 5, 28, 19, 13, 32),
                "product_name": "The Day Of The Triffids",
                "product_variation": "2nd Edition",
                "value": 5.01,
            },
            {
                "customer_id": "oranieri@warmmail.com",
                "orderdate": datetime(2020, 1, 1, 8, 25, 37),
                "product_name": "Morphy Richards Food Mixer",
                "product_variation": "Deluxe",
                "value": 63.13,
            },
            {
                "customer_id": "jjones@tepidmail.com",
                "orderdate": datetime(2020, 12, 26, 8, 55, 46),
                "product_name": "Asus Laptop",
                "product_variation": "Standard Display",
                "value": 429.65,
            },
        ]

        orders_coll.insert_many(order_data)

        products_data = [
            {
                "name": "Asus Laptop",
                "variation": "Ultra HD",
                "category": "ELECTRONICS",
                "description": "Great for watching movies",
            },
            {
                "name": "Asus Laptop",
                "variation": "Standard Display",
                "category": "ELECTRONICS",
                "description": "Good value laptop for students",
            },
            {
                "name": "The Day Of The Triffids",
                "variation": "1st Edition",
                "category": "BOOKS",
                "description": "Classic post-apocalyptic novel",
            },
            {
                "name": "The Day Of The Triffids",
                "variation": "2nd Edition",
                "category": "BOOKS",
                "description": "Classic post-apocalyptic novel",
            },
            {
                "name": "Morphy Richards Food Mixer",
                "variation": "Deluxe",
                "category": "KITCHENWARE",
                "description": "Luxury mixer turning good cakes into great",
            },
        ]

        products_coll.insert_many(products_data)
        # :snippet-end:

        pipeline = []

        # :snippet-start: embedded-match-name-variation
        embedded_pl = [
            {
                "$match": {
                    "$expr": {
                        "$and": [
                            {"$eq": ["$product_name", "$$prdname"]},
                            {"$eq": ["$product_variation", "$$prdvartn"]},
                        ]
                    }
                }
            }
        ]
        # :snippet-end:

        # :snippet-start: embedded-match-datetime
        embedded_pl.append(
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

        # :snippet-start: embedded-unset
        embedded_pl.append({"$unset": ["_id", "product_name", "product_variation"]})
        # :snippet-end:

        # :snippet-start: lookup
        pipeline.append(
            {
                "$lookup": {
                    "from": "orders",
                    "let": {"prdname": "$name", "prdvartn": "$variation"},
                    "pipeline": embedded_pl,
                    "as": "orders",
                }
            }
        )
        # :snippet-end:

        # :snippet-start: match
        pipeline.append({"$match": {"orders": {"$ne": []}}})
        # :snippet-end:

        # :snippet-start: unset
        pipeline.append({"$unset": ["_id", "description"]})
        # :snippet-end:

        # :snippet-start: run-agg
        aggregation_result = products_coll.aggregate(pipeline)
        # :snippet-end:

        for document in aggregation_result:
            print(document)

    finally:
        client.close()
