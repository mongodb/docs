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
                   "type": "string",
                   "analyzer": "<analyzer-name>",
                   "searchAnalyzer": "<search-analyzer-name>",
                   "indexOptions": "docs|freqs|positions|offsets",
                   "store": True|False,
                   "ignoreAbove": <integer>,
                   "similarity": { "type": "bm25|boolean|stableTfl" },
                   "multi": { <string-field-definition> },
                   "norms": "include|omit"
                }
            }
        },
    },
    name="default",
)

# create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")