class WeatherSensor extends Realm.Object {
  static schema = {
    name: 'WeatherSensor',
    // sync WeatherSensor objects one way from your device
    // to your Atlas database.
    asymmetric: true,
    primaryKey: '_id',
    properties: {
      _id: 'objectId',
      deviceId: 'string',
      temperatureInFahrenheit: 'int',
      barometricPressureInHg: 'float',
      windSpeedInMph: 'float',
    },
  };
}
