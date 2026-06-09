import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
    {"$search":{"autocomplete": {"query": "ger", "path": "title"}, "highlight": {"path": "title"}}},
    {"$limit": 5},
    {"$project": {"score": {"$meta": "searchScore"},"_id": 0, "title": 1, "highlights": {"$meta": "searchHighlights"}}},
]
# run pipeline
result = client["sample_mflix"]["movies"].aggregate(pipeline)

# print results
for i in result:
    print(i)
