from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

# set namespace
database = client["sample_mflix"]
collection = database["movies"]

# define your MongoDB Search index
search_index_model = SearchIndexModel(
    definition={
        "mappings": {
            "dynamic": False,
            "fields": {
                "released": [
                    {
                        "type": "date"
                    },
                    {
                        "type": "dateFacet"
                    }
                ]
            }
        },
    },
    name="default",
)

# create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")