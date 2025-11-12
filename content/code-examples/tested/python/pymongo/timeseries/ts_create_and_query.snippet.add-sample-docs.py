sample_documents = [
    {
        "sensor": {"sensorId": 5578, "type": "temperature"},
        "time": datetime(2021, 12, 18, 0, 0, 0),
        "temp": 45.2,
    },
    {
        "sensor": {"sensorId": 5578, "type": "temperature"},
        "time": datetime(2021, 12, 18, 6, 0, 0),
        "temp": 47.3,
    },
    {
        "sensor": {"sensorId": 5578, "type": "temperature"},
        "time": datetime(2021, 12, 18, 12, 0, 0),
        "temp": 49.1,
    },
    {
        "sensor": {"sensorId": 5578, "type": "temperature"},
        "time": datetime(2021, 12, 18, 18, 0, 0),
        "temp": 48.8,
    },
    {
        "sensor": {"sensorId": 5578, "type": "temperature"},
        "time": datetime(2021, 12, 19, 0, 0, 0),
        "temp": 43.3,
    },
    {
        "sensor": {"sensorId": 5578, "type": "temperature"},
        "time": datetime(2021, 12, 19, 6, 0, 0),
        "temp": 47.2,
    },
    {
        "sensor": {"sensorId": 5578, "type": "temperature"},
        "time": datetime(2021, 12, 19, 12, 0, 0),
        "temp": 51.5,
    },
    {
        "sensor": {"sensorId": 5578, "type": "temperature"},
        "time": datetime(2021, 12, 19, 18, 0, 0),
        "temp": 48.2,
    },
]

weather_coll.insert_many(sample_documents)
