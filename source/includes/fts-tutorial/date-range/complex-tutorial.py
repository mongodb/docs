import pymongo
import datetime

# connect to your Atlas cluster
client = pymongo.MongoClient("<connection-string>")

# define pipeline
pipeline = [
    {"$search": {
        "index": "date-range-tutorial",
        "compound": {
            "must": [{"range": {"path": "released", "gt": datetime.datetime(2015,1,1,0,0,0), "lt": datetime.datetime(2015,12,31,0,0,0)}}],
            "should": [{"near": {"path": "released", "origin": datetime.datetime(2015, 7, 1, 0, 0, 0, 0), "pivot": 2629800000}}],
            "mustNot": [{"text": {"path": "genres", "query": "Documentary"}}]}}},
    {"$limit": 6},
    {"$project": {"_id": 0, "title": 1, "released": 1, "genres": 1, "score": {"$meta": "searchScore"}}}
]
# run pipeline
result = client["sample_mflix"]["movies"].aggregate(pipeline)

# print results
for i in result:
    print(i)
