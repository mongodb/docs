// Setup-only file: creates a small time series collection for the
// storageStats time series example. Referenced by collStats.test.js.
db.weather.drop();
// :snippet-start: create-weather-collection
db.createCollection( "weather", { timeseries: { timeField: "timestamp", metaField: "sensorId" } } )
db.weather.insertMany( [
   {
      sensorId: 5578,
      timestamp: ISODate( "2024-01-01T00:00:00.000Z" ),
      temp: 12
   },
   {
      sensorId: 5578,
      timestamp: ISODate( "2024-01-01T06:00:00.000Z" ),
      temp: 14
   },
   {
      sensorId: 5578,
      timestamp: ISODate( "2024-01-01T12:00:00.000Z" ),
      temp: 16
   },
   {
      sensorId: 5579,
      timestamp: ISODate( "2024-01-01T00:00:00.000Z" ),
      temp: 9
   },
   {
      sensorId: 5579,
      timestamp: ISODate( "2024-01-01T06:00:00.000Z" ),
      temp: 11
   }
] )
// :snippet-end:
