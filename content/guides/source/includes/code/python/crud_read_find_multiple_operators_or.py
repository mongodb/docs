# find code goes here
cursor = coll.find(
    {
        "$or": [
            {"orderFromSun": {"$gt": 7}},
            {"orderFromSun": {"$lt": 2}},
        ]
    }
)
