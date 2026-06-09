from pymongo import MongoClient
from pymongo.operations import SearchIndexModel

# Connect to your Atlas deployment
uri = "<connection-string>"
client = MongoClient(uri)

database = client["sample_mflix"]
collection = database["movies"]

# Create the MongoDB Search index definition
search_index_model = SearchIndexModel(
    definition={
        "mappings": {
            "dynamic": True,
        },
        "synonyms": [
            {
                "analyzer": "lucene.standard",
                "name": "my_synonyms",
                "source": {
                    "collection": "synonymous_terms"
                }
            }
        ]
    },
    name="default",
)

# Create the index
result = collection.create_search_index(model=search_index_model)
print(f"New index name: {result}")