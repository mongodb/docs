db.weather.find(
  {
    "sensor.sensorId": 5578
  },
  {
    projection: { _id: 0 }
  }
)
