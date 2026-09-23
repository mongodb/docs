from pymongo import MongoClient


def query_view():
    # Connect to your Atlas deployment
    uri = "<connectionString>"
    client = MongoClient(uri)

    # Access your database and collection (View)
    database = client["sample_airbnb"]
    collection = database["listings_SearchableTypes"]

    # Run the aggregation query on the View
    pipeline = [
        {
            "$search": {
                "index": "listingsSearchableTypes",
                "compound": {
                    "should": [
                        {
                            "equals": {
                                "path": "searchable_types.property_type",
                                "value": "House"
                            }
                        },
                        {
                            "equals": {
                                "path": "searchable_types.room_type",
                                "value": "Private room"
                            }
                        }
                    ]
                }
            }
        },
        {"$limit": 10},
        {
            "$project": {
                "_id": 0,
                "searchable_types": 1,
                "name": 1
            }
        }
    ]

    results = collection.aggregate(pipeline)
    for doc in results:
        print(doc)


query_view()
