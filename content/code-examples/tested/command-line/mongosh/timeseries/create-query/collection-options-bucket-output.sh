{
  "ok": 1,
  "cursor": {
    "id": 0,
    "ns": "timeseries.$cmd.listCollections",
    "firstBatch": [
      {
        "name": "weather",
        "type": "timeseries",
        "options": {
          "expireAfterSeconds": 86400,
          "timeseries": {
            "timeField": "time",
            "metaField": "sensor",
            "bucketRoundingSeconds": 3600,
            "bucketMaxSpanSeconds": 3600
          }
        },
        "info": {
          "readOnly": false
        }
      }
    ]
  }
}