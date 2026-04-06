result = weather_coll.find_one(
    {"time": datetime(2045, 12, 19, 18, 0, 0)},
    {"_id": 0}
)
