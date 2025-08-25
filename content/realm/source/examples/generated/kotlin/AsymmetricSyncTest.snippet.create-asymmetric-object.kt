// Open a write transaction
realm.write {
    // Create a new asymmetric object
    val weatherSensor = WeatherSensor().apply {
        deviceId = "WX1278UIT"
        temperatureInFarenheit = 6.7F
        barometricPressureInHg = 29.65F
        windSpeedInMph = 2
    }
    // Insert the object into the realm with the insert() extension method
    insert(weatherSensor)

// WeatherSensor object is inserted into the realm, then synced to the
// App Services backend. You CANNOT access the object locally because it's
// deleted from the local realm after sync is complete.
}
