struct WeatherSensorReading {
  realm::primary_key<realm::object_id> _id{realm::object_id::generate()};
  std::string deviceId;
  double temperatureInFahrenheit;
  int64_t windSpeedInMph;
};
REALM_ASYMMETRIC_SCHEMA(WeatherSensorReading, _id, deviceId,
                        temperatureInFahrenheit, windSpeedInMph)
