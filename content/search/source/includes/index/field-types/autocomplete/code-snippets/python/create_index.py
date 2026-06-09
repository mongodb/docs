from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

# set namespace
database = client["<database>"]
collection = database["<collection>"]

# define your MongoDB Search index
search_index_model = SearchIndexModel(
    definition={
        "mappings": {
            "dynamic": True|False,
            "fields": {
                "<field_name>":{
                   "type": "autocomplete",
                   "analyzer": "<lucene.analyzer>",
                   "tokenization": "nGram",
                   "minGrams": <2>,
                   "maxGrams": <15>,
                   "foldDiacritics": True|False,
                   "similarity": { "type": "bm25|boolean|stableTfl" }
                }
            }
        },
    },
    name="default",
)

# create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")
