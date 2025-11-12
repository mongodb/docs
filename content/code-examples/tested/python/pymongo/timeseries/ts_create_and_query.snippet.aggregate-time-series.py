pipeline = [
    {"$match": {"sensor.sensorId": 5578}},
    {
        "$group": {
            "_id": {"$dateTrunc": {"date": "$time", "unit": "day"}},
            "avgTemp": {"$avg": "$temp"},
        }
    },
    {"$sort": {"avgTemp": -1}},
]

cursor = weather_coll.aggregate(pipeline)
