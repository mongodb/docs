from pymongo import MongoClient


def query_view():
    # Connect to your Atlas deployment
    uri = "<connectionString>"
    client = MongoClient(uri)

    # Access your database and collection (View)
    database = client["sample_mflix"]
    collection = database["movies_ReleasedAfter2000"]

    # Run the aggregation query on the View
    pipeline = [
        {
            "$search": {
                "index": "releasedAfter2000Index",
                "text": {
                    "path": "title",
                    "query": "foo"
                },
                "sort": {
                    "released": 1
                }
            }
        }
    ]

    results = collection.aggregate(pipeline)
    for doc in results:
        print(doc)


query_view()
