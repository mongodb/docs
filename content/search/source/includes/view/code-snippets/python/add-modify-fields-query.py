from pymongo import MongoClient


def query_view():
    # Connect to your Atlas deployment
    uri = "<connectionString>"
    client = MongoClient(uri)

    # Access your database and collection (View)
    database = client["sample_airbnb"]
    collection = database["listingsAndReviews_totalPrice"]

    # Run the aggregation query on the View
    pipeline = [
        {
            "$search": {
                "index": "totalPriceIndex",
                "range": {
                    "path": "totalPrice",
                    "lte": 300
                },
                "returnStoredSource": True
            }
        }
    ]

    results = collection.aggregate(pipeline)
    for doc in results:
        print(doc)


query_view()
