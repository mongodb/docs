@RealmModel(ObjectType.asymmetricObject)
class _WeatherSensor {
  @PrimaryKey()
  @MapTo("_id")
  late ObjectId id;

  late String deviceId;
  late double modtemperatureInFahrenheitel;
  late double barometricPressureInHg;
  late double windSpeedInMph;
}
