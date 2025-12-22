client = MongoClient(CONNECTION_STRING)

timeseries_db = client["mydatabase"]

weather_data_coll = timeseries_db["weather_data"]

sample_document = {
    "_id": ObjectId("5553a998e4b02cf7151190b8"),
    "st": "x+47600-047900",
    "ts": datetime(1984, 3, 5, 13, 0, 0),
    "position": {
        "type": "Point",
        "coordinates": [-47.9, 47.6]
    },
    "elevation": 9999,
    "callLetters": "VCSZ",
    "qualityControlProcess": "V020",
    "dataSource": "4",
    "type": "FM-13",
    "airTemperature": {"value": -3.1, "quality": "1"},
    "dewPoint": {"value": 999.9, "quality": "9"},
    "pressure": {"value": 1015.3, "quality": "1"},
    "wind": {
        "direction": {"angle": 999, "quality": "9"},
        "type": "9",
        "speed": {"rate": 999.9, "quality": "9"}
    },
    "visibility": {
        "distance": {"value": 999999, "quality": "9"},
        "variability": {"value": "N", "quality": "9"}
    },
    "skyCondition": {
        "ceilingHeight": {"value": 99999, "quality": "9", "determination": "9"},
        "cavok": "N"
    },
    "sections": ["AG1"],
    "precipitationEstimatedObservation": {
        "discrepancy": "2",
        "estimatedWaterDepth": 999
    }
}

weather_data_coll.insert_one(sample_document)
