realm.write(() {
  realm.ingest(
      WeatherSensor(weatherSensorId, "WX1278UIT", 66.7, 29.65, 2));
});
