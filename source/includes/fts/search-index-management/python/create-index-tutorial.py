from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

def create_index():
    try:
        # set namespace
        database = client["sample_mflix"]
        collection = database["movies"]

        # define your Atlas Search index
        search_index_model = SearchIndexModel(
            definition={
                "mappings": {
                    "dynamic": True
                },
            },
            name="default",
        )

        # create the index
        result = collection.create_search_index(model=search_index_model)
        print(result)
    finally:
        client.close()