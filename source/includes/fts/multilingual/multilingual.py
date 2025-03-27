import pymongo
import datetime

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
    {"$search": {
        "index": "multilingual-tutorial",
        "compound": {
            "must": [{"text": {"path": "fullplot", "query": "coppia"}}],
            "mustNot": [{"range": {"path": "released", "gt": datetime.datetime(2000,1,1,0,0,0), "lt": datetime.datetime(2009,1,1,0,0,0)}}],
            "should": [{"text": {"query": "Drama", "path": "genres"}}]}}},
    {"$project": {"_id": 0, "title": 1, "fullplot": 1, "released": 1, "genres": 1, "score": {"$meta": "searchScore"}}}
]
# run pipeline
result = client["sample_mflix"]["movies"].aggregate(pipeline)

# print results
for i in result:
    print(i)