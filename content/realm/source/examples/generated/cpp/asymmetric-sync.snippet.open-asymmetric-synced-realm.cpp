auto syncConfig = user.flexible_sync_configuration();
auto realm = realm::open<realm::WeatherSensorReading>(syncConfig);
