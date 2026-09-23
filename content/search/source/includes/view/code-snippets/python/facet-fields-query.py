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
            "$searchMeta": {
                "index": "listingsSearchableTypes",
                "facet": {
                    "operator": {
                        "text": {
                            "path": "summary",
                            "query": "ocean view"
                        }
                    },
                    "facets": {
                        "idFacet": {
                            "type": "string",
                            "path": "idString",
                            "numBuckets": 10
                        },
                        "hostFacet": {
                            "type": "string",
                            "path": "superHostString"
                        }
                    }
                }
            }
        }
    ]

    results = collection.aggregate(pipeline)
    for doc in results:
        print(doc)


query_view()
