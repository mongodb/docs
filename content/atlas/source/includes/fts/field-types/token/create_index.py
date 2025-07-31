from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

# set namespace
database = client["<database>"]
collection = database["<collection>"]

# define your Atlas Search index
search_index_model = SearchIndexModel(
    definition={
        "mappings": {
            "dynamic": true|false,
            "fields": {
                "<field_name>":{
                   "type": "token",
                   "normalizer": "lowercase|none"
                }
            }
        },
    },
    name="default",
)

# create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")