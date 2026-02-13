match_stage = {"$match": {"timestamp": {"$gte": datetime(2022, 1, 15, 0, 0, 0, tzinfo=timezone.utc)}}}
sort_stage = {"$sort": {"timestamp": 1}}

pipeline = [match_stage, sort_stage]

result = list(collection.aggregate(pipeline))
