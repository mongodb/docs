from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

# set namespace
database = client["sample_mflix"]
collection = database["movies"]

# define your Atlas Search index
search_index_model = SearchIndexModel(
    definition={
        "mappings": {
            "dynamic": False,
            "fields": {
                "title": {
                   "type": "string",
                   "multi": {
                       "english": {
                           "type": "string",
                           "analyzer": "lucene.english"
                       },
                       "french": {
                           "type": "string",
                           "analyzer": "lucene.french"
                       }
                   }
                }
            }
        },
    },
    name="default",
)

# create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")