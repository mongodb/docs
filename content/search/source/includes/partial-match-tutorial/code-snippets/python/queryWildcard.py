from pymongo import MongoClient

# connect to your Atlas cluster
uri = "<connection-string>"

client = MongoClient(uri)

def run():
    try:
        # set namespace
        database = client["sample_mflix"]
        coll = database["movies"]

        # define pipeline
        agg = [
            {
                "$search": {
                    "index": "partial-match-tutorial",
                    "wildcard": {
                        "path": "title",
                        "query": "how*",
                        "allowAnalyzedField": True,
                    }
                }
            },
            {
                "$project": {
                    "_id": 0,
                    "title": 1
                }
            }
        ]

        # run pipeline
        result = coll.aggregate(agg)
        print(result)

        # print results
        for doc in result:
            print(doc)
    finally:
        client.close()

if __name__ == "__main__":
    run()
