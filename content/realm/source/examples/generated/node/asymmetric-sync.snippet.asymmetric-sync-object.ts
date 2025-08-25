class WeatherSensor extends Realm.Object<WeatherSensor> {
  _id!: Realm.BSON.ObjectId;
  deviceId!: string;
  temperatureInFahrenheit!: number;
  barometricPressureInHg!: number;
  windSpeedInMph!: number;

  static schema: ObjectSchema = {
    name: "WeatherSensor",
    // sync WeatherSensor objects one way from your device
    // to your Atlas database.
    asymmetric: true,
    primaryKey: "_id",
    properties: {
      _id: "objectId",
      deviceId: "string",
      temperatureInFahrenheit: "int",
      barometricPressureInHg: "float",
      windSpeedInMph: "float",
    },
  };
}
