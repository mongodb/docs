auto weatherSensorReading =
    realm::WeatherSensorReading{.deviceId = "WX1278UIT",
                                .temperatureInFahrenheit = 64.7,
                                .windSpeedInMph = 7};

realm.write([&] { realm.add(std::move(weatherSensorReading)); });
