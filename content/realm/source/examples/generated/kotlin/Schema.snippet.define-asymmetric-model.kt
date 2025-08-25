// Implements the `AsymmetricRealmObject` interface
class WeatherSensor : AsymmetricRealmObject {
    @PersistedName("_id")
    @PrimaryKey
    var id: ObjectId = ObjectId()
    var deviceId: String = ""
    var temperatureInFarenheit: Float = 0.0F
    var barometricPressureInHg: Float = 0.0F
    var windSpeedInMph: Int = 0
}
