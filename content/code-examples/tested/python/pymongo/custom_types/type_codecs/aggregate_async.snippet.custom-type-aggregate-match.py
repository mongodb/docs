agg_cursor = await collection.aggregate([
    {"$match": {"status": Status.ACTIVE}},
    {"$project": {"_id": 1, "title": 1, "status": 1}}
])
agg_results = [doc async for doc in agg_cursor]
print(agg_results)
