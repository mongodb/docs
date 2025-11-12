result = weather_coll.find_one(
    {"time": datetime(2021, 12, 19, 18, 0, 0)},
    {"_id": 0}
)
