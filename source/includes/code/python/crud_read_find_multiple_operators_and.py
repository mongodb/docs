# find code goes here
cursor = coll.find(
    {"surfaceTemperatureC.mean": {"$lt": 15}, "surfaceTemperatureC.min": {"$gt": -100}}
)
