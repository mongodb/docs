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
            "dynamic": True|False,
            "fields": {
                "<field_name>":{
                   "type": "number",
                   "representation": "int64|double",
                   "indexIntegers": True|False,
                   "indexDoubles": True|False
                }
            }
        },
    },
    name="default",
)

# create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")
