class WeatherSensor: AsymmetricObject {
    @Persisted(primaryKey: true) var _id: ObjectId
    @Persisted var deviceId: String
    @Persisted var temperatureInFahrenheit: Float
    @Persisted var barometricPressureInHg: Float
    @Persisted var windSpeedInMph: Int
}
