// :snippet-start: create-collection
db.createCollection(
  "weather",
  {
    timeseries: { 
      timeField: "time", 
      metaField: "sensor", 
      granularity: "seconds" 
    },
    expireAfterSeconds: 86400
  }
)
// :snippet-end: