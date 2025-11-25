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
            "dynamic": true|false,
            "fields": {
                "<field-name>":{
                   "type": "vector",
                   "numDimensions": "<number-of-dimensions>",
                   "similarity": "euclidean | cosine | dotProduct",
                   "quantization": "none | scalar | binary",
                   "hnswOptions": {
                       "maxEdges": "<number-of-connected-neighbors>",
                       "numEdgeCandidates": "<number-of-nearest-neighbors>"
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