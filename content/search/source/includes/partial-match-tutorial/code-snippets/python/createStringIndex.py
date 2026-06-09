from pymongo import MongoClient

# connect to your Atlas deployment
uri = "<connection-string>"

client = MongoClient(uri)

def run():
    try:
        # set namespace
        database = client["sample_mflix"]
        collection = database["movies"]

    # define your MongoDB Search index
        index = {
            "name": "partial-match-tutorial",
            "definition": {
                # search index definition fields
                "mappings": {
                    "dynamic": False,
                    "fields": {
                        "title": {
                            "type": "string",
                        }
                    }
                }
            }
        }

        # run the helper method
        result = collection.create_search_index(index)
        print(f"New index name: {result}")
    finally:
        client.close()

if __name__ == "__main__":
    run()
