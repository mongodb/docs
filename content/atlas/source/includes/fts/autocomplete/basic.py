import pymongo

# connect to your Atlas cluster
client = pymongo.MongoClient('<connection-string>')

# define pipeline
pipeline = [
    {"$search": {"autocomplete": {"query": "off", "path": "title"}}},
    {"$limit": 10},
    {"$project": {"_id": 0, "title": 1}},
]
# run pipeline
result = client["sample_mflix"]["movies"].aggregate(pipeline)

# print results
for i in result:
    print(i)
