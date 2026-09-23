from pymongo import MongoClient


def query_view():
    # Connect to your Atlas deployment
    uri = "<connectionString>"
    client = MongoClient(uri)

    # Access your database and collection
    database = client["sample_airbnb"]
    collection = database["listingsAndReviews"]

    # Run the aggregation query
    pipeline = [
        {
            "$search": {
                "index": "listingsSearchablePrice",
                "range": {
                    "path": "totalPrice",
                    "gte": 100,
                    "lte": 200
                }
            }
        },
        {
            "$project": {
                "_id": 0,
                "totalPrice": 1,
                "price": 1,
                "cleaning_fee": 1
            }
        }
    ]

    results = collection.aggregate(pipeline)
    for doc in results:
        print(doc)


query_view()
