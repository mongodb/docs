from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

# set namespace
database = client["sample_mflix"]
collection = database["users"]

# define your MongoDB Search index
search_index_model = SearchIndexModel(
    definition={
        "mappings": {
            "dynamic": True,
            "fields": {
                "email":{
                   "type": "autocomplete",
                   "analyzer": "lucene.keyword",
                   "tokenization": "nGram",
                   "minGrams": 3,
                   "maxGrams": 15,
                   "foldDiacritics": False
                }
            }
        },
    },
    name="default",
)

# create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")
