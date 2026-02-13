pipeline = [
    {"$sort": {"metadata.sensorId": 1, "timestamp": -1}},
    {"$group": {
        "_id": "$metadata.sensorId",
        "ts": {"$first": "$timestamp"},
        "temperatureF": {"$first": "$currentConditions.tempF"}
    }}
]

result = list(collection.aggregate(pipeline))
