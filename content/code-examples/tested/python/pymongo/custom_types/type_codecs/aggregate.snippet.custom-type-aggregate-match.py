agg_results = list(
    collection.aggregate([
        {"$match": {"status": Status.ACTIVE}},
        {"$project": {"_id": 1, "title": 1, "status": 1}}
    ])
)
print(agg_results)
