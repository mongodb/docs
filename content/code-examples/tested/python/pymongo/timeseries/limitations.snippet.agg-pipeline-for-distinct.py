collection.create_index([("meta.project", 1), ("meta.type", 1)])

pipeline = [
    {"$match": {"meta.project": 10}},
    {"$group": {"_id": "$meta.type"}},
]

result = list(collection.aggregate(pipeline))
