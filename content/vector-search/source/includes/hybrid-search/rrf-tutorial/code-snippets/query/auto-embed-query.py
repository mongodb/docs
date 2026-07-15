import json
import pymongo

client = pymongo.MongoClient('<connection-string>')

result = client['sample_mflix']['embedded_movies'].aggregate([
  {
    "$rankFusion": {
      "input": {
        "pipelines": {
          "vectorPipeline": [
            {
              "$vectorSearch": {
                "index": "hybrid-vector-search",
                "path": "fullplot",
                "queryVector": {"text": "charming animal"},
                "numCandidates": 500,
                "limit": 50
              }
            }
          ],
          "fullTextPipeline": [
            {
              "$search": {
                "index": "hybrid-full-text-search",
                "text": {
                  "query": "charming animal",
                  "path": "fullplot",
                  "fuzzy": {}
                }
              }
            },
            { "$limit": 50 }
          ]
        }
      },
      "combination": {
        "weights": {
          "vectorPipeline": 0.5,
          "fullTextPipeline": 0.5
        }
      },
      "scoreDetails": True
    }
  },
  {
    "$project": {
        "_id": 1,
        "title": 1,
        "fullplot": 1,
        "scoreDetails": {"$meta": "scoreDetails"}
    }
  },
  {
    "$limit": 10
  }
])

print(json.dumps(list(result), indent=2, default=str))