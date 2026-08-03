from pymongo import MongoClient

# Replace the placeholder with your connection string
uri = "<connectionString>"
client = MongoClient(uri)

# Access your database and collection
collection = client["sample_mflix"]["embedded_movies"]

pipeline = [
    {
        "$rankFusion": {
            "input": {
                "pipelines": {
                    "vectorPipeline1": [
                        {
                            "$vectorSearch": {
                                "index": "multiple-auto-embed-search",
                                "path": "fullplot",
                                "query": {"text": "light-hearted comedy with ghosts"},
                                "numCandidates": 2000,
                                "limit": 50
                            }
                        }
                    ],
                    "vectorPipeline2": [
                        {
                            "$vectorSearch": {
                                "index": "multiple-auto-embed-search",
                                "path": "fullplot",
                                "query": {"text": "slapstick humor with paranormal events"},
                                "numCandidates": 2000,
                                "limit": 50
                            }
                        }
                    ]
                }
            },
            "combination": {
                "weights": {
                    "vectorPipeline1": 0.5,
                    "vectorPipeline2": 0.5
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
    {"$limit": 20}
]

results = collection.aggregate(pipeline)
for doc in results:
    print(doc)

client.close()
