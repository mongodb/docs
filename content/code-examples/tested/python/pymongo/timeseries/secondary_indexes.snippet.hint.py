hint_result = list(collection.aggregate(
    pipeline,
    hint={"metadata.sensorId": 1, "timestamp": -1}
))
