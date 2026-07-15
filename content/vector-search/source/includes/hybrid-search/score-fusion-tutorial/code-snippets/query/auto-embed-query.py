import json
import pymongo

client = pymongo.MongoClient('<connection-string>')

result = client['sample_mflix']['embedded_movies'].aggregate([
  {
    "$scoreFusion": {
      "input": {
        "pipelines": {
          "searchOne": [
            {
              "$vectorSearch": {
                "index": "hybrid-vector-search",
                "path": "fullplot",
                "query": {
                  "text": "charming animal"
                },
                "numCandidates": 500,
                "limit": 50
              }
            }
          ],
          "searchTwo": [
            {
              "$search": {
                "index": "hybrid-full-text-search",
                "text": {
                  "query": "charming animal",
                  "path": "fullplot"
                }
              }
            },
            {
              "$limit": 50
            }
          ]
        },
        "normalization": "sigmoid"
      },
      "combination": {
        "method": "expression",
        "expression": {
          "$sum": [
            {"$multiply": [ "$$searchOne", 10]}, "$$searchTwo"
          ]
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