from pymongo.mongo_client import MongoClient

# Connect to your deployment
uri = "<connectionString>"
client = MongoClient(uri)

# Access your database and collection
database = client["<databaseName>"]
collection = database["<collectionName>"]

definition = {
  "fields": [
    {
      "type": "autoEmbed",
      "modality": "text",
      "path": "<fieldToIndex>",
      "model": "<embeddingModel>",
      "similarity": "<similarityMetric>",
      "indexingMethod": "<indexingMethod>",
      "hnswOptions": {
        "maxEdges": <maxEdges>,
        "numEdgeCandidates": <numEdgeCandidates>
      },
      "quantization": "<quantizationType>",
      "numDimensions": <numDimensions>
    },
    {
      "type": "filter",
      "path": "<fieldToIndex>"
    },
    ...
  ]
}
    
# Update your search index
collection.update_search_index("<indexName>", definition)