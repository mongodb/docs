create_command = {
    "create": "weather24h",
    "timeseries": {
        "timeField": "timestamp",
        "metaField": "sensorId",
        "granularity": "seconds"
    },
    "expireAfterSeconds": 86400
}

# Execute the command to create the collection
database.command(create_command)
