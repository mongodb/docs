database.create_collection(
    sensorData,
    timeseries={
        "timeField": "timestamp",
        "metaField": "metadata",
    },
    expireAfterSeconds=86400  # 24 hours
)
