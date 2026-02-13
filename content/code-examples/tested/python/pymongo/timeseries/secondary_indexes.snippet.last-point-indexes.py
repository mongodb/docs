# Indexes on ``timeField`` descending are more performant because they 
# enable ``DISTINCT_SCAN`` optimizations.
indexes = [
    [("metadata.sensorId", ASCENDING), ("timestamp", ASCENDING)],
    [("metadata.sensorId", ASCENDING), ("timestamp", DESCENDING)],
    [("metadata.sensorId", DESCENDING), ("timestamp", ASCENDING)],
    [("metadata.sensorId", DESCENDING), ("timestamp", DESCENDING)],
]
